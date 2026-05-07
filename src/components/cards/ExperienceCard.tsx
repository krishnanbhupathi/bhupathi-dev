import { motion } from 'framer-motion';
import { DOMAIN_TAGS } from '@/utils/constants';

interface ExperienceCardProps {
  inView: boolean;
}

export const ExperienceCard = ({ inView }: ExperienceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
    className="col-span-1 row-span-1"
  >
    <div className="hero-card-float-1 hero-card relative overflow-hidden bg-bg-plain border border-line p-6 shadow-[0_12px_28px_rgba(16,44,38,0.07)] hover:border-accent/40 transition-[border-color] duration-300">
      {/* Progress ring (decorative) */}
      <svg className="absolute top-5 right-5 w-11 h-11" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="20" fill="none" strokeWidth="3" className="stroke-surface-2" />
        <motion.circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          strokeWidth="3"
          stroke="#b2e659"
          strokeDasharray={126}
          strokeLinecap="butt"
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          initial={{ strokeDashoffset: 126 }}
          animate={inView ? { strokeDashoffset: 31 } : { strokeDashoffset: 126 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
        />
      </svg>

      <div className="text-[10.5px] font-medium tracking-[0.08em] text-text-mute uppercase mb-3.5">
        Focus
      </div>
      <div
        className="font-semibold text-text leading-none whitespace-nowrap"
        style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.04em' }}
      >
        Production
      </div>
      <div
        className="mt-1.5 text-[13px] text-text-mute font-medium"
        style={{ letterSpacing: '-0.32px' }}
      >
        systems at scale
      </div>
      <div className="mt-3 flex gap-1.5 flex-wrap">
        {DOMAIN_TAGS.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.2 + i * 0.15 }}
            className="inline-block px-2 py-[3px] bg-surface-2 text-[11px] tracking-[0.02em] text-text-dim"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </div>
  </motion.div>
);
