import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHead } from '@/components/layout/SectionHead';
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup';
import type { BlogPost } from '@/types';

const POSTS: BlogPost[] = [
  {
    category: 'Architecture',
    title: 'Why I Choose Kafka Over RabbitMQ for Event Pipelines',
    excerpt:
      'Message ordering, partition strategy, and when a simpler broker is actually the right call.',
    date: 'March 2026',
    href: '/blog/kafka-vs-rabbitmq',
  },
  {
    category: 'DevOps',
    title: 'Zero-Downtime Deployments on AWS with Docker and GitHub Actions',
    excerpt:
      'Blue-green deploys, health checks, and the rollback strategy that saved a Friday night.',
    date: 'February 2026',
    href: '/blog/zero-downtime-deployments',
  },
  {
    category: 'Process',
    title: 'How I Scope Fixed-Price Projects Without Losing Money',
    excerpt:
      'The discovery framework I use to estimate, quote, and deliver on time for international clients.',
    date: 'January 2026',
    href: '/blog/fixed-price-scoping',
  },
];

export const Writing = () => (
  <Section id="writing">
    <Container>
      <SectionHead
        eyebrow="Thinking"
        title={
          <>
            Writing about systems <span className="hl">&amp; scale.</span>
          </>
        }
        description="Occasional posts on architecture decisions, scaling trade-offs, and lessons from production."
      />

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-md:max-w-[560px] max-md:mx-auto">
        {POSTS.map((post) => (
          <StaggerItem key={post.title}>
            <Link
              to={post.href}
              className="group h-full flex flex-col p-4 md:p-5 lg:p-6 border border-line bg-bg-plain transition-[transform,background,border-color,box-shadow] duration-300 ease-brand hover:bg-surface hover:border-line-strong hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(16,44,38,0.06)]"
            >
              <span
                className="self-start text-[11px] font-semibold uppercase px-2 py-0.5 bg-accent-soft text-accent-ink"
                style={{ letterSpacing: '0.06em' }}
              >
                {post.category}
              </span>
              <h3
                className="text-lg font-semibold leading-[1.25] mt-3 text-text"
                style={{ letterSpacing: '-0.32px' }}
              >
                {post.title}
              </h3>
              <p
                className="text-[15px] leading-[1.55] text-text-dim mt-2 line-clamp-2 flex-1"
                style={{ letterSpacing: '-0.32px' }}
              >
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between gap-3 mt-4">
                <span
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-ink group-hover:underline"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  Read
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-brand group-hover:translate-x-0.5"
                  />
                </span>
                <span
                  className="text-[13px] text-text-mute"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  {post.date}
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Container>
  </Section>
);
