import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Linkedin, Mail, Shield } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SITE } from '@/utils/constants';

const BOOK_CALL_URL = 'https://calendly.com/krishnanbhupathi/30min';

const BRAND_EASE = [0.22, 1, 0.36, 1] as const;

const PAINS = [
  {
    title: "It demoed beautifully. In prod it doesn't.",
    body: 'Timeouts, half-finished runs, retries spiralling — your agent looks fragile to the people paying you.',
  },
  {
    title: 'Every crash = manual restart + lost context',
    body: "You're babysitting a system that should be unattended. Every Slack ping kills focus and erodes trust.",
  },
  {
    title: "You don't have time to re-architect",
    body: "The roadmap is moving. You need someone who's already shipped this pattern to come in, fix it, hand it back.",
  },
];

const STACK = [
  { day: 'Day 1', title: 'Live architecture review (90-min recorded session)', value: '$1,500' },
  {
    day: 'Day 2–3',
    title:
      'Full failure-mode audit — retry gaps, state-loss points, cost leaks, prompt drift, documented',
    value: '$2,500',
  },
  {
    day: 'Day 4',
    title:
      'Hardened reference implementation of your most critical workflow (Temporal-based, production-ready code, yours to keep)',
    value: '$5,000',
  },
  {
    day: 'Day 5',
    title:
      'Walkthrough call + written playbook to apply the same pattern across the rest of your stack',
    value: '$1,000',
  },
  { day: 'Bonus', title: '2 weeks of async Slack access for follow-up questions', value: '$1,000' },
  { day: 'Bonus', title: 'Monitoring + alerting blueprint specific to your stack', value: '$500' },
  {
    day: 'Bonus',
    title: 'LLM cost audit — current spend breakdown + 30-day savings projection',
    value: '$1,000',
  },
];

const PROCESS = [
  {
    day: 'Day 1',
    title: 'Architecture review',
    body: 'Live session. I walk through your current workflow, ask the questions that surface the hidden assumptions. Recorded for your team.',
  },
  {
    day: 'Day 2',
    title: 'Failure-mode mapping',
    body: 'Async work. Every retry gap, state-loss point, prompt drift risk, and cost leak in your current setup — documented as I go.',
  },
  {
    day: 'Day 3',
    title: 'Findings checkpoint',
    body: "You get the audit doc. At least 3 production-breaking issues identified — guaranteed, or you don't pay.",
  },
  {
    day: 'Day 4',
    title: 'Hardened build',
    body: 'I ship a production-ready reference: your most critical workflow, fixed. Real code in your repo, with tests.',
  },
  {
    day: 'Day 5',
    title: 'Handoff + playbook',
    body: 'Walkthrough call. Written playbook so your team can apply the same pattern to every other workflow.',
  },
];

const FAQS = [
  {
    q: "What if we're not using Temporal?",
    a: "I evaluate your current stack on Day 1 — LangGraph, custom queues, Inngest, raw cron, whatever you've got. Temporal is what I default to for the reference implementation because it's the most battle-tested for durable agents, but the audit itself is stack-agnostic.",
  },
  {
    q: "What if we can't share code?",
    a: 'Standard mutual NDA before Day 1. I can also work from a sanitized copy of the repo if your IP situation requires it. Most clients sign within 24 hours.',
  },
  {
    q: 'What if we need more than 5 days?',
    a: 'The audit ends on Day 5 regardless — fixed scope is the whole point. If you want to extend into a build engagement, we scope and price that separately, typically 4–8 weeks for full production hardening across a workflow suite.',
  },
  {
    q: 'How does payment work?',
    a: '50% on Day 1 to lock the engagement, 50% on Day 3 right after the audit findings are delivered (the guarantee trigger point). Stripe USD, wire transfer, or Wise — your call. Invoice goes out before kickoff.',
  },
  {
    q: 'What time zone do you work in?',
    a: "I'm in India (GMT+5:30). All deliverables are async; the 2 live calls (Day 1 review, Day 5 walkthrough) get scheduled in your morning or your evening, whichever you prefer. I keep a daily overlap window with US Pacific morning / US Eastern mid-day.",
  },
];

const PROOF_ITEMS: [string, string][] = [
  ['LLM-powered', 'Document processing'],
  ['Durable', 'Orchestration via Temporal'],
  ['Slack-native', 'Human-in-the-loop'],
];

const CARD_HOVER =
  'transition-[transform,border-color,box-shadow,background] duration-[350ms] ease-brand hover:-translate-y-1 hover:border-text hover:shadow-[0_16px_36px_rgba(16,44,38,0.07)] hover:bg-bg-plain';

export const Audit = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = 'AI Workflow Reliability Audit — Krishna Bhupathi';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div id="top" className="pb-24 sm:pb-0">
      {/* Top wordmark + secondary CTA */}
      <div className="border-b border-line relative z-[2]">
        <Container className="py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-[10px] text-text font-semibold text-base"
            style={{ letterSpacing: '-0.32px' }}
          >
            <span className="w-2 h-2 bg-accent" aria-hidden="true" />
            Krishna Bhupathi
          </Link>
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-text text-accent text-sm font-medium min-h-[40px] hover:-translate-y-px transition-transform duration-200 ease-brand"
            style={{ letterSpacing: '-0.32px' }}
          >
            Book diagnosis call →
          </a>
        </Container>
      </div>

      {/* HERO */}
      <section className="pt-10 sm:pt-24 pb-10 sm:pb-20">
        <Container>
          <div className="max-w-[860px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: BRAND_EASE, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-line bg-surface text-[13px] font-medium text-text mb-5 sm:mb-7"
              style={{ letterSpacing: '-0.32px' }}
            >
              <span className="pulse-dot rounded-full" aria-hidden="true" />
              5-day audit · Fixed price · Money-back guarantee
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: BRAND_EASE, delay: 0.2 }}
              className="font-semibold text-text mb-5 sm:mb-6"
              style={{
                fontSize: 'clamp(28px, 4.8vw, 60px)',
                lineHeight: 1.1,
                letterSpacing: '-0.028em',
              }}
            >
              Your AI agent keeps breaking in production.{' '}
              <span className="hl">I&apos;ll fix it in 5 days</span> — or you don&apos;t pay.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: BRAND_EASE, delay: 0.32 }}
              className="text-[18px] leading-[1.55] text-text-dim mb-8 max-w-[640px]"
              style={{ letterSpacing: '-0.32px' }}
            >
              For founders running Claude, GPT, LangChain, or custom agents in production. I audit
              your workflow, identify every failure mode, and ship a hardened reference
              implementation — all inside one week, for a fixed $4,500.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: BRAND_EASE, delay: 0.44 }}
              className="flex flex-wrap items-center gap-3 mb-7"
            >
              <a
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-text text-accent text-[15px] font-medium hover:-translate-y-px transition-transform duration-200 ease-brand min-h-[48px]"
                style={{ letterSpacing: '-0.32px' }}
              >
                <CalendarDays size={16} aria-hidden="true" />
                Book a 30-min diagnosis call
              </a>
              <a
                href="#offer"
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-line-strong text-text text-[15px] font-medium hover:bg-surface transition-colors duration-200 ease-brand min-h-[48px]"
                style={{ letterSpacing: '-0.32px' }}
              >
                See what&apos;s included →
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: BRAND_EASE, delay: 0.55 }}
              className="text-[13.5px] text-text-mute"
              style={{ letterSpacing: '-0.32px' }}
            >
              Ex-Amazon SDE · 5 years of shipping production systems · Working with founders in
              the US, UK, and UAE
            </motion.p>
          </div>
        </Container>
      </section>

      {/* PAIN */}
      <section className="py-16 sm:py-20 border-t border-line bg-surface/40">
        <Container>
          <ScrollReveal>
            <div className="max-w-[820px] mb-10">
              <div className="eyebrow">If this sounds familiar</div>
              <h2
                className="font-semibold text-text"
                style={{
                  fontSize: 'clamp(28px, 3.4vw, 38px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.32px',
                }}
              >
                You shipped the demo.{' '}
                <span className="hl">Production is a different beast.</span>
              </h2>
            </div>
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PAINS.map((p) => (
              <StaggerItem key={p.title} className={`border border-line bg-bg p-6 ${CARD_HOVER}`}>
                <div
                  className="text-[16px] font-semibold text-text mb-2"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  {p.title}
                </div>
                <div
                  className="text-[14px] leading-[1.55] text-text-dim"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  {p.body}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* OFFER STACK */}
      <section id="offer" className="py-16 sm:py-24 border-t border-line scroll-mt-[32px]">
        <Container>
          <ScrollReveal>
            <div className="max-w-[820px] mb-10">
              <div className="eyebrow">The offer</div>
              <h2
                className="font-semibold text-text mb-5"
                style={{
                  fontSize: 'clamp(28px, 3.4vw, 40px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.32px',
                }}
              >
                Here&apos;s exactly what you get in <span className="hl">5 working days.</span>
              </h2>
              <p
                className="text-[16px] leading-[1.55] text-text-dim"
                style={{ letterSpacing: '-0.32px' }}
              >
                Every deliverable below has a standalone market value. Stacked, they&apos;re worth
                $12,500. Your investment is $4,500.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="border border-line bg-bg max-w-[960px]">
              {STACK.map((item, idx) => (
                <div
                  key={`${item.day}-${idx}`}
                  className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-5 sm:p-6 ${
                    idx < STACK.length - 1 ? 'border-b border-line' : ''
                  }`}
                >
                  <div
                    className="text-[11px] font-semibold uppercase text-text-mute sm:w-[80px] flex-shrink-0"
                    style={{ letterSpacing: '0.06em' }}
                  >
                    {item.day}
                  </div>
                  <div
                    className="flex-1 text-[14.5px] text-text leading-[1.5]"
                    style={{ letterSpacing: '-0.32px' }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="text-[14px] font-semibold text-text-dim sm:text-right sm:w-[90px]"
                    style={{ letterSpacing: '-0.32px' }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-6 p-5 sm:p-6 border-t-2 border-text bg-surface">
                <div
                  className="flex-1 text-[15px] font-semibold text-text"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  Stacked value
                </div>
                <div
                  className="text-[16px] font-semibold text-text line-through opacity-60"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  $12,500
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 bg-text text-accent">
                <div
                  className="flex-1 text-[16px] font-semibold"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  Your investment
                </div>
                <div className="text-[24px] font-semibold" style={{ letterSpacing: '-0.32px' }}>
                  $4,500
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* GUARANTEE — dark stamp */}
      <section className="py-16 sm:py-24 border-t border-line">
        <Container>
          <ScrollReveal>
            <div className="max-w-[860px] mx-auto relative">
              {/* Corner stamp brackets */}
              <span
                aria-hidden="true"
                className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-text"
              />
              <span
                aria-hidden="true"
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-text"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-text"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-text"
              />

              {/* Inner dark stamp */}
              <div className="border-2 border-text bg-text px-6 py-10 sm:px-12 sm:py-14 text-center relative overflow-hidden">
                {/* Dot pattern bg */}
                <div
                  className="absolute inset-0 opacity-[0.10] pointer-events-none"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      'radial-gradient(rgba(178, 230, 89, 1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative">
                  {/* Shield in bordered square */}
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 border-2 border-accent mb-6">
                    <Shield size={28} className="text-accent" aria-hidden="true" />
                  </div>

                  <div className="flex items-center justify-center gap-3 mb-7">
                    <span aria-hidden="true" className="w-8 h-px bg-accent/40" />
                    <div
                      className="text-[11px] font-semibold uppercase text-accent"
                      style={{ letterSpacing: '0.18em' }}
                    >
                      The Guarantee
                    </div>
                    <span aria-hidden="true" className="w-8 h-px bg-accent/40" />
                  </div>

                  <p
                    className="text-accent/90 font-medium mb-4 max-w-[640px] mx-auto"
                    style={{
                      fontSize: 'clamp(16px, 1.8vw, 21px)',
                      lineHeight: 1.5,
                      letterSpacing: '-0.32px',
                    }}
                  >
                    If by Day 3 I haven&apos;t identified at least 3 production-breaking issues in
                    your current workflow,
                  </p>

                  <p
                    className="text-accent font-bold mb-5"
                    style={{
                      fontSize: 'clamp(32px, 5.2vw, 56px)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    you don&apos;t pay.
                  </p>

                  <p
                    className="text-accent/60 text-[14px]"
                    style={{ letterSpacing: '-0.32px' }}
                  >
                    You keep everything I&apos;ve produced.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="py-16 sm:py-24 border-t border-line bg-surface/40">
        <Container>
          <ScrollReveal>
            <div className="max-w-[820px] mb-10">
              <div className="eyebrow">The process</div>
              <h2
                className="font-semibold text-text"
                style={{
                  fontSize: 'clamp(28px, 3.4vw, 38px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.32px',
                }}
              >
                <span className="hl">Day by day,</span> no guessing.
              </h2>
            </div>
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PROCESS.map((p) => (
              <StaggerItem key={p.day} className={`border border-line bg-bg p-5 ${CARD_HOVER}`}>
                <div
                  className="text-[11px] font-semibold uppercase text-text-mute mb-3"
                  style={{ letterSpacing: '0.06em' }}
                >
                  {p.day}
                </div>
                <div
                  className="text-[15px] font-semibold text-text mb-2"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  {p.title}
                </div>
                <div
                  className="text-[13px] leading-[1.5] text-text-dim"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  {p.body}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* PROOF */}
      <section className="py-16 sm:py-24 border-t border-line">
        <Container>
          <ScrollReveal>
            <div className="max-w-[820px] mb-8">
              <div className="eyebrow">Proof I&apos;ve shipped this</div>
              <h2
                className="font-semibold text-text mb-5"
                style={{
                  fontSize: 'clamp(28px, 3.4vw, 38px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.32px',
                }}
              >
                The pattern I&apos;ll apply, <span className="hl">already in production.</span>
              </h2>
              <p
                className="text-[16px] leading-[1.55] text-text-dim"
                style={{ letterSpacing: '-0.32px' }}
              >
                I designed an LLM-driven automation suite for a logistics ops client — document
                parsing with the Claude API, durable orchestration with Temporal, Slack-native
                human-in-the-loop for edge cases. The same architecture I&apos;ll harden for you.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div
              className={`border border-line bg-bg p-6 sm:p-8 max-w-[960px] ${CARD_HOVER}`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {PROOF_ITEMS.map(([value, label]) => (
                  <div key={value}>
                    <div
                      className="text-[16px] font-semibold text-text"
                      style={{ letterSpacing: '-0.32px' }}
                    >
                      {value}
                    </div>
                    <div
                      className="text-[12px] text-text-mute uppercase mt-1"
                      style={{ letterSpacing: '0.06em' }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <Link
                to="/#work"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-text border-b border-line hover:border-text pb-px transition-colors duration-200 ease-brand"
                style={{ letterSpacing: '-0.32px' }}
              >
                See full case studies on the main portfolio
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ABOUT */}
      <section className="py-16 sm:py-20 border-t border-line bg-surface/40">
        <Container>
          <ScrollReveal>
            <div className="max-w-[760px]">
              <div className="eyebrow">Who I am</div>
              <h2
                className="font-semibold text-text mb-6"
                style={{
                  fontSize: 'clamp(24px, 2.8vw, 32px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.32px',
                }}
              >
                Senior backend engineer.{' '}
                <span className="hl">5 years in production systems.</span>
              </h2>
              <p
                className="text-[16px] leading-[1.6] text-text-dim mb-4"
                style={{ letterSpacing: '-0.32px' }}
              >
                Ex-Amazon SDE. Spent the last few years freelancing for founders in the US, UK,
                and UAE — mostly taking fragile MVPs and re-architecting them into systems that
                survive real load and audit. AI workflow reliability is the single problem I see
                most right now, so this is the engagement I built around it.
              </p>
              <p
                className="text-[16px] leading-[1.6] text-text-dim"
                style={{ letterSpacing: '-0.32px' }}
              >
                India-based (GMT+5:30). Async-default. Always overlap a window with your team.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 border-t border-line">
        <Container>
          <ScrollReveal>
            <div className="max-w-[820px] mb-10">
              <div className="eyebrow">Common questions</div>
              <h2
                className="font-semibold text-text"
                style={{
                  fontSize: 'clamp(28px, 3.4vw, 38px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.32px',
                }}
              >
                Before you book the call.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="border border-line max-w-[820px]">
              {FAQS.map((item) => (
                <details
                  key={item.q}
                  className="group border-b border-line last:border-b-0 bg-bg open:bg-surface transition-colors duration-200 ease-brand"
                >
                  <summary
                    className="cursor-pointer list-none flex items-start justify-between gap-4 px-6 py-5 sm:px-8 text-left text-text font-semibold text-[15px] sm:text-base hover:bg-surface focus-visible:bg-surface transition-colors duration-200 ease-brand"
                    style={{ letterSpacing: '-0.32px' }}
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex-shrink-0 text-text-mute transition-transform duration-300 ease-brand group-open:rotate-45 text-xl leading-none select-none"
                    >
                      +
                    </span>
                  </summary>
                  <div
                    className="px-6 pb-6 sm:px-8 sm:pb-7 text-[14.5px] leading-[1.65] text-text-dim"
                    style={{ letterSpacing: '-0.32px' }}
                  >
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-24 border-t border-line bg-text text-accent">
        <Container>
          <ScrollReveal>
            <div className="max-w-[760px]">
              <h2
                className="font-semibold mb-6"
                style={{
                  fontSize: 'clamp(30px, 4vw, 44px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.32px',
                }}
              >
                5 days. Fixed price.{' '}
                <span style={{ color: '#b2e659' }}>Or you don&apos;t pay.</span>
              </h2>
              <p
                className="text-[17px] leading-[1.55] mb-8 opacity-90"
                style={{ letterSpacing: '-0.32px' }}
              >
                Book a 30-minute call. We&apos;ll walk through your current workflow and I&apos;ll
                tell you on the call whether the audit makes sense for you. If it does, you can
                start as early as next Monday.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={BOOK_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 bg-accent text-text text-[16px] font-semibold hover:-translate-y-px transition-transform duration-200 ease-brand min-h-[52px]"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  <CalendarDays size={16} aria-hidden="true" />
                  Book a 30-min diagnosis call
                </a>
                <a
                  href={`mailto:${SITE.email}?subject=AI%20Workflow%20Audit%20%E2%80%94%20question`}
                  className="inline-flex items-center gap-2 px-6 py-4 border border-accent text-accent text-[16px] font-medium hover:bg-accent hover:text-text transition-colors duration-200 ease-brand min-h-[52px]"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  <Mail size={16} aria-hidden="true" />
                  Email a question
                </a>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* MINI FOOTER */}
      <footer className="py-8 border-t border-line">
        <Container className="flex items-center justify-between gap-5 flex-wrap text-[13px] text-text-mute">
          <p style={{ letterSpacing: '-0.32px' }}>{SITE.copyright}</p>
          <div className="flex gap-5 items-center">
            <a
              href={`mailto:${SITE.email}`}
              className="hover:text-text transition-colors duration-200 ease-brand"
              style={{ letterSpacing: '-0.32px' }}
            >
              {SITE.email}
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors duration-200 ease-brand inline-flex items-center gap-1.5"
              style={{ letterSpacing: '-0.32px' }}
            >
              <Linkedin size={14} aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </Container>
      </footer>

      {/* STICKY BOTTOM CTA — mobile only */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-bg p-3 shadow-[0_-8px_24px_rgba(16,44,38,0.08)]">
        <a
          href={BOOK_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-text text-accent text-[15px] font-semibold min-h-[48px]"
          style={{ letterSpacing: '-0.32px' }}
        >
          <CalendarDays size={16} aria-hidden="true" />
          Book diagnosis call
        </a>
      </div>
    </div>
  );
};
