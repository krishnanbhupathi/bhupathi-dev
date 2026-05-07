import { motion } from 'framer-motion';
import { SPARK_HEIGHTS } from '@/utils/constants';

interface ActivityCardProps {
  inView: boolean;
}

export const ActivityCard = ({ inView }: ActivityCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
    className="col-span-1 lg:col-start-1 lg:row-start-2"
  >
    <div className="hero-card-float-3 hero-card bg-bg-plain border border-line p-5 shadow-[0_12px_28px_rgba(16,44,38,0.07)] hover:border-accent/40 transition-[border-color] duration-300">
      <div className="text-[10.5px] font-medium tracking-[0.08em] text-text-mute uppercase mb-3.5">
        Activity
      </div>
      <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.06em] uppercase text-accent mb-3">
        <span className="live-dot inline-block w-1.5 h-1.5 bg-accent" aria-hidden="true" />
        Live
      </div>
      <div className="flex items-end gap-1 h-12 sm:h-12 max-sm:h-20">
        {SPARK_HEIGHTS.map((h, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: inView ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 + i * 0.08 }}
            style={{ height: `${h}%`, transformOrigin: 'bottom' }}
            className={`spark-bar flex-1 ${
              i === SPARK_HEIGHTS.length - 1 ? 'bg-accent' : 'bg-surface-2'
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-text-mute uppercase tracking-[0.04em]">
        <span>8 wk ago</span>
        <span>Now</span>
      </div>
    </div>
  </motion.div>
);
