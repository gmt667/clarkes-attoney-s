import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Practice Areas | Clarkes Attorneys",
  description:
    "Explore Clarkes Attorneys' full range of legal services: litigation, IP, public law, property, corporate services, and alternative dispute resolution.",
};

export default async function PracticeAreasPage() {
  const { practiceAreas } = await getCmsContent();

  return (
    <PageShell>
      <PageHero
        eyebrow="Practice Areas"
        title="Comprehensive legal support across core business and dispute needs."
        copy="The firm's practice structure is broad enough to support most commercial and individual client needs while keeping the advice practical and focused."
        primaryHref="/contact"
        primaryLabel="Request consultation"
        secondaryHref="/experience"
        secondaryLabel="View experience"
        stat="6+"
        statLabel="Practice pillars covering disputes, corporate services, public law, property, IP, and ADR."
        icon={<Scale />}
      />

      <section>
        <FadeInStagger className="content-grid practice-page-grid" staggerDelay={0.06}>
          {practiceAreas.map((area) => (
            <FadeInStaggerItem key={area.title}>
              <article className="detail-card practice-detail-card">
                <h2>{area.title}</h2>
                <p>{area.description}</p>
                <ul className="bullet-list">
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>

      <FadeIn duration={0.5}>
        <section className="inner-cta">
          <div>
            <p className="page-kicker">Matter Review</p>
            <h2>Not sure which practice area fits your matter?</h2>
            <p>
              Share the details with Clarkes Attorneys and the team will guide you
              toward the right legal support.
            </p>
          </div>
          <Link className="button button-solid button-animated" href="/contact">
            <span>Request guidance</span>
            <ArrowRight size={18} className="button-icon-arrow" />
          </Link>
        </section>
      </FadeIn>
    </PageShell>
  );
}
