import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
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
      {SKILLS.map((skill, i) => (
        <div key={skill.label} className={cn(i === SKILLS.length - 1 ? 'mb-0' : 'mb-3.5')}>
          <div
            className="text-xs font-medium text-text mb-1.5"
            style={{ letterSpacing: '-0.32px' }}
          >
            {skill.label}
          </div>
          <div className="h-1.5 bg-surface-2 relative overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: inView ? `${skill.value}%` : '0%' }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5 + i * 0.05,
              }}
              className={cn(
                'absolute top-0 left-0 bottom-0',
                skill.dark ? 'bg-text sk-fill-shimmer-dark' : 'bg-accent sk-fill-shimmer-light',
              )}
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);
