import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHead } from '@/components/layout/SectionHead';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { Testimonial } from '@/types';

const TESTIMONIALS: Testimonial[] = [
  {
    initials: 'JL',
    name: 'James L.',
    role: 'CTO · Series A SaaS (12-person team), San Francisco · 3-week engagement',
    reference: 'Full reference available on request',
    quote:
      'Krishna delivered our analytics dashboard in 2.5 weeks — exactly what we scoped. The code was clean, the deployment was smooth, and he caught two edge cases we hadn’t even thought about. Would hire again without hesitation.',
  },
  {
    initials: 'SR',
    name: 'Sara R.',
    role: 'Founder · FinTech Startup (Seed stage), Dubai · 6-month retainer',
    reference: 'Full reference available on request',
    quote:
      'We came to Krishna with a complex payments flow that two other developers had failed on. He understood our compliance requirements from day one and built something we’re still running in production 18 months later.',
  },
  {
    initials: 'MP',
    name: 'Michael P.',
    role: 'CEO · Operations Platform (Series B), London · 8-week build',
    reference: 'Full reference available on request',
    quote:
      'The AI automation suite Krishna built cut our ops time in half. He didn’t just write code — he asked the right questions first, pushed back on features that didn’t matter, and shipped what actually moved the needle.',
  },
];

export const Testimonials = () => (
  <Section id="testimonials">
    <Container>
      <SectionHead
        eyebrow="Client words"
        title={
          <>
            What founders say <span className="hl">after shipping.</span>
          </>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-lg:max-w-[560px] max-lg:mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <ScrollReveal
            key={t.name}
            delay={i * 0.1}
            className="border border-line bg-bg p-7 flex flex-col gap-4 transition-[background,border-color,transform] duration-300 ease-brand hover:bg-surface hover:border-line-strong hover:-translate-y-[3px]"
          >
            <div className="flex gap-[3px]" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx} className="text-accent text-sm" aria-hidden="true">
                  ★
                </span>
              ))}
            </div>
            <div className="flex flex-col flex-1">
              <p
                className="text-[14.5px] leading-[1.65] text-text-dim border-l-2 border-accent pl-3.5"
                style={{ letterSpacing: '-0.32px' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              {t.reference && (
                <p
                  className="text-[12px] italic text-text-mute mt-2 pl-3.5"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  {t.reference}
                </p>
              )}
            </div>
            <div className="flex items-start gap-3">
              <div
                className="w-[38px] h-[38px] bg-text flex items-center justify-center text-[13px] font-semibold text-accent flex-shrink-0"
                aria-hidden="true"
              >
                {t.initials}
              </div>
              <div className="min-w-0">
                <div
                  className="text-[13.5px] font-semibold text-text"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  {t.name}
                </div>
                <div
                  className="text-xs text-text-mute mt-0.5"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Container>
  </Section>
);
