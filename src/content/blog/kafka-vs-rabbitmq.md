# Why I Choose Kafka Over RabbitMQ for Event Pipelines

*March 2026 · Architecture*

---

Last year I built a real-time analytics platform — the kind where events flow in from web SDKs, mobile apps, and server-side APIs, get enriched and deduplicated, then land in a query engine that serves dashboards with sub-200ms p95 latency.

The first architectural decision was the message broker. Kafka or RabbitMQ.

I've used both in production. Here's how I think about the trade-off — not from a textbook perspective, but from what actually matters when you're building event pipelines that have to hold up under real load.

## The core difference that matters

RabbitMQ is a message *broker*. Kafka is a distributed *log*.

That distinction sounds academic until you're debugging a pipeline at 2am. With RabbitMQ, once a consumer acknowledges a message, it's gone. With Kafka, messages sit in the log for as long as your retention policy allows — hours, days, or forever. You can replay them. You can add a new consumer group next month and have it process every event from the beginning.

For an analytics pipeline, this is the difference between "we lost Tuesday's data" and "let me just reprocess from Tuesday's offset."

## Message ordering — the silent killer

Analytics pipelines care about order. If a user signs up, completes onboarding, then makes a purchase, those events need to arrive in sequence. Aggregate them out of order and your funnel metrics are wrong.

RabbitMQ doesn't guarantee ordering across consumers. You can get close with a single consumer per queue, but that kills your throughput. Kafka guarantees ordering *within a partition*. Partition by user ID and every event for a given user arrives in order, across as many consumers as you need.

This is the single biggest reason I default to Kafka for event workloads. Ordering guarantees with horizontal scalability. RabbitMQ makes you choose one or the other.

<!-- diagram:kafka-partition -->

## Partition strategy is where the real thinking happens

Choosing Kafka is the easy part. Designing your partition key is where you earn your pay.

For the analytics platform, I partitioned by `account_id` rather than `user_id`. Why? Because the downstream ClickHouse queries were almost always scoped to an account — "show me all events for this customer's workspace." Partitioning by account meant related events landed on the same partition, which meant the same consumer instance processed them, which meant we could do local aggregation before writing to ClickHouse. That cut our write volume by roughly 60%.

If I'd partitioned by user ID, we'd have had better distribution across partitions but lost the ability to aggregate locally. The write amplification would have killed our ClickHouse cluster.

The lesson: your partition key should mirror your most common query pattern, not your most granular entity.

## When RabbitMQ is actually the right call

I don't always pick Kafka. For the AI workflow automation project I built — document parsing jobs triggered by email, Slack uploads, and vendor EDI feeds — I'd have used RabbitMQ if the volume had been lower.

Here's why: the workload was task-based, not event-based. Each message was "parse this document" — a discrete unit of work with no ordering requirement. RabbitMQ's acknowledgment model is perfect for this: pick up a job, process it, ack it, move on. If the consumer crashes, the message goes back in the queue. Simple, reliable, no partition rebalancing headaches.

I ended up using Temporal instead (durable workflow orchestration was a better fit for multi-step pipelines with human-in-the-loop approvals), but the point stands: if your workload is task queues rather than event streams, RabbitMQ is simpler to operate and perfectly capable.

<!-- diagram:rabbitmq-queue -->

## The operational cost nobody talks about

Kafka has operational overhead that RabbitMQ doesn't. ZooKeeper (or KRaft in newer versions) adds another moving part. Partition rebalancing during consumer group changes can cause processing pauses. Monitoring consumer lag across hundreds of partitions requires proper tooling — I use Kafka Exporter with Prometheus and Grafana.

For the analytics platform, this overhead was justified. We were processing tens of thousands of events per second with strict ordering requirements. Kafka's architecture was built for exactly this.

But I've seen teams adopt Kafka for workloads that process a few hundred messages per minute. That's like buying a semi-truck to deliver groceries. RabbitMQ would have been running in 30 minutes with a fraction of the operational burden.

## My decision framework

When a new project involves messaging, I ask three questions:

**Do I need to replay messages?** If yes, Kafka. RabbitMQ's messages are gone after acknowledgment. Kafka's log retention gives you a time machine.

**Do I need ordering guarantees at scale?** If yes, Kafka. Partition-level ordering with horizontal consumer scaling is Kafka's core strength.

**Is this a task queue or an event stream?** Task queues (process-and-forget, no ordering) lean RabbitMQ. Event streams (ordered, replayable, multiple consumers) lean Kafka.

If none of those point clearly to Kafka, I pick RabbitMQ. It's simpler to set up, easier to monitor, and for most workloads, more than enough.

<!-- diagram:decision-tree -->

## The result

The analytics platform processes events through a three-stage Kafka pipeline: ingest → enrich/dedup → aggregate. Consumer groups are partitioned by account ID for local aggregation. ClickHouse handles OLAP queries, Postgres handles transactional data, and the Next.js dashboard streams results with server-side rendering.

Sub-200ms query p95, zero data loss in 18 months of production, and the ability to reprocess any time window on demand. Kafka earned its complexity budget on this one.

---

*I write about architecture decisions from real production systems. If you're building something similar and want to talk through your messaging architecture, [reach out](mailto:krishnanbhupathi@gmail.com) — I reply within 24 hours.*
