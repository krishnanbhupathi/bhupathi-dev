import { motion } from 'framer-motion';
import { SKILLS } from '@/utils/constants';

interface SkillsCardProps {
  inView: boolean;
}

export const SkillsCard = ({ inView }: SkillsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
    className="col-span-1 lg:col-start-2 lg:row-span-2"
  >
    <div className="hero-card-float-2 hero-card bg-bg-plain border border-line p-5 shadow-[0_12px_28px_rgba(16,44,38,0.07)] hover:border-accent/40 transition-[border-color] duration-300">
      <div className="text-[10.5px] font-medium tracking-[0.08em] text-text-mute uppercase mb-3.5">
        Stack
      </div>
      <ul className="space-y-2.5">
        {SKILLS.map((skill, i) => (
          <motion.li
            key={skill.label}
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.5 + i * 0.08 }}
            className="flex items-center gap-2.5 text-[13px] font-medium text-text"
            style={{ letterSpacing: '-0.32px' }}
          >
            <span className="w-1 h-1 bg-accent flex-shrink-0" aria-hidden="true" />
            {skill.label}
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
);
