"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// ─── Hero Rotating Tagline ────────────────────────────────────────────────────

const TAGLINES = [
  "Legal counsel for matters that require care and preparation.",
  "Protecting your rights with precision and integrity.",
  "Strategic legal advocacy tailored to your specific matter.",
  "Your interests, defended with diligence and expertise.",
  "Trusted legal representation across Malawi and beyond.",
  "Every matter deserves sound judgment and thorough preparation.",
];

export function RotatingTagline({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % TAGLINES.length);
        setVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <h1
      className={className}
      style={{
        transition: reduced ? "none" : "opacity 0.4s ease, transform 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
      }}
    >
      {TAGLINES[index]}
    </h1>
  );
}

// ─── Year Count-up ────────────────────────────────────────────────────────────

export function YearCountUp({
  from = 2017,
  className,
}: {
  from?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - from;
  const [count, setCount] = useState(reduced ? yearsActive : 0);

  useEffect(() => {
    if (reduced) {
      setCount(yearsActive);
      return;
    }
    let frame: number;
    let start: number | null = null;
    const duration = 1800;

    const tick = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * yearsActive));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    // Small delay before starting
    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 400);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [yearsActive, reduced]);

  return (
    <span className={className} aria-label={`${yearsActive} years`}>
      {count}+
    </span>
  );
}

// ─── Founding Year Ping-Pong Counter ─────────────────────────────────────────
// Counts up 2017 → currentYear, holds 2s, counts back 2017, waits 7s, repeats.

export function FoundingYearStat({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const currentYear = new Date().getFullYear();
  const [display, setDisplay] = useState(2017);

  useEffect(() => {
    if (reduced) {
      setDisplay(currentYear);
      return;
    }

    const COUNT_UP_MS = 1600;   // time to count 2017 → currentYear
    const HOLD_MS     = 2000;   // pause at top before counting down
    const COUNT_DN_MS = 1200;   // time to count back down
    const IDLE_MS     = 7000;   // wait before next cycle

    let frame: number;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(
      from: number,
      to: number,
      duration: number,
      onDone: () => void
    ) {
      let start: number | null = null;
      const tick = (ts: number) => {
        if (cancelled) return;
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        setDisplay(Math.round(from + eased * (to - from)));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          onDone();
        }
      };
      frame = requestAnimationFrame(tick);
    }

    function cycle() {
      if (cancelled) return;
      // Step 1: count up 2017 → currentYear
      animate(2017, currentYear, COUNT_UP_MS, () => {
        if (cancelled) return;
        // Step 2: hold at currentYear for 2s
        timer = setTimeout(() => {
          if (cancelled) return;
          // Step 3: count back down to 2017
          animate(currentYear, 2017, COUNT_DN_MS, () => {
            if (cancelled) return;
            // Step 4: wait 7s then repeat
            timer = setTimeout(() => {
              if (!cancelled) cycle();
            }, IDLE_MS);
          });
        }, HOLD_MS);
      });
    }

    // Small initial delay so it starts after the page fades in
    timer = setTimeout(cycle, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [currentYear, reduced]);

  return <span className={className}>{display}</span>;
}
