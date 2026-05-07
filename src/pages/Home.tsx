import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react';
import { Hero } from '@/components/sections/Hero';
import { SocialProof } from '@/components/sections/SocialProof';

/**
 * Defer the dynamic import until the browser is idle (or after a short
 * fallback timeout). Without this, all 8 below-fold chunks start
 * downloading + parsing on the main thread the instant Home mounts,
 * which steals frame budget from the Hero's entrance animations.
 */
const lazyDeferred = <T extends ComponentType<unknown>>(
  loader: () => Promise<{ default: T }>,
) =>
  lazy(
    () =>
      new Promise<{ default: T }>((resolve, reject) => {
        const start = () => loader().then(resolve, reject);
        type IdleCb = (cb: () => void, opts?: { timeout: number }) => number;
        const ric = (window as unknown as { requestIdleCallback?: IdleCb })
          .requestIdleCallback;
        if (typeof ric === 'function') {
          ric(start, { timeout: 2500 });
        } else {
          window.setTimeout(start, 1500);
        }
      }),
  );

const Services = lazyDeferred(() =>
  import('@/components/sections/Services').then((m) => ({ default: m.Services })),
);
const Projects = lazyDeferred(() =>
  import('@/components/sections/Projects').then((m) => ({ default: m.Projects })),
);
const Testimonials = lazyDeferred(() =>
  import('@/components/sections/Testimonials').then((m) => ({ default: m.Testimonials })),
);
const Writing = lazyDeferred(() =>
  import('@/components/sections/Writing').then((m) => ({ default: m.Writing })),
);
const WhyMe = lazyDeferred(() =>
  import('@/components/sections/WhyMe').then((m) => ({ default: m.WhyMe })),
);
const Process = lazyDeferred(() =>
  import('@/components/sections/Process').then((m) => ({ default: m.Process })),
);
const FAQ = lazyDeferred(() =>
  import('@/components/sections/FAQ').then((m) => ({ default: m.FAQ })),
);
const TechStack = lazyDeferred(() =>
  import('@/components/sections/TechStack').then((m) => ({ default: m.TechStack })),
);
const Contact = lazyDeferred(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact })),
);

const SectionFallback = () => <div aria-hidden="true" className="min-h-[400px]" />;

/**
 * Don't even mount Suspense (which triggers the lazy imports) until the
 * Hero has had a chance to animate without competing for main-thread JS.
 */
const useDeferUntilIdle = (delayMs = 1200) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    type IdleCb = (cb: () => void, opts?: { timeout: number }) => number;
    const ric = (window as unknown as { requestIdleCallback?: IdleCb })
      .requestIdleCallback;
    if (typeof ric === 'function') {
      const id = ric(() => setReady(true), { timeout: delayMs + 1000 });
      return () => {
        type CancelIdle = (handle: number) => void;
        const cic = (window as unknown as { cancelIdleCallback?: CancelIdle })
          .cancelIdleCallback;
        if (typeof cic === 'function') cic(id);
      };
    }
    const timerId = window.setTimeout(() => setReady(true), delayMs);
    return () => window.clearTimeout(timerId);
  }, [delayMs]);
  return ready;
};

export const Home = () => {
  const ready = useDeferUntilIdle();

  return (
    <div id="top">
      <Hero />
      <SocialProof />
      {ready && (
        <Suspense fallback={<SectionFallback />}>
          <Projects />
          <Testimonials />
          <Services />
          <WhyMe />
          <Process />
          <FAQ />
          <TechStack />
          <Writing />
          <Contact />
        </Suspense>
      )}
    </div>
  );
};
