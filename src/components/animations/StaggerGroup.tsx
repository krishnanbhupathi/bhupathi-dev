import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { staggerContainer, staggerItem, inViewOnce } from '@/utils/motion';

interface StaggerGroupProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
}

export const StaggerGroup = ({ children, ...rest }: StaggerGroupProps) => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={inViewOnce}
    {...rest}
  >
    {children}
  </motion.div>
);

interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
}

export const StaggerItem = ({ children, ...rest }: StaggerItemProps) => (
  <motion.div variants={staggerItem} {...rest}>
    {children}
  </motion.div>
);
