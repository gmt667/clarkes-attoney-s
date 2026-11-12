import type { ComponentProps } from 'react';

export function Card({ className = '', ...props }: ComponentProps<'article'>) {
  return <article {...props} className={`detail-card ${className}`} />;
}
