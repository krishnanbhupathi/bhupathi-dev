import {
  Atom,
  Boxes,
  Braces,
  Cloud,
  Code2,
  Coffee,
  Container as ContainerIcon,
  Database,
  GitBranch,
  Layers,
  Leaf,
  Share2,
  Shield,
  Terminal,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHead } from '@/components/layout/SectionHead';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TECH_PILLS } from '@/utils/constants';

const ICON_MAP: Record<string, LucideIcon> = {
  Coffee,
  Leaf,
  Terminal,
  Atom,
  Braces,
  Database,
  Cloud,
  Container: ContainerIcon,
  Boxes,
  Share2,
  Layers,
  Zap,
  Shield,
  GitBranch,
  Code2,
};

export const TechStack = () => {
  const items = [...TECH_PILLS, ...TECH_PILLS];

  return (
    <Section id="stack">
      <Container>
        <SectionHead
          eyebrow="Tech stack"
          title="Tools I reach for."
          description="Battle-tested across production systems. Opinionated about what works, pragmatic about what ships."
        />
      </Container>

      <ScrollReveal
        className="overflow-hidden relative"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <div className="marquee-track">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Code2;
            return (
              <div
                key={`${item.name}-${i}`}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-bg border border-line text-[14.5px] font-medium text-text whitespace-nowrap flex-shrink-0 hover:border-text hover:bg-bg transition-[border-color,background,color] duration-200 ease-brand"
                style={{ letterSpacing: '-0.32px' }}
              >
                <Icon size={17} aria-hidden="true" />
                {item.name}
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </Section>
  );
};
