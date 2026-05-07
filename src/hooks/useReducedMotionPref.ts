import { useMediaQuery } from './useMediaQuery';

export function useReducedMotionPref(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
