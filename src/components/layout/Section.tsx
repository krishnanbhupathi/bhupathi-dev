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
      'relative py-[56px] sm:py-[72px] lg:py-[88px] 2xs:max-md:py-[48px]',
      className,
    )}
    {...rest}
  >
    {children}
  </section>
);
