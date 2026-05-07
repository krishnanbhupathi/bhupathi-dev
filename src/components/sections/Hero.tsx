import { useEffect, useRef, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { SectionLink } from '@/components/layout/SectionLink';
import { HeroCardsGrid } from './HeroCardsGrid';
import { StatusBar } from '@/components/cards/StatusBar';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';
import { TYPEWRITER_WORDS, HERO_DESCRIPTION, SITE } from '@/utils/constants';

const longestWord = TYPEWRITER_WORDS.reduce((a, b) => (b.length > a.length ? b : a), '');

export const Hero = () => {
  const reduced = useReducedMotionPref();
  const word = useTypewriter({
    words: TYPEWRITER_WORDS,
    enabled: !reduced,
  });
  const sectionRef = useRef<HTMLElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);

  // Mouse parallax — rAF-throttled so handlers don't fire per mousemove pixel.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    let mx = 0;
    let my = 0;
    let rafId = 0;
    let pending = false;

    const flush = () => {
      pending = false;
      if (blobARef.current) {
        blobARef.current.style.transform = `translate3d(${mx * -30}px, ${my * -20}px, 0)`;
      }
      if (blobBRef.current) {
        blobBRef.current.style.transform = `translate3d(${mx * 20}px, ${my * 15}px, 0)`;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width - 0.5;
      my = (e.clientY - rect.top) / rect.height - 0.5;
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(flush);
      }
    };
    const onLeave = () => {
      mx = 0;
      my = 0;
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(flush);
      }
    };

    section.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onLeave);
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('heroEmail') as HTMLInputElement).value;
    const subject = encodeURIComponent('New project inquiry');
    const body = encodeURIComponent(`Hi Krishna,\n\nI'd like to discuss a project.\n\n— ${email}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden min-h-[100vh] flex items-center pt-[100px] sm:pt-[130px] pb-12 sm:pb-16"
    >
      {/* Background blobs */}
      <div ref={blobARef} className="hero-blob" />
      <div ref={blobBRef} className="hero-blob-2" />

      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-16 items-start w-full">
          {/* LEFT */}
          <div className="max-w-[560px]">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-line bg-surface text-[13px] font-medium text-text mb-8"
              style={{ letterSpacing: '-0.32px' }}
            >
              <span className="pulse-dot rounded-full" aria-hidden="true" />
              Available for new projects — {SITE.availability}
            </motion.div>

            {/* Title */}
            <h1
              className="font-semibold text-text mb-6"
              style={{
                fontSize: 'clamp(36px, 4.4vw, 60px)',
                lineHeight: 1.05,
                letterSpacing: '-0.032em',
              }}
            >
              <span className="hero-line">
                <span className="hero-line-inner">I build software</span>
              </span>
              <span className="hero-line">
                <span className="hero-line-inner">
                  that{' '}
                  <span className="type-wrap">
                    <span className="type-ghost" aria-hidden="true">
                      {longestWord}
                    </span>
                    <span className="type-accent" aria-live="polite" aria-atomic="true">
                      {word}
                      <span className="type-cursor" aria-hidden="true" />
                    </span>
                  </span>
                </span>
              </span>
            </h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="text-[17px] leading-[1.55] text-text-dim font-normal max-w-[480px] mb-9"
              style={{ letterSpacing: '-0.32px' }}
            >
              {HERO_DESCRIPTION}
            </motion.p>

            {/* Email capture */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="hero-capture max-2xs:flex-col"
            >
              <label htmlFor="heroEmail" className="sr-only">
                Your work email
              </label>
              <input
                id="heroEmail"
                name="heroEmail"
                type="email"
                required
                placeholder="Enter your work email"
                className="flex-1 px-4 py-3.5 bg-transparent border-none outline-none text-[15px] text-text placeholder:text-text-mute"
                style={{ letterSpacing: '-0.32px' }}
              />
              <button
                type="submit"
                className="hero-capture-btn px-5 py-3.5 bg-text text-accent text-[15px] font-medium inline-flex items-center justify-center gap-2 hover:-translate-y-px transition-transform duration-200 max-2xs:w-full min-h-[44px]"
                style={{ letterSpacing: '-0.32px' }}
              >
                Get a reply in 24h →
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              className="mt-3.5 text-[13.5px] text-text-mute"
              style={{ letterSpacing: '-0.32px' }}
            >
              Prefer to message?{' '}
              <SectionLink
                section="contact"
                className="text-text border-b border-line hover:border-text pb-px"
              >
                Send a brief
              </SectionLink>{' '}
              or email{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="text-text border-b border-line hover:border-text pb-px"
              >
                {SITE.email}
              </a>
              .
            </motion.div>

            <StatusBar />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
              className="mt-3 text-[12.5px] text-text-mute"
              style={{ letterSpacing: '-0.32px' }}
            >
              GMT+5:30 <span className="opacity-40">·</span> 4-hour overlap with EU{' '}
              <span className="opacity-40">·</span> 3-hour overlap with US East
            </motion.div>
          </div>

          {/* RIGHT — cards grid */}
          <HeroCardsGrid />
        </div>
      </Container>
    </section>
  );
};
