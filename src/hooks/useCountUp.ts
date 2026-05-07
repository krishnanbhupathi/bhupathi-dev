import { useEffect, useState, type RefObject } from 'react';

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
