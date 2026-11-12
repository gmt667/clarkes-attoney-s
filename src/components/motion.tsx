import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode; className?: string; id?: string; delay?: number; duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'; distance?: number; once?: boolean;
  staggerDelay?: number; delayChildren?: number;
};

// Preserve layout wrappers while keeping content visible at every scroll position.
// Interaction transitions live in CSS and respect prefers-reduced-motion.
export function FadeIn({ children, className, id }: RevealProps) {
  return <div id={id} className={className}>{children}</div>;
}
export const FadeInStagger = FadeIn;
export const FadeInStaggerItem = FadeIn;
