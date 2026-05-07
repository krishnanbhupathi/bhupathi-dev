import type { ReactNode } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
}

export const SectionHead = ({ eyebrow, title, description, footer }: SectionHeadProps) => (
  <ScrollReveal className="mb-8 lg:mb-12 max-w-[760px]">
    <div className="eyebrow">{eyebrow}</div>
    <h2 className="section-title">{title}</h2>
    {description && <p className="section-desc">{description}</p>}
    {footer}
  </ScrollReveal>
);
