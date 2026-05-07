import { lazy, Suspense } from 'react';
import { Hero } from '@/components/sections/Hero';
import { SocialProof } from '@/components/sections/SocialProof';

const Projects = lazy(() =>
  import('@/components/sections/Projects').then((m) => ({ default: m.Projects })),
);
const Services = lazy(() =>
  import('@/components/sections/Services').then((m) => ({ default: m.Services })),
);
const WhyMe = lazy(() =>
  import('@/components/sections/WhyMe').then((m) => ({ default: m.WhyMe })),
);
const Process = lazy(() =>
  import('@/components/sections/Process').then((m) => ({ default: m.Process })),
);
const FAQ = lazy(() =>
  import('@/components/sections/FAQ').then((m) => ({ default: m.FAQ })),
);
const TechStack = lazy(() =>
  import('@/components/sections/TechStack').then((m) => ({ default: m.TechStack })),
);
const Writing = lazy(() =>
  import('@/components/sections/Writing').then((m) => ({ default: m.Writing })),
);
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact })),
);

const SectionFallback = () => <div aria-hidden="true" className="min-h-[200px]" />;

export const Home = () => (
  <div id="top">
    <Hero />
    <SocialProof />
    <Suspense fallback={<SectionFallback />}>
      <Projects />
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <Services />
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <WhyMe />
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <Process />
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <FAQ />
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <TechStack />
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <Writing />
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <Contact />
    </Suspense>
  </div>
);
