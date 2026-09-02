"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { type ReactNode } from "react";

// ─── Fade In on Scroll ──────────────────────────────────────────────────────

export function FadeIn({
  children,
  className,
  id,
  delay = 0,
  duration = 0.45,
  direction = "up",
  distance = 16,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();

  const offset = () => {
    if (reduced || direction === "none") return { x: 0, y: 0 };
    return (
      {
        up: { x: 0, y: distance },
        down: { x: 0, y: -distance },
        left: { x: distance, y: 0 },
        right: { x: -distance, y: 0 },
      }[direction] ?? { x: 0, y: 0 }
    );
  };

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, ...offset() }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: reduced ? 0.05 : duration,
          delay: reduced ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      viewport={{ once, margin: "-30px" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Container ───────────────────────────────────────────────────────

export function FadeInStagger({
  children,
  className,
  staggerDelay = 0.06,
  delayChildren = 0.02,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-30px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Item ────────────────────────────────────────────────────────────

export function FadeInStaggerItem({
  children,
  className,
  direction = "up",
  distance = 14,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}) {
  const reduced = useReducedMotion();

  const offset = () => {
    if (reduced || direction === "none") return { x: 0, y: 0 };
    return (
      {
        up: { x: 0, y: distance },
        down: { x: 0, y: -distance },
        left: { x: distance, y: 0 },
        right: { x: -distance, y: 0 },
      }[direction] ?? { x: 0, y: 0 }
    );
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset() },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: reduced ? 0.05 : 0.4,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Professional Display Number ─────────────────────────────────────────────

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number | string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

// ─── Hover Card Wrapper ──────────────────────────────────────────────────────

export function HoverCard({
  children,
  className,
  hoverScale = 1.01,
  hoverY = -3,
  ...props
}: HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={
        reduced
          ? undefined
          : { y: hoverY, scale: hoverScale, transition: { duration: 0.18 } }
      }
      whileTap={reduced ? undefined : { scale: 0.99 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── Static Subtle Accent ────────────────────────────────────────────────────

export function AmbientGlow() {
  return null;
}
