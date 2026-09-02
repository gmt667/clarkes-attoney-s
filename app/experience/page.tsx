import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Landmark } from "lucide-react";
import { ClientLogoCard } from "@/components/client-logo-card";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/motion";
import { getCmsContent } from "@/lib/cms";
import { experienceHighlights } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Our Experience | Clarkes Attorneys",
  description:
    "Explore Clarkes Attorneys' representative client portfolio, sector experience, and track record across public law, corporate advisory, energy, and real estate.",
};

export default async function ExperiencePage() {
  const { clients } = await getCmsContent();

  return (
    <PageShell>
      <PageHero
        eyebrow="Our Experience"
        title="Experience across public, corporate, and energy sectors."
        copy="Clarkes Attorneys delivers practical legal solutions to corporations, institutions, state bodies, civil society organizations, and individuals."
        primaryHref="/contact"
        primaryLabel="Schedule a consultation"
        secondaryHref="/our-team"
        secondaryLabel="Meet the team"
        stat={`${clients.length}+`}
        statLabel="Representative organizations and institutions served across multiple sectors."
        icon={<Landmark />}
      />

      <section className="clients-section">
        <FadeIn className="section-title section-title-centered">
          <div className="eyebrow">Sector Highlights</div>
          <h2>Representative capabilities.</h2>
          <p>
            Representative areas of work across commercial and public
            engagements.
          </p>
        </FadeIn>

        <FadeInStagger className="experience-highlights-grid experience-section-gap" staggerDelay={0.06}>
          {experienceHighlights.map((highlight) => (
            <FadeInStaggerItem key={highlight.title}>
              <article className="experience-highlight-card">
                <div className="experience-highlight-header">
                  <h3>{highlight.title}</h3>
                  <div className="highlight-stat-box">
                    <span className="highlight-stat">{highlight.stat}</span>
                    <span className="highlight-stat-label">{highlight.statLabel}</span>
                  </div>
                </div>
                <p>{highlight.description}</p>
              </article>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>

        <FadeIn className="section-title section-title-centered">
          <div className="eyebrow">Client Portfolio</div>
          <h2>Organizations and institutions represented.</h2>
          <p>
            A representative sample of clients who have trusted Clarkes
            Attorneys for counsel, advisory, and litigation.
          </p>
        </FadeIn>

        <FadeInStagger className="clients-grid" staggerDelay={0.04}>
          {clients.map((client) => (
            <FadeInStaggerItem key={client.name}>
              <ClientLogoCard client={client} />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>

      <FadeIn duration={0.5}>
        <section className="inner-cta">
          <div>
            <p className="page-kicker">Legal Support</p>
            <h2>Ready to discuss your organization&apos;s legal requirements?</h2>
            <p>
              Whether you require litigation, corporate advisory, or regulatory
              guidance, the team can discuss the appropriate next step.
            </p>
          </div>
          <Link className="button button-solid button-animated" href="/contact">
            <span>Contact Clarkes</span>
            <ArrowRight size={18} className="button-icon-arrow" />
          </Link>
        </section>
      </FadeIn>
    </PageShell>
  );
}
