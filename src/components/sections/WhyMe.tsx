import { Cpu, Globe2, Handshake, Zap } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHead } from '@/components/layout/SectionHead';
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup';
import type { WhyItem } from '@/types';

const ITEMS: WhyItem[] = [
  {
    icon: <Globe2 size={19} aria-hidden="true" />,
    title: 'India-based, globally delivered',
    description:
      'Working hours overlap with US, UK, and UAE teams. Clear async docs, tight standups, and no timezone excuses.',
  },
  {
    icon: <Cpu size={19} aria-hidden="true" />,
    title: 'AI-native development workflow',
    description:
      'I ship faster because I build with Claude Code and agent-driven tooling as part of the stack — without sacrificing review, tests, or architecture.',
  },
  {
    icon: <Zap size={19} aria-hidden="true" />,
    title: 'Production-ready in weeks',
    description:
      'MVPs in 2–4 weeks, hardened v1 in 6–10. You get working software on a predictable cadence, not an endless discovery phase.',
  },
  {
    icon: <Handshake size={19} aria-hidden="true" />,
    title: 'Direct founder communication',
    description:
      'One Slack channel, one engineer, one invoice. You get senior judgment on every decision — not a junior working from a spec.',
  },
];

export const WhyMe = () => (
  <Section id="why">
    <Container>
      <SectionHead
        eyebrow="Why work with me"
        title={
          <>
            One engineer. <span className="hl">No layers.</span>
          </>
        }
        description="You talk directly to the person building your product. Decisions move in hours, not sprints. No hand-offs, no middlemen, no surprises."
      />

      <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 border border-line">
        {ITEMS.map((item, idx) => (
          <StaggerItem
            key={item.title}
            className={`px-9 py-10 sm:px-10 bg-bg transition-colors duration-300 ease-brand hover:bg-surface ${
              idx % 2 === 0 ? 'lg:border-r border-line' : ''
            } ${idx < 2 ? 'border-b border-line lg:border-b' : ''} max-lg:[&:not(:last-child)]:border-b max-lg:[&:not(:last-child)]:border-line`}
          >
            <div className="w-[42px] h-[42px] bg-accent text-text inline-flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h3
              className="text-xl font-semibold leading-[1.2] mb-3 text-text"
              style={{ letterSpacing: '-0.32px' }}
            >
              {item.title}
            </h3>
            <p
              className="text-[14.5px] leading-[1.6] text-text-dim"
              style={{ letterSpacing: '-0.32px' }}
            >
              {item.description}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Container>
  </Section>
);
