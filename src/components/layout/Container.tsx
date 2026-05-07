import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Container = ({ children, className, ...rest }: ContainerProps) => (
  <div className={cn('container-app', className)} {...rest}>
    {children}
  </div>
);
