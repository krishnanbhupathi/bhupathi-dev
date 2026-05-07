import { Plus } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHead } from '@/components/layout/SectionHead';
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What time zones do you cover?',
    answer:
      "I'm in India (GMT+5:30), with overlap windows of roughly 4 hours with EU teams (10:00–14:00 GMT) and 3 hours with US East before EOD. I keep at least one daily standup window in your timezone — usually mornings my time so it lands at the start of EU/UAE work day or the end of US Pacific.",
  },
  {
    question: 'How do you handle payments and invoicing?',
    answer:
      'Wire transfer (most international clients), Wise, or Stripe — your call. For fixed-scope projects I take 40% upfront, 40% at the agreed mid-milestone, and 20% on handoff. Retainers bill monthly in advance. Invoices are GST-compliant from India and itemized clearly for your bookkeeping.',
  },
  {
    question: 'How do we communicate during the engagement?',
    answer:
      'Default is async-first: a shared Slack channel (or Teams/Discord/email — whatever you use) with daily written updates from me. One 30-minute call per week to align on priorities, plus ad-hoc calls when something needs a real conversation. You see working code weekly and can run it yourself, not just status updates.',
  },
  {
    question: 'Who owns the code I pay for?',
    answer:
      'You do. Full IP transfer on final payment, written into the engagement agreement. Source code, deployment configs, infrastructure-as-code, documentation — everything goes to your repos. I retain the right to mention the engagement in case studies (anonymized unless you approve otherwise) and reuse generic patterns I bring in from prior work.',
  },
  {
    question: 'What if requirements change mid-project?',
    answer:
      "Expected — they always do. Small changes inside the original scope, I absorb. Material changes I price as a separate scope addition with a new fixed quote and timeline impact, so you can decide whether to include now, defer to v2, or drop. The original scope stays the contract, and there are never surprise invoices.",
  },
];

export const FAQ = () => (
  <Section id="faq">
    <Container>
      <SectionHead
        eyebrow="Common questions"
        title={
          <>
            Things international clients <span className="hl">always ask.</span>
          </>
        }
        description="Time zones, payments, IP, scope changes — answered upfront so you don't have to."
      />

      <StaggerGroup className="border border-line max-w-[820px] mx-auto">
        {FAQS.map((item) => (
          <StaggerItem key={item.question}>
            <details className="group border-b border-line last:border-b-0 bg-bg open:bg-surface transition-colors duration-200 ease-brand">
              <summary
                className="cursor-pointer list-none flex items-start justify-between gap-4 px-6 py-5 sm:px-8 text-left text-text font-semibold text-[15px] sm:text-base hover:bg-surface focus-visible:bg-surface transition-colors duration-200 ease-brand"
                style={{ letterSpacing: '-0.32px' }}
              >
                <span>{item.question}</span>
                <Plus
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 flex-shrink-0 text-text-mute transition-transform duration-300 ease-brand group-open:rotate-45"
                />
              </summary>
              <div
                className="px-6 pb-6 sm:px-8 sm:pb-7 text-[14.5px] leading-[1.65] text-text-dim"
                style={{ letterSpacing: '-0.32px' }}
              >
                {item.answer}
              </div>
            </details>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Container>
  </Section>
);
