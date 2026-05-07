import kafkaRaw from './kafka-vs-rabbitmq.md?raw';
import zeroRaw from './zero-downtime-deployments.md?raw';
import scopingRaw from './fixed-price-scoping.md?raw';

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
}

const stripLeadingFrontmatter = (md: string): string => {
  const match = md.match(/^# .+\n+\*[^*]+\*\n+---\n+/);
  return match ? md.slice(match[0].length) : md;
};

const minutesToReadTime = (md: string): string => {
  const words = md.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const buildPost = (
  slug: string,
  title: string,
  date: string,
  category: string,
  raw: string,
): BlogPostMeta => {
  const content = stripLeadingFrontmatter(raw);
  return { slug, title, date, category, readTime: minutesToReadTime(content), content };
};

export const BLOG_POSTS: Record<string, BlogPostMeta> = {
  'kafka-vs-rabbitmq': buildPost(
    'kafka-vs-rabbitmq',
    'Why I Choose Kafka Over RabbitMQ for Event Pipelines',
    'March 2026',
    'Architecture',
    kafkaRaw,
  ),
  'zero-downtime-deployments': buildPost(
    'zero-downtime-deployments',
    'Zero-Downtime Deployments on AWS with Docker and GitHub Actions',
    'February 2026',
    'DevOps',
    zeroRaw,
  ),
  'fixed-price-scoping': buildPost(
    'fixed-price-scoping',
    'How I Scope Fixed-Price Projects Without Losing Money',
    'January 2026',
    'Process',
    scopingRaw,
  ),
};
