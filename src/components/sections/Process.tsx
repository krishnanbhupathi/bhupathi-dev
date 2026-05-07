import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHead } from '@/components/layout/SectionHead';
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup';
import { cn } from '@/utils/cn';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  timeline: string;
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery call',
    description:
      "30-minute call to understand your problem, stack, and constraints. I'll tell you honestly if I'm the right fit.",
    timeline: 'Day 1',
  },
  {
    number: '02',
    title: 'Scope & quote',
    description:
      'Fixed-scope proposal with architecture outline, deliverables, timeline, and a single flat price. No hourly surprises.',
    timeline: 'Day 2–3',
  },
  {
    number: '03',
    title: 'Build & ship',
    description:
      'Daily async updates via Slack or email. You see working code weekly — not a status deck. I course-correct fast.',
    timeline: 'Week 1–4',
  },
  {
    number: '04',
    title: 'Handoff & support',
    description:
      'Clean repo, docs, deployment guide, and 2 weeks of free bug-fix support after launch.',
    timeline: 'Week 4–6',
  },
];

export const Process = () => (
  <Section id="process">
    <Container>
      <SectionHead
        eyebrow="How it works"
        title={
          <>
            From brief to production <span className="hl">in weeks.</span>
          </>
        }
        description="A lightweight, transparent process designed for async-first remote teams. No bloated discovery phases, no surprise invoices."
        footer={
          <div
            className="mt-4 text-[15px] font-medium text-text-dim"
            style={{ letterSpacing: '-0.32px' }}
          >
            <span className="block sm:inline">
              Typical engagements: MVPs from $3,000
            </span>
            <span aria-hidden="true" className="hidden sm:inline mx-2 opacity-40">
              ·
            </span>
            <span className="block sm:inline">Production systems from $8,000</span>
            <span aria-hidden="true" className="hidden sm:inline mx-2 opacity-40">
              ·
            </span>
            <span className="block sm:inline">Monthly retainers from $2,500/mo</span>
          </div>
        }
      />

      <StaggerGroup className="grid grid-cols-1 lg:grid-cols-4 border border-line">
        {STEPS.map((step, idx) => {
          const isLast = idx === STEPS.length - 1;
          return (
            <StaggerItem
              key={step.number}
              className={cn(
                'px-7 py-9 sm:px-8 bg-bg transition-colors duration-300 ease-brand hover:bg-surface',
                !isLast && 'border-b border-dashed border-line lg:border-b-0',
                !isLast && 'lg:border-r lg:border-dashed lg:border-line',
              )}
            >
              <div
                className="inline-flex items-center justify-center w-6 h-6 bg-accent text-accent-ink text-[13px] font-bold mb-6"
                style={{ letterSpacing: '-0.32px' }}
                aria-hidden="true"
              >
                {step.number}
              </div>
              <h3
                className="text-base font-semibold leading-[1.2] mb-2.5 text-text"
                style={{ letterSpacing: '-0.32px' }}
              >
                {step.title}
              </h3>
              <p
                className="text-[15px] leading-[1.55] text-text-dim font-normal mb-5"
                style={{ letterSpacing: '-0.32px' }}
              >
                {step.description}
              </p>
              <div
                className="text-[12px] text-text-mute uppercase font-medium"
                style={{ letterSpacing: '0.08em' }}
              >
                {step.timeline}
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Container>
  </Section>
);
