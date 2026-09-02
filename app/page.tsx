import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  FileText,
  Gavel,
  Globe,
  Mail,
  Phone,
  Scale,
  Users,
  ShieldCheck,
  CheckCircle2,
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
import { contactEmail, primaryPhoneHref } from "@/lib/navigation";

const practiceHighlights = [
  {
    label: "Litigation & Advocacy",
    description: "Trial advocacy, appellate proceedings, and commercial dispute resolution.",
    icon: Gavel,
    href: "/practice-areas",
  },
  {
    label: "Corporate Services",
    description: "Entity formation, regulatory compliance, governance, and commercial contracts.",
    icon: Building2,
    href: "/practice-areas",
  },
  {
    label: "Intellectual Property",
    description: "Trademarks, copyright protection, patent advisory, and brand rights defense.",
    icon: FileText,
    href: "/practice-areas",
  },
  {
    label: "Property & Real Estate",
    description: "Land conveyancing, commercial leasing, title due diligence, and property disputes.",
    icon: Globe,
    href: "/practice-areas",
  },
  {
    label: "Public Law & Regulation",
    description: "Administrative law, constitutional matters, and statutory advisory services.",
    icon: Scale,
    href: "/practice-areas",
  },
  {
    label: "Dispute Resolution",
    description: "Mediation, structured arbitration, and negotiated settlement strategies.",
    icon: Users,
    href: "/practice-areas",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <SiteHeader />

      {/* Hero Section */}
      <section className="hero">
        <FadeInStagger className="hero-copy">
          <FadeInStaggerItem>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <p className="page-kicker">Established 2017 | Lilongwe, Malawi</p>
            </div>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <RotatingTagline />
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <p>
              Clarkes Attorneys advises individuals, businesses, and institutions
              across litigation, corporate law, property, intellectual property,
              public law, and dispute resolution.
            </p>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <div className="hero-actions">
              <Link className="button button-solid button-animated" href="/contact">
                <span>Send an enquiry</span>
                <ArrowRight size={18} className="button-icon-arrow" />
              </Link>
              <a className="button button-ghost" href={`mailto:${contactEmail}`}>
                <Mail size={17} />
                <span>{contactEmail}</span>
              </a>
            </div>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <div className="hero-contact-row">
              <a href={primaryPhoneHref} className="hero-contact-item">
                <Phone size={15} />
                <span>+265 881 618 041</span>
              </a>
              <span className="hero-contact-sep">|</span>
              <a href="tel:+265999515212" className="hero-contact-item">
                <Phone size={15} />
                <span>+265 999 515 212</span>
              </a>
            </div>
          </FadeInStaggerItem>
        </FadeInStagger>

        <FadeIn direction="left" delay={0.15} className="hero-art">
          <div className="image-frame image-frame-hero">
            <Image
              src="/images/hero-law-firm.png"
              alt="Clarkes Attorneys law office"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="image-cover"
            />
            <div className="image-shade" />
            <div className="image-caption">
              <BrandLogo variant="full" tone="light" className="caption-logo" />
              <span className="caption-tag">Legal Practitioners</span>
            </div>
            <div className="hero-floating-pill">
              <ShieldCheck size={18} className="hero-pill-icon" />
              <div>
                <strong>Trusted Counsel</strong>
                <span>Civil & Commercial Advocacy</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* About Section with Clear Professional Stats */}
      <FadeIn duration={0.5}>
        <section className="home-about-strip">
          <div className="home-about-text">
            <p className="page-kicker">About the Firm</p>
            <h2>A client-centred firm built on integrity and sound legal judgment.</h2>
            <p>
              Founded in 2017, the firm provides advocacy, legal advice, and
              practical support across a wide range of commercial and individual
              matters. Each engagement is handled with discretion, preparation,
              and direct communication.
            </p>
            <Link className="button button-ghost button-animated" href="/about">
              <span>About Clarkes Attorneys</span>
              <ArrowRight size={17} className="button-icon-arrow" />
            </Link>
          </div>

          <FadeInStagger className="home-about-stats" staggerDelay={0.08}>
            <FadeInStaggerItem>
              <div className="stat-box">
                <strong><FoundingYearStat /></strong>
                <span>Year established</span>
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="stat-box">
                <strong><YearCountUp from={2017} /></strong>
                <span>Years in practice</span>
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="stat-box">
                <strong>6+</strong>
                <span>Core practice areas</span>
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="stat-box">
                <strong>Direct</strong>
                <span>Senior partner access</span>
              </div>
            </FadeInStaggerItem>
          </FadeInStagger>
        </section>
      </FadeIn>

      {/* Practice Areas Section with Staggered Interactive Cards */}
      <section className="home-practice-section">
        <FadeIn className="home-practice-header">
          <div>
            <p className="page-kicker">Practice Areas</p>
            <h2>Services we provide</h2>
          </div>
          <Link className="button button-ghost button-animated" href="/practice-areas">
            <span>View all practice areas</span>
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
                  <div className="home-practice-icon-wrap">
                    <area.icon size={22} className="home-practice-icon" />
                  </div>
                  <ArrowRight size={16} className="practice-card-arrow" />
                </div>
                <h3>{area.label}</h3>
                <p>{area.description}</p>
              </Link>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>

      {/* Trust & Standards Row */}
      <FadeIn duration={0.5}>
        <section className="home-trust-strip">
          <div className="trust-item">
            <CheckCircle2 size={20} className="trust-icon" />
            <div>
              <strong>Diligent Preparation</strong>
              <span>Every matter researched with thoroughness</span>
            </div>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={20} className="trust-icon" />
            <div>
              <strong>Direct Access</strong>
              <span>Consistent access to senior legal counsel</span>
            </div>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={20} className="trust-icon" />
            <div>
              <strong>Strategic Clarity</strong>
              <span>Practical guidance focused on the matter at hand</span>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Call to Action Section */}
      <FadeIn duration={0.5}>
        <section className="home-cta">
          <div className="home-cta-content">
            <p className="page-kicker">Start a Conversation</p>
            <h2>Discuss your matter with Clarkes Attorneys.</h2>
            <p>
              Share the details of your legal matter and the team will advise on
              the next practical step.
            </p>
          </div>
          <div className="home-cta-actions">
            <Link className="button button-solid button-animated" href="/contact">
              <span>Contact the firm</span>
              <ArrowRight size={18} className="button-icon-arrow" />
            </Link>
            <Link className="button button-ghost" href="/attorneys">
              <Briefcase size={17} />
              <span>Meet the attorneys</span>
            </Link>
          </div>
        </section>
      </FadeIn>

      <SiteFooter />
      <ScrollToTop />
    </main>
  );
}
