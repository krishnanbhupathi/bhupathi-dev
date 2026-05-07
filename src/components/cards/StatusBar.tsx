import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';

/**
 * Outer motion.div handles the entrance fade-up. An inner div carries
 * the rAF-driven horizontal sway so the two transforms don't collide.
 */
export const StatusBar = () => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotionPref();

  useEffect(() => {
    const el = innerRef.current;
    if (!el || reduced) return;

    let rafId = 0;
    let started = false;
    const startTime = performance.now();

    const startSwayAfterFade = window.setTimeout(() => {
      started = true;
      const w = window.innerWidth;
      const amplitude = w <= 480 ? 12 : w <= 720 ? 18 : 30;
      const speed = 0.0008;

      const loop = (now: number) => {
        if (!started || !el) return;
        const t = (now - startTime) * speed;
        const x = Math.sin(t) * amplitude;
        el.style.transform = `translate3d(${x}px, 0, 0)`;
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }, 700);

    return () => {
      started = false;
      window.clearTimeout(startSwayAfterFade);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="mt-7 max-w-[520px]"
    >
      <div
        ref={innerRef}
        className="status-bar-scan flex items-center gap-5 px-6 py-[18px] bg-text border border-line"
        style={{ willChange: 'transform' }}
      >
        <span className="status-dot" aria-hidden="true" />
        <span
          className="text-[13px] font-medium text-white"
          style={{ letterSpacing: '-0.32px' }}
        >
          <strong className="text-accent font-semibold">Available</strong> for Q2 2026 projects
        </span>
        <div className="ml-auto flex gap-2">
          {['Remote', 'India'].map((label) => (
            <span
              key={label}
              className="px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-white/70 bg-white/10 hover:bg-accent/20 hover:text-accent hover:-translate-y-px transition-all duration-200"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
