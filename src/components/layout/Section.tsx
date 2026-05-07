import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  children: ReactNode;
}

export const Section = ({ id, children, className, ...rest }: SectionProps) => (
  <section
    id={id}
    className={cn(
      'relative py-[44px] sm:py-[56px] lg:py-[68px] 2xs:max-md:py-[40px] scroll-mt-[72px]',
      className,
    )}
    {...rest}
  >
    {children}
  </section>
);
