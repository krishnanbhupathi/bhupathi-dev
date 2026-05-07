import { useEffect, useState, type RefObject } from 'react';

interface UseCountUpOptions {
  target: number;
  startWhen: boolean;
  stepMs?: number;
  startDelayMs?: number;
}

export function useCountUp({
  target,
  startWhen,
  stepMs = 220,
  startDelayMs = 600,
}: UseCountUpOptions): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startWhen) return;
    let cancelled = false;
    let current = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const step = () => {
      if (cancelled) return;
      current += 1;
      setValue(current);
      if (current < target) {
        timeoutId = setTimeout(step, stepMs);
      }
    };

    timeoutId = setTimeout(step, startDelayMs);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [target, startWhen, stepMs, startDelayMs]);

  return value;
}

export function useInViewOnce(ref: RefObject<Element>, threshold = 0.15): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ref, threshold]);

  return inView;
}
