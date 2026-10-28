import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  Gavel,
  Globe,
  Heart,
  Images,
  Mail,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { BrandLogo, SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/components/scroll-to-top";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/motion";
import { RotatingTagline, FoundingYearStat, YearCountUp } from "@/components/hero-animations";
import { HeroPinterest } from "@/components/hero-pinterest";
import { contactEmail, primaryPhoneHref } from "@/lib/navigation";

const practiceHighlights = [
  {
    num: "01",
    label: "Litigation & Advocacy",
    description: "Trial advocacy, appellate proceedings, and commercial dispute resolution before all levels of court.",
    icon: Gavel,
    href: "/practice-areas",
  },
  {
    num: "02",
    label: "Corporate & Commercial",
    description: "Entity formation, regulatory compliance, corporate governance, cross-border contracts, and advisory.",
    icon: Building2,
    href: "/practice-areas",
  },
  {
    num: "03",
    label: "Intellectual Property",
    description: "Trademarks registration, copyright protection, patent advisory, and brand rights enforcement.",
    icon: FileText,
    href: "/practice-areas",
  },
  {
    num: "04",
    label: "Property & Real Estate",
    description: "Land conveyancing, commercial leasing, title due diligence, transfers, and real estate dispute defense.",
    icon: Globe,
    href: "/practice-areas",
  },
  {
    num: "05",
    label: "Public Law & Regulation",
    description: "Administrative law, constitutional challenges, public prosecution support, and statutory compliance.",
    icon: Scale,
    href: "/practice-areas",
  },
  {
    num: "06",
    label: "Dispute Resolution",
    description: "Structured mediation, commercial arbitration, and pragmatic negotiated settlement strategies.",
    icon: Users,
    href: "/practice-areas",
  },
];

const featuredCommemorations = [
  {
    title: "15 October · Mother's Day Tribute",
    subtitle: "Honouring the love, courage, and dedication of mothers across Malawi.",
    image: "/images/gallery/mothers-day-october-15.jpg",
    tag: "Firm Commemoration",
    aspect: "portrait",
  },
  {
    title: "Celebrating Strength & Family",
    subtitle: "Clarkes Attorneys tribute recognizing maternal sacrifice and leadership.",
    image: "/images/gallery/mothers-day-tribute.jpg",
    tag: "Community & Culture",
    aspect: "portrait",
  },
  {
    title: "Clarkes Attorneys Identity",
    subtitle: "A legacy of principled advocacy and trusted counsel established in Lilongwe.",
    image: "/images/gallery/clarkes-attorneys-logo-cover.jpg",
    tag: "Firm Heritage",
    aspect: "landscape",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <SiteHeader />

      {/* Hero Section styled after Pinterest design reference */}
      <HeroPinterest />

      {/* About Section with Clear Professional Stats */}
      <FadeIn duration={0.5}>
        <section className="home-about-strip">
          <div className="home-about-text">
            <div className="section-eyebrow">
              <Scale size={15} />
              <span>About Clarkes Attorneys</span>
            </div>
            <h2>A client-centred legal practice built on integrity, discretion, and sound judgment.</h2>
            <p>
              Founded in 2017 in Lilongwe, Clarkes Attorneys delivers sophisticated advocacy, statutory
              counsel, and practical problem-solving across civil, commercial, and administrative jurisdictions.
              Our practice is anchored in thorough evidentiary preparation, uncompromised professional ethics,
              and direct senior partner engagement.
            </p>
            <div className="home-about-actions">
              <Link className="button button-ghost button-animated" href="/about">
                <span>Firm Overview &amp; Principles</span>
                <ArrowRight size={17} className="button-icon-arrow" />
              </Link>
              <Link className="button button-outline" href="/our-team">
                <Briefcase size={16} />
                <span>Meet Legal Team</span>
              </Link>
            </div>
          </div>

          <FadeInStagger className="home-about-stats" staggerDelay={0.08}>
            <FadeInStaggerItem>
              <div className="stat-box">
                <div className="stat-box-gold-accent" />
                <strong><FoundingYearStat /></strong>
                <span>Year established</span>
                <small>Lilongwe, Malawi</small>
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="stat-box">
                <div className="stat-box-gold-accent" />
                <strong><YearCountUp from={2017} />+</strong>
                <span>Years in active practice</span>
                <small>Continuous client service</small>
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="stat-box">
                <div className="stat-box-gold-accent" />
                <strong>6+</strong>
                <span>Core legal disciplines</span>
                <small>Trial to transaction</small>
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="stat-box">
                <div className="stat-box-gold-accent" />
                <strong>Direct</strong>
                <span>Partner accessibility</span>
                <small>No communication layers</small>
              </div>
            </FadeInStaggerItem>
          </FadeInStagger>
        </section>
      </FadeIn>

      {/* Practice Areas Section with Staggered Interactive Cards */}
      <section className="home-practice-section">
        <FadeIn className="home-practice-header">
          <div>
            <div className="section-eyebrow">
              <Scale size={15} />
              <span>Practice Disciplines</span>
            </div>
            <h2>Comprehensive legal solutions for contentious &amp; commercial matters</h2>
          </div>
          <Link className="button button-ghost button-animated" href="/practice-areas">
            <span>Explore all practice areas</span>
            <ArrowRight size={17} className="button-icon-arrow" />
          </Link>
        </FadeIn>

        <FadeInStagger className="home-practice-grid" staggerDelay={0.06}>
          {practiceHighlights.map((area) => (
            <FadeInStaggerItem key={area.label}>
              <Link
                href={area.href}
                className="home-practice-card"
                aria-label={`Learn about ${area.label}`}
              >
                <div className="practice-card-top">
                  <span className="practice-card-num">{area.num}</span>
                  <div className="home-practice-icon-wrap">
                    <area.icon size={22} className="home-practice-icon" />
                  </div>
                  <ArrowRight size={16} className="practice-card-arrow" />
                </div>
                <h3>{area.label}</h3>
                <p>{area.description}</p>
                <div className="practice-card-bottom-line" />
              </Link>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>

      {/* FEATURED: Firm Commemorations, Community & Visual Archive */}
      <FadeIn duration={0.5}>
        <section className="home-commemoration-section">
          <div className="home-commemoration-header">
            <div>
              <div className="section-eyebrow">
                <Heart size={15} />
                <span>Firm Life &amp; Commemorations</span>
              </div>
              <h2>Honouring community, family &amp; legal heritage</h2>
              <p>
                Beyond court advocacy, Clarkes Attorneys is deeply committed to our community and
                values of family, gratitude, and civic leadership.
              </p>
            </div>
            <Link className="button button-ghost button-animated" href="/gallery">
              <Images size={16} />
              <span>View full gallery archive</span>
              <ArrowRight size={16} className="button-icon-arrow" />
            </Link>
          </div>

          <div className="home-commemoration-grid">
            {featuredCommemorations.map((item, idx) => (
              <article key={item.title} className={`commemoration-card commemoration-card-${item.aspect}`}>
                <div className="commemoration-image-wrap">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="commemoration-img"
                  />
                  <div className="commemoration-overlay" />
                  <span className="commemoration-tag">{item.tag}</span>
                </div>
                <div className="commemoration-details">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                  <Link href="/gallery" className="commemoration-view-link">
                    <span>View in archive</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Trust & Standards Row */}
      <FadeIn duration={0.5}>
        <section className="home-trust-strip">
          <div className="trust-item">
            <div className="trust-icon-box">
              <CheckCircle2 size={20} className="trust-icon" />
            </div>
            <div>
              <strong>Exhaustive Preparation</strong>
              <span>Every brief researched with deep statutory scrutiny</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box">
              <ShieldCheck size={20} className="trust-icon" />
            </div>
            <div>
              <strong>Strict Confidentiality</strong>
              <span>Privilege and discretion protected under professional ethics</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box">
              <CheckCircle2 size={20} className="trust-icon" />
            </div>
            <div>
              <strong>Direct Partner Engagement</strong>
              <span>Unfiltered access to experienced legal counsel throughout</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box">
              <Scale size={20} className="trust-icon" />
            </div>
            <div>
              <strong>Commercial Foresight</strong>
              <span>Practical strategies that protect assets and business continuity</span>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Call to Action Section */}
      <FadeIn duration={0.5}>
        <section className="home-cta">
          <div className="home-cta-content">
            <div className="section-eyebrow">
              <Calendar size={15} />
              <span>Chambers Engagement</span>
            </div>
            <h2>Discuss your legal matter with Clarkes Attorneys.</h2>
            <p>
              Whether requiring urgent litigation defense, commercial contract review, or ongoing
              corporate counsel, our legal practitioners provide clear, principled guidance.
            </p>
          </div>
          <div className="home-cta-actions">
            <Link className="button button-solid button-animated" href="/contact">
              <span>Schedule Chambers Appointment</span>
              <ArrowRight size={18} className="button-icon-arrow" />
            </Link>
            <Link className="button button-ghost" href="/our-team">
              <Briefcase size={17} />
              <span>Review Attorney Credentials</span>
            </Link>
          </div>
        </section>
      </FadeIn>

      <SiteFooter />
      <ScrollToTop />
    </main>
  );
}
