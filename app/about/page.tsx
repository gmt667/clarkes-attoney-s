import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gavel, Landmark, Rocket, ShieldCheck, Target } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/motion";
import { getCmsContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "About | Clarkes Attorneys",
  description:
    "Learn about Clarkes Attorneys, a client-focused law firm delivering litigation, advisory, corporate, property, and dispute resolution services.",
};

export default async function AboutPage() {
  const { values } = await getCmsContent();
  return (
    <PageShell>
      <PageHero
        eyebrow="About Clarkes"
        title="A client-focused firm with a careful, practical approach."
        copy="Established in 2017, Clarkes Attorneys provides legal services grounded in professionalism, integrity, and clear communication."
        primaryHref="/contact"
        primaryLabel="Talk to the firm"
        secondaryHref="/practice-areas"
        secondaryLabel="View practice areas"
        stat="2017"
        statLabel="Established with a focus on advocacy, advisory, and client-first legal service."
        icon={<Landmark />}
      />

      <FadeIn duration={0.5}>
        <section className="intro-card about-intro-card">
          <div className="intro-visual about-intro-visual">
            <div className="image-shade image-shade-soft" />
            <div className="intro-visual-inner">
              <Gavel className="intro-icon" />
              <span>Clarity. Strategy. Results.</span>
            </div>
          </div>
          <div className="intro-copy">
            <p className="about-lead">
              Clarkes Attorneys brings strong legal judgment, careful preparation,
              and practical communication to matters that need confidence and
              momentum.
            </p>
            <p>
              The firm brings together experienced legal practitioners dedicated
              to practical and well-prepared legal support for individuals,
              businesses, government institutions, and organizations.
            </p>
            <p>
              Clarkes Attorneys builds lasting relationships by offering sound
              legal advice, strategic representation, and effective dispute
              resolution across a broad range of matters.
            </p>
            <div className="about-proof-grid">
              <article>
                <strong>6+</strong>
                <span>Core practice areas</span>
              </article>
              <article>
                <strong>Multi-Sector</strong>
                <span>Client representations</span>
              </article>
              <article>
                <strong>Full Practice</strong>
                <span>Litigation & advisory</span>
              </article>
            </div>
          </div>
        </section>
      </FadeIn>

      <section className="mission-grid">
        <FadeIn className="section-title section-title-centered">
          <div className="eyebrow">Direction</div>
          <h2>Built around trust, precision, and useful outcomes.</h2>
        </FadeIn>
        <FadeInStagger className="three-up" staggerDelay={0.08}>
          <FadeInStaggerItem>
            <article className="purpose-card">
              <div className="icon-badge" aria-hidden="true">
                <ShieldCheck className="icon-badge-icon" />
                <span>Vision</span>
              </div>
              <h3>To provide dependable legal support with professional care.</h3>
              <p>
                We aim to serve clients with integrity, careful preparation, and
                clear legal guidance.
              </p>
            </article>
          </FadeInStaggerItem>
          <FadeInStaggerItem>
            <article className="purpose-card">
              <div className="icon-badge" aria-hidden="true">
                <Rocket className="icon-badge-icon" />
                <span>Mission</span>
              </div>
              <h3>Ethical, client-centred legal services delivered with precision.</h3>
              <p>
                We provide competent advocacy, sound legal advice, and innovative
                solutions that create lasting value for clients and communities.
              </p>
            </article>
          </FadeInStaggerItem>
          <FadeInStaggerItem>
            <article className="purpose-card">
              <div className="icon-badge" aria-hidden="true">
                <Target className="icon-badge-icon" />
                <span>Goal</span>
              </div>
              <h3>Timely, efficient, and practical outcomes for every client.</h3>
              <p>
                We focus on solutions that protect rights, support business
                continuity, and help clients navigate legal challenges with
                confidence.
              </p>
            </article>
          </FadeInStaggerItem>
        </FadeInStagger>
      </section>

      <section className="values-section">
        <FadeIn className="section-title section-title-centered">
          <div className="eyebrow">Core Values</div>
          <h2>The principles that shape how we advise and advocate.</h2>
        </FadeIn>
        <FadeInStagger className="values-grid" staggerDelay={0.06}>
          {values.map((value) => (
            <FadeInStaggerItem key={value.title}>
              <article className="value-card">
                <div className="value-label">{value.title}</div>
                <p>{value.text}</p>
              </article>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>

      <FadeIn duration={0.5}>
        <section className="inner-cta">
          <div>
            <p className="page-kicker">Next Step</p>
            <h2>Need legal support that is clear, discreet, and practical?</h2>
            <p>
              Open a conversation with Clarkes Attorneys and the team will help
              identify the most efficient route forward.
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
