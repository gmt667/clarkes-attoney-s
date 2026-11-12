import { HomeHero } from "@/components/home-hero";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Building2,
  FileText,
  Gavel,
  Globe,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/motion";

const practiceHighlights = [
  {
    label: "Litigation & Advocacy",
    description: "Civil and commercial representation, trial advocacy, and dispute strategy.",
    icon: Gavel,
  },
  {
    label: "Corporate Services",
    description: "Governance, regulatory compliance, company matters, and commercial contracts.",
    icon: Building2,
  },
  {
    label: "Intellectual Property",
    description: "Practical guidance on trademarks, copyright, patents, and brand protection.",
    icon: FileText,
  },
  {
    label: "Property & Real Estate",
    description: "Conveyancing, leasing, title due diligence, and property-related disputes.",
    icon: Globe,
  },
  {
    label: "Public Law & Regulation",
    description: "Administrative, constitutional, statutory, and public-sector legal support.",
    icon: Scale,
  },
  {
    label: "Dispute Resolution",
    description: "Mediation, arbitration, negotiation, and carefully structured settlements.",
    icon: Users,
  },
];

export default function Home() {
  return (
    <>

      <HomeHero />

      <FadeIn duration={0.5}>
        <section className="home-editorial-about" aria-labelledby="home-about-title">
          <div className="home-editorial-section-label">
            <span>01</span>
            <p>About the firm</p>
          </div>
          <div className="home-editorial-about-copy">
            <h2 id="home-about-title">
              Careful preparation.<br />Clear legal judgment.
            </h2>
            <p>
              We approach each matter with discretion, direct communication, and
              close attention to the client&apos;s practical position. Our role is
              to make the legal path understandable and the next step considered.
            </p>
            <Link to="/about" className="reference-text-link">
              Learn about Clarkes Attorneys <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="home-editorial-facts" aria-label="Firm facts">
            <div><strong>2017</strong><span>Year established</span></div>
            <div><strong>6</strong><span>Core practice areas</span></div>
            <div><strong>3</strong><span>Attorneys and legal consultants</span></div>
          </div>
        </section>
      </FadeIn>

      <section className="home-editorial-practice" aria-labelledby="practice-title">
        <FadeIn className="home-editorial-heading">
          <div className="home-editorial-section-label">
            <span>02</span>
            <p>Practice areas</p>
          </div>
          <div>
            <h2 id="practice-title">Legal services built around real matters.</h2>
            <p>Focused representation and advice across six core areas of practice.</p>
          </div>
          <Link className="reference-button reference-button-secondary" to="/practice-areas">
            View all services <ArrowUpRight size={16} />
          </Link>
        </FadeIn>

        <FadeInStagger className="home-editorial-practice-grid" staggerDelay={0.05}>
          {practiceHighlights.map((area, index) => (
            <FadeInStaggerItem key={area.label}>
              <Link className="home-editorial-practice-card" to="/practice-areas">
                <div className="home-practice-card-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <area.icon size={20} />
                </div>
                <h3>{area.label}</h3>
                <p>{area.description}</p>
                <span className="home-practice-card-link">
                  Read more <ArrowUpRight size={15} />
                </span>
              </Link>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>

      <FadeIn duration={0.5}>
        <section className="home-editorial-standard">
          <div className="home-standard-mark"><ShieldCheck /></div>
          <div>
            <p className="home-standard-label">Our approach</p>
            <h2>Professional support without unnecessary distance.</h2>
          </div>
          <div className="home-standard-list">
            <span>Thorough preparation</span>
            <span>Direct communication</span>
            <span>Practical guidance</span>
          </div>
        </section>
      </FadeIn>

      <FadeIn duration={0.5}>
        <section className="home-editorial-cta">
          <div>
            <p>Start a conversation</p>
            <h2>Tell us about your legal matter.</h2>
            <span>The firm will review your enquiry and advise on the next practical step.</span>
          </div>
          <Link className="reference-button reference-button-light" to="/contact">
            Contact the firm <ArrowUpRight size={18} />
          </Link>
        </section>
      </FadeIn>
    </>
  );
}
