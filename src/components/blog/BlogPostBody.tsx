import { Fragment, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BRAND_EASE, inViewOnce } from '@/utils/motion';
import {
  DecisionTreeDiagram,
  DeploymentPipelineDiagram,
  KafkaPartitionDiagram,
  RabbitMQQueueDiagram,
  RollingUpdateDiagram,
  ScopeChangeDiagram,
  ScopingFlowDiagram,
} from './diagrams';

interface DiagramEntry {
  component: ReactNode;
  caption: string;
  ariaLabel: string;
}

const DIAGRAMS: Record<string, DiagramEntry> = {
  'kafka-partition': {
    component: <KafkaPartitionDiagram />,
    caption: 'Producer partitions by account_id; each consumer reads exactly one partition, preserving order per account.',
    ariaLabel: 'Kafka partition model',
  },
  'rabbitmq-queue': {
    component: <RabbitMQQueueDiagram />,
    caption: 'A direct exchange routes work into a single queue; idle workers pull tasks round-robin and nack on failure.',
    ariaLabel: 'RabbitMQ task queue model',
  },
  'decision-tree': {
    component: <DecisionTreeDiagram />,
    caption: 'Three questions, three exits — most projects terminate at question one or two.',
    ariaLabel: 'Kafka vs RabbitMQ decision tree',
  },
  'deployment-pipeline': {
    component: <DeploymentPipelineDiagram />,
    caption: 'Push to main triggers build → push → roll → verify; failed health checks roll the service back to the previous task definition.',
    ariaLabel: 'Deployment pipeline diagram',
  },
  'rolling-update': {
    component: <RollingUpdateDiagram />,
    caption: 'New tasks come up in parallel before old tasks drain. The ALB only points at healthy targets at every step.',
    ariaLabel: 'Rolling update sequence diagram',
  },
  'scoping-flow': {
    component: <ScopingFlowDiagram />,
    caption: 'Discovery → deliverables → PERT estimates → buffered quote. Roughly three to four hours of work per scope.',
    ariaLabel: 'Project scoping flow diagram',
  },
  'scope-change': {
    component: <ScopeChangeDiagram />,
    caption: 'Every change is either inside the doc, priced and added, or deferred — there is never a free lane.',
    ariaLabel: 'Scope change handling diagram',
  },
};

interface BlogDiagramFigureProps {
  entry: DiagramEntry;
}

const BlogDiagramFigure = ({ entry }: BlogDiagramFigureProps) => (
  <motion.figure
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={inViewOnce}
    transition={{ duration: 0.7, ease: BRAND_EASE }}
    className="my-10"
    aria-label={entry.ariaLabel}
  >
    <div
      className="border border-line p-4 sm:p-8"
      style={{
        backgroundColor: '#FFF8EE',
        backgroundImage: 'radial-gradient(rgba(16, 44, 38, 0.07) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    >
      {entry.component}
    </div>
    <figcaption
      className="mt-3 text-[12px] italic text-text-mute"
      style={{ letterSpacing: '-0.32px' }}
    >
      {entry.caption}
    </figcaption>
  </motion.figure>
);

interface BlogPostBodyProps {
  content: string;
}

const DIAGRAM_PATTERN = /<!--\s*diagram:([\w-]+)\s*-->/g;

export const BlogPostBody = ({ content }: BlogPostBodyProps) => {
  const parts = content.split(DIAGRAM_PATTERN);
  return (
    <div className="prose-blog">
      {parts.map((part, idx) => {
        const isMarker = idx % 2 === 1;
        if (isMarker) {
          const entry = DIAGRAMS[part];
          if (!entry) return null;
          return <BlogDiagramFigure key={`d-${idx}`} entry={entry} />;
        }
        if (!part.trim()) return null;
        return (
          <Fragment key={`m-${idx}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{part}</ReactMarkdown>
          </Fragment>
        );
      })}
    </div>
  );
};
