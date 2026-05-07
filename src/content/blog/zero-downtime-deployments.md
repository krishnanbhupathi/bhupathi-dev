# Zero-Downtime Deployments on AWS with Docker and GitHub Actions

*February 2026 · DevOps*

---

A Friday evening, 6:47 PM IST. I pushed a hotfix for a payments portal — a one-line change to a currency rounding function that was costing a client real money on cross-border transactions. The deployment went out, the old containers drained, the new ones came up. No downtime. No user saw an error page. The Slack channel stayed quiet.

That's the goal: deployments so boring they don't deserve a message.

Here's the deployment pipeline I've refined across multiple production systems on AWS, using Docker containers, ECS Fargate, and GitHub Actions. No Kubernetes. No Terraform Cloud. Just enough infrastructure to ship reliably without a dedicated DevOps team.

## The architecture

The pipeline has four stages: build → push → deploy → verify.

**Build**: GitHub Actions triggers on push to `main`. It runs the test suite, builds the Docker image, and tags it with the commit SHA — never `latest`. Using the commit SHA as the tag means every image is traceable to an exact state of the code. If something breaks, I know exactly which commit is running.

**Push**: The image goes to Amazon ECR. I keep the last 20 images and lifecycle-policy the rest. Disk is cheap but clutter isn't.

**Deploy**: ECS service update with the new task definition pointing to the new image. This is where zero-downtime happens — ECS uses rolling updates by default, but the default configuration isn't good enough.

**Verify**: A post-deploy health check hits the `/health` endpoint and verifies the response. If it fails, the pipeline alerts on Slack and I investigate. Automatic rollback is configured at the ECS level.

<!-- diagram:deployment-pipeline -->

## The rolling update configuration that actually works

ECS rolling updates sound simple: spin up new tasks, drain old tasks, done. In practice, the defaults will cause brief outages if you're not careful.

Here's what I configure on every ECS service:

**Deployment configuration**: `minimumHealthyPercent: 100`, `maximumPercent: 200`. This means ECS starts the new tasks *before* stopping the old ones. At peak, you're running double the tasks — but only for 60-90 seconds. The cost is negligible and the alternative is dropped requests.

**Health check grace period**: 120 seconds minimum. New containers need time to warm up — JVM services especially. If the ALB health check starts probing too early, it marks healthy containers as unhealthy, ECS kills them, and you're in a death loop.

**Deregistration delay**: 30 seconds on the target group. When a container is draining, the ALB stops sending *new* requests but gives existing requests 30 seconds to complete. For most API calls, that's generous. For long-running exports or report generation, I bump this to 120 seconds.

**Container health check**: Separate from the ALB health check. The container-level health check in the Dockerfile ensures the application process is actually responding, not just that the container is running. I've seen containers where the JVM was alive but the application had deadlocked — the ALB health check passed because port 8080 was open, but no requests were being processed.

<!-- diagram:rolling-update -->

## The rollback strategy that saved a Friday night

Automated rollback sounds great in theory. In practice, you need to be specific about what triggers it.

ECS has circuit breaker deployment protection: if new tasks keep failing to start (crash loops, OOM kills, health check failures), ECS automatically rolls back to the last stable task definition. I enable this on every service.

But the more useful rollback is manual-but-fast. Because every Docker image is tagged with its commit SHA and the last 20 images are retained in ECR, rolling back means updating the task definition to point to the previous image and triggering a new deployment. That's a single `aws ecs update-service` call. I keep a rollback script in every repo:

```bash
#!/bin/bash
# rollback.sh — reverts to the previous task definition revision
CLUSTER=$1
SERVICE=$2
CURRENT_TD=$(aws ecs describe-services --cluster $CLUSTER --services $SERVICE \
  --query 'services[0].taskDefinition' --output text)
PREVIOUS_REV=$(($(echo $CURRENT_TD | grep -o '[0-9]*$') - 1))
PREVIOUS_TD="${CURRENT_TD%:*}:$PREVIOUS_REV"
aws ecs update-service --cluster $CLUSTER --service $SERVICE \
  --task-definition $PREVIOUS_TD --force-new-deployment
echo "Rolling back $SERVICE to $PREVIOUS_TD"
```

The Friday night save: I deployed a version that passed all tests but had a subtle issue with database connection pool exhaustion under the specific traffic pattern of US evening hours. The ALB health check passed (the app responded to GET /health), but actual API latency climbed from 40ms to 2 seconds. CloudWatch alarm fired, I ran the rollback script, and the previous version was serving traffic in under 90 seconds. No downtime. Investigation happened Monday morning.

## The GitHub Actions workflow

The workflow file is straightforward. The complexity is in the ECS configuration, not the CI pipeline.

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: us-east-1
      
      - name: Login to ECR
        id: ecr
        uses: aws-actions/amazon-ecr-login@v2
      
      - name: Build and push
        env:
          REGISTRY: ${{ steps.ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $REGISTRY/myapp:$IMAGE_TAG .
          docker push $REGISTRY/myapp:$IMAGE_TAG
      
      - name: Deploy to ECS
        run: |
          # Register new task definition with updated image
          # Update ECS service to use new task definition
          # Wait for deployment to stabilize
          aws ecs wait services-stable --cluster prod --services myapp
      
      - name: Post-deploy verification
        run: |
          # Hit health endpoint and verify response
          curl -f https://api.example.com/health || exit 1
      
      - name: Notify Slack
        if: always()
        run: |
          # Send deployment result to Slack
```

Two things worth noting: I use OIDC role assumption (`role-to-assume`) instead of storing AWS access keys as secrets. Keys rotate, get leaked, expire — OIDC tokens are short-lived and scoped. And `aws ecs wait services-stable` blocks the pipeline until the deployment is fully rolled out or fails, which means the post-deploy verification runs against the new version, not the old one.

## What I'd do differently with more budget

This setup works well for small-to-mid teams deploying a handful of services. If I were managing 15+ services with interdependencies, I'd invest in:

**Blue-green deployments** instead of rolling updates. Run the new version on a completely separate target group, smoke-test it with a small percentage of traffic (weighted routing on the ALB), then flip. More expensive (double the infrastructure during deploy) but zero risk of partial rollout issues.

**Database migration automation**. Right now, I run migrations manually before deploying the new code. For teams shipping multiple times a day, that becomes a bottleneck. A migration step in the pipeline with backward-compatible schema changes and expand-contract patterns would be the next investment.

**Canary analysis**. Instead of all-or-nothing health checks, compare error rates and latency percentiles between the old and new versions during the rolling update. If the new version's p99 latency is 2x worse, automatically roll back before the deployment completes.

## The boring truth

The best deployment pipeline is the one nobody thinks about. It runs on push to main, it doesn't break things, and when it does break things, it fixes them faster than you can open your laptop.

Every production system I build ships with this pipeline from day one. Not as an afterthought — as infrastructure that earns its keep on the first deployment.

---

*If you're setting up deployments for a new service and want a second pair of eyes on the architecture, [drop me a line](mailto:krishnanbhupathi@gmail.com). I'll tell you if you're overengineering it.*
