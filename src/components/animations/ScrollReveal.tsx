import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUpVariants, inViewOnce } from '@/utils/motion';

interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
}

export const ScrollReveal = ({ children, delay = 0, ...rest }: ScrollRevealProps) => (
  <motion.div
    variants={fadeUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={inViewOnce}
    transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    {...rest}
  >
    {children}
  </motion.div>
);
