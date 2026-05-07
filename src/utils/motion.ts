import type { Variants } from 'framer-motion';

export const BRAND_EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: BRAND_EASE },
  },
};

export const cardEnterVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: BRAND_EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: BRAND_EASE },
  },
};

/**
 * Trigger reveals well before the element scrolls into view so animations
 * complete by the time the user actually sees them. Avoids blank-section
 * gaps on mobile where users scroll faster than `amount: 0.12` can catch.
 */
export const inViewOnce = {
  once: true,
  amount: 0,
  margin: '0px 0px 200px 0px',
} as const;
