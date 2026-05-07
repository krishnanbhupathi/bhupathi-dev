import { useRef } from 'react';
import { ExperienceCard } from '@/components/cards/ExperienceCard';
import { SkillsCard } from '@/components/cards/SkillsCard';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { useInViewOnce } from '@/hooks/useCountUp';

export const HeroCardsGrid = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, 0.15);

  return (
    <div
      ref={ref}
      className="xl:sticky xl:top-[120px] self-start"
      style={{ perspective: '1200px' }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-3"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <ExperienceCard inView={inView} />
        <SkillsCard inView={inView} />
        <ActivityCard inView={inView} />
      </div>
    </div>
  );
};
