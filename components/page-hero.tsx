"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  stat?: string;
  statLabel?: string;
  icon?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  copy,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  stat,
  statLabel,
  icon,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-inner">
        {/* Left Column: Copy & Actions */}
        <FadeInStagger className="page-hero-copy">
          <FadeInStaggerItem>
            <p className="page-kicker">{eyebrow}</p>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <h1>{title}</h1>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <p className="page-hero-description">{copy}</p>
          </FadeInStaggerItem>

          {primaryHref || secondaryHref ? (
            <FadeInStaggerItem>
              <div className="page-hero-actions">
                {primaryHref && primaryLabel ? (
                  <Link className="button button-solid" href={primaryHref}>
                    <span>{primaryLabel}</span>
                  </Link>
                ) : null}
                {secondaryHref && secondaryLabel ? (
                  <Link className="button button-ghost" href={secondaryHref}>
                    <span>{secondaryLabel}</span>
                  </Link>
                ) : null}
              </div>
            </FadeInStaggerItem>
          ) : null}
        </FadeInStagger>

        {/* Right Column: Key Metric / Identity Card */}
        {stat || statLabel || icon ? (
          <FadeIn direction="left" delay={0.12} className="page-hero-card-wrap">
            <div className="page-hero-card">
              {icon ? <div className="page-hero-card-icon">{icon}</div> : null}
              <div className="page-hero-card-text">
                {stat ? <strong>{stat}</strong> : null}
                {statLabel ? <span>{statLabel}</span> : null}
              </div>
            </div>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}
