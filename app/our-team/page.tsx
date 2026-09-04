import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Mail, Scale, UserRoundCog } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Our Team | Clarkes Attorneys",
  description:
    "Meet the Clarkes Attorneys team, including attorneys and professional support staff.",
};

export default async function OurTeamPage() {
  const { attorneys, supportTeam } = await getCmsContent();

  const getInitials = (name: string) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <PageShell>
      <PageHero
        eyebrow="Our Team"
        title="Meet the people who support the firm and its clients."
        copy="Clarkes Attorneys brings together legal practitioners and professional support staff working with care, discretion, and practical judgment."
        primaryHref="/contact"
        primaryLabel="Contact the team"
        secondaryHref="/practice-areas"
        secondaryLabel="Explore services"
        stat={`${attorneys.length + supportTeam.length}`}
        statLabel="Team members across legal practice and professional support."
        icon={<BriefcaseBusiness />}
      />

      <section className="attorneys-section" aria-labelledby="attorneys-title">
        <FadeIn className="section-title section-title-centered">
          <p className="page-kicker">Attorneys</p>
          <h2 id="attorneys-title">Attorneys</h2>
          <p>
            Legal practitioners providing advocacy, advisory support, and
            practical legal judgment for client matters.
          </p>
        </FadeIn>

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
                    <h3 className="attorney-name">{attorney.name}</h3>
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

      <section className="support-team-section" aria-labelledby="support-team-title">
        <FadeIn className="section-title section-title-centered">
          <p className="page-kicker">Professional Support Team</p>
          <h2 id="support-team-title">Professional Support Team</h2>
          <p>
            Administrative and operational staff who support the firm&apos;s
            day-to-day service delivery.
          </p>
        </FadeIn>

        <FadeInStagger className="support-team-grid" staggerDelay={0.08}>
          {supportTeam.map((member) => (
            <FadeInStaggerItem key={member.name} className="support-team-grid-item">
              <article className="support-team-card">
                {member.image ? (
                  <div className="support-team-photo-wrap">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.position}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className="support-team-photo"
                    />
                  </div>
                ) : (
                  <div className="support-team-initials" aria-hidden="true">
                    {getInitials(member.name)}
                  </div>
                )}
                <div className="support-team-icon" aria-hidden="true">
                  <UserRoundCog />
                </div>
                <h3>{member.name}</h3>
                <p className="support-team-position">{member.position}</p>
                <p className="support-team-description">{member.description}</p>
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="attorney-email-link support-team-email-link"
                    aria-label={`Email ${member.name} at Clarkes Attorneys`}
                  >
                    <Mail size={15} />
                    <span>{member.email}</span>
                  </a>
                ) : null}
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
