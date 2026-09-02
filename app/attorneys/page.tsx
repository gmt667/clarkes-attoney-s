import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Mail, Scale } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Attorneys | Clarkes Attorneys",
  description:
    "Meet the legal team at Clarkes Attorneys: experienced practitioners delivering advocacy, advisory, and practical commercial judgment.",
};

export default async function AttorneysPage() {
  const { attorneys } = await getCmsContent();

  return (
    <PageShell>
      <PageHero
        eyebrow="Attorneys"
        title="Leadership and legal experience built for demanding matters."
        copy="Meet the team behind Clarkes Attorneys. Each profile reflects the firm's blend of advocacy, advisory, and practical commercial judgment."
        primaryHref="/contact"
        primaryLabel="Contact the team"
        secondaryHref="/practice-areas"
        secondaryLabel="Explore services"
        stat={`${attorneys.length}`}
        statLabel="Legal professionals combining litigation strength, advisory support, and strategic consultancy."
        icon={<BriefcaseBusiness />}
      />

      <section className="attorneys-section">
        <FadeInStagger className="content-grid attorneys-grid" staggerDelay={0.08}>
          {attorneys.map((attorney, index) => (
            <FadeInStaggerItem key={attorney.name} className="attorney-grid-item">
              <article className="detail-card attorney-detail-card">
                {attorney.image ? (
                  <div className="attorney-photo-wrap">
                    <Image
                      src={attorney.image}
                      alt={`${attorney.name}, ${attorney.role}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className="attorney-photo"
                    />
                  </div>
                ) : null}
                <div className="attorney-card-header">
                  {!attorney.image ? (
                    <div className="attorney-avatar" aria-hidden="true">
                      <Scale />
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  ) : null}
                  <div>
                    <h2 className="attorney-name">{attorney.name}</h2>
                    <p className="detail-role">{attorney.role}</p>
                  </div>
                </div>

                <div className="attorney-card-body">
                  <p className="attorney-card-bio">{attorney.bio}</p>
                  {attorney.email ? (
                    <a
                      href={`mailto:${attorney.email}`}
                      className="attorney-email-link"
                      aria-label={`Email ${attorney.name} directly`}
                    >
                      <Mail size={15} />
                      <span>{attorney.email}</span>
                    </a>
                  ) : null}
                </div>
              </article>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>

      <FadeIn duration={0.5}>
        <section className="inner-cta">
          <div>
            <p className="page-kicker">Consultation</p>
            <h2>Work with a team prepared for serious legal matters.</h2>
            <p>
              Contact Clarkes Attorneys to discuss representation, advisory work,
              litigation support, or strategic legal consultancy.
            </p>
          </div>
          <Link className="button button-solid button-animated" href="/contact">
            <span>Contact the team</span>
            <ArrowRight size={18} className="button-icon-arrow" />
          </Link>
        </section>
      </FadeIn>
    </PageShell>
  );
}
