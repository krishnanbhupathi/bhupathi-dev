import type { Project } from '@/types';
import {
  AIWorkflowDiagram,
  AnalyticsDiagram,
  ClinicalDiagram,
  TreasuryDiagram,
} from './diagrams';

export const PROJECTS: Project[] = [
  {
    category: 'SaaS · Analytics',
    title: 'Real-time Analytics Platform',
    role: 'Solo build',
    roleSecondary: 'Demo project',
    description:
      'Designed and built a real-time event pipeline with a custom query engine and self-serve reporting UI. Handled ingestion at scale using Kafka, with ClickHouse for fast OLAP queries and Postgres for transactional data.',
    stats: [
      { value: 'Full-stack', label: 'Pipeline to UI' },
      { value: 'Sub-200ms', label: 'Query p95' },
    ],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'ClickHouse', 'Kafka', 'AWS'],
    diagram: <AnalyticsDiagram />,
    diagramAriaLabel: 'Event pipeline architecture diagram',
    walkthroughHref: 'https://videos.bhupathi.dev/analytics-walkthrough.mp4',
    fullDiagramSrc: 'https://videos.bhupathi.dev/diagrams/analytics.svg?v=2',
  },
  {
    category: 'Fintech · Payments',
    title: 'Treasury & Payments Portal',
    role: 'Solo build',
    roleSecondary: 'Demo project',
    description:
      'Built a multi-entity treasury portal with role-based access, cryptographically signed audit trails, and automated reconciliation across multiple banking APIs. Designed for compliance-heavy environments with SOC 2-style export support.',
    stats: [
      { value: 'Multi-bank', label: 'API integration' },
      { value: 'SOC 2-style', label: 'Audit export' },
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS KMS', 'Docker'],
    diagram: <TreasuryDiagram />,
    diagramAriaLabel: 'Treasury integration architecture diagram',
    walkthroughHref: 'https://videos.bhupathi.dev/treasury-walkthrough.mp4',
    fullDiagramSrc: 'https://videos.bhupathi.dev/diagrams/treasury.svg?v=2',
  },
  {
    category: 'Logistics · AI Automation',
    title: 'AI Workflow Automation Suite',
    role: 'Solo engineer',
    roleSecondary: 'Client project',
    description:
      'Designed an LLM-driven automation layer that replaced manual ops workflows — document parsing with OCR, vendor triage, and Slack-native human-in-the-loop approvals. Built on Temporal for durable orchestration with retry and state management.',
    stats: [
      { value: 'LLM-powered', label: 'Doc processing' },
      { value: 'Durable', label: 'Orchestration' },
    ],
    tech: ['Python', 'FastAPI', 'Claude API', 'Temporal', 'Postgres'],
    diagram: <AIWorkflowDiagram />,
    diagramAriaLabel: 'AI agent workflow architecture diagram',
    walkthroughHref: 'https://videos.bhupathi.dev/ai-workflow-walkthrough.mp4',
    fullDiagramSrc: 'https://videos.bhupathi.dev/diagrams/ai-workflow.svg?v=2',
  },
  {
    category: 'HealthTech · Telehealth',
    title: 'Clinical Operations Platform',
    role: 'Solo build',
    roleSecondary: 'Demo project',
    description:
      'Built a telehealth platform covering patient intake, clinician scheduling, automated billing, and a HIPAA-aligned audit layer. Designed triage routing logic and downstream automation for prescriptions, lab orders, and compliance exports.',
    stats: [
      { value: 'End-to-end', label: 'Patient flow' },
      { value: 'HIPAA', label: 'Aligned' },
    ],
    tech: ['Next.js', 'tRPC', 'PostgreSQL', 'Prisma', 'AWS'],
    diagram: <ClinicalDiagram />,
    diagramAriaLabel: 'Clinical operations platform flow diagram',
    walkthroughHref: 'https://videos.bhupathi.dev/clinical-walkthrough.mp4',
    fullDiagramSrc: 'https://videos.bhupathi.dev/diagrams/clinical.svg?v=2',
  },
];
