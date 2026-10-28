import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Compass,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { BrandLogo } from "@/components/site-header";
import {
  FacebookIcon,
  WhatsAppIcon,
  InstagramIcon,
  TwitterXIcon,
  LinkedInIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/social-icons";
import {
  contactEmail,
  facebookHref,
  whatsappHref,
  instagramHref,
  twitterHref,
  linkedinHref,
  tiktokHref,
  youtubeHref,
  navLinks,
  primaryPhoneHref,
} from "@/lib/navigation";
import { contactDetails, practiceAreas } from "@/lib/site-content";

const socialLinks = [
  {
    href: facebookHref,
    label: "Clarkes Attorneys on Facebook",
    icon: FacebookIcon,
  },
  {
    href: instagramHref,
    label: "Clarkes Attorneys on Instagram",
    icon: InstagramIcon,
  },
  {
    href: twitterHref,
    label: "Clarkes Attorneys on X (Twitter)",
    icon: TwitterXIcon,
  },
  {
    href: linkedinHref,
    label: "Clarkes Attorneys on LinkedIn",
    icon: LinkedInIcon,
  },
  {
    href: tiktokHref,
    label: "Clarkes Attorneys on TikTok",
    icon: TikTokIcon,
  },
  {
    href: youtubeHref,
    label: "Clarkes Attorneys on YouTube",
    icon: YouTubeIcon,
  },
  {
    href: whatsappHref,
    label: "Clarkes Attorneys WhatsApp",
    icon: WhatsAppIcon,
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-premium" aria-label="Clarkes Attorneys Footer">
      {/* Decorative top gold gradient rule */}
      <div className="footer-top-rule" aria-hidden="true" />

      {/* Pre-footer Consultation Banner */}
      <div className="footer-chambers-banner">
        <div className="footer-chambers-copy">
          <div className="footer-badge-pill">
            <Scale size={14} className="footer-pill-icon" />
            <span>Chambers &amp; Legal Consultations</span>
          </div>
          <h2>Need sound legal counsel or experienced court representation?</h2>
          <p>
            Our Lilongwe chambers advise corporate institutions, businesses, and private clients
            with absolute confidentiality, strategic foresight, and meticulous preparation.
          </p>
        </div>

        <div className="footer-chambers-actions">
          <Link href="/contact" className="footer-action-btn footer-btn-primary">
            <span>Schedule a Consultation</span>
            <ArrowUpRight size={16} />
          </Link>
          <a href={primaryPhoneHref} className="footer-action-btn footer-btn-secondary">
            <Phone size={15} />
            <span>Call Chambers Directly</span>
          </a>
        </div>
      </div>

      {/* Divider line */}
      <div className="footer-divider-line" aria-hidden="true" />

      {/* Main 4-Column Architectural Grid */}
      <div className="footer-grid-wrap">
        {/* Column 1: Firm Crest & Authority */}
        <div className="footer-col footer-col-brand">
          <Link href="/" className="footer-brand-lockup" aria-label="Clarkes Attorneys">
            <BrandLogo variant="icon" className="footer-crest" />
            <div className="footer-brand-headings">
              <span className="footer-brand-title">CLARKES ATTORNEYS</span>
              <span className="footer-brand-sub">LEGAL PRACTITIONERS · LILONGWE, MALAWI</span>
            </div>
          </Link>

          <p className="footer-brand-desc">
            A client-centred legal practice founded in 2017. We deliver clear, principled, and
            effective legal representation across commercial transactions, contentious disputes,
            and regulatory proceedings.
          </p>

          <div className="footer-regulatory-box">
            <ShieldCheck size={18} className="footer-reg-icon" />
            <div className="footer-reg-text">
              <strong>Regulated Legal Practitioners</strong>
              <span>Duly admitted before the High Court of Malawi &amp; Subordinate Courts</span>
            </div>
          </div>

          {/* Social Cluster — all 7 platforms */}
          <div className="footer-social-cluster" aria-label="Connect with Clarkes Attorneys">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="footer-social-btn"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Core Practice Areas */}
        <div className="footer-col footer-col-practice">
          <div className="footer-col-header">
            <Scale size={16} className="footer-header-icon" />
            <h3>Practice Areas</h3>
          </div>
          <ul className="footer-link-list">
            {practiceAreas.map((area) => (
              <li key={area.title}>
                <Link href="/practice-areas" className="footer-nav-link">
                  <span className="footer-link-bullet" aria-hidden="true" />
                  <span>{area.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Firm Navigation */}
        <div className="footer-col footer-col-nav">
          <div className="footer-col-header">
            <Compass size={16} className="footer-header-icon" />
            <h3>The Firm</h3>
          </div>
          <ul className="footer-link-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-nav-link">
                  <span className="footer-link-bullet" aria-hidden="true" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Chambers & Direct Contact */}
        <div className="footer-col footer-col-chambers">
          <div className="footer-col-header">
            <MapPin size={16} className="footer-header-icon" />
            <h3>Lilongwe Chambers</h3>
          </div>

          <div className="footer-contact-stack">
            <div className="footer-contact-entry">
              <MapPin size={16} className="footer-entry-icon" />
              <div>
                <strong>Chambers Location</strong>
                <span>{contactDetails.location}</span>
                <span className="footer-entry-sub">{contactDetails.poBox}</span>
              </div>
            </div>

            <div className="footer-contact-entry">
              <Phone size={16} className="footer-entry-icon" />
              <div>
                <strong>Direct Telephone</strong>
                <div className="footer-phones">
                  <a href={primaryPhoneHref}>{contactDetails.phoneNumbers[0]}</a>
                  <span className="footer-sep">/</span>
                  <a href="tel:+265999515212">{contactDetails.phoneNumbers[1]}</a>
                </div>
              </div>
            </div>

            <div className="footer-contact-entry">
              <Mail size={16} className="footer-entry-icon" />
              <div>
                <strong>Official Correspondence</strong>
                <a href={`mailto:${contactEmail}`} className="footer-email-link">
                  {contactEmail}
                </a>
              </div>
            </div>

            <div className="footer-contact-entry">
              <Clock size={16} className="footer-entry-icon" />
              <div>
                <strong>Chambers Hours</strong>
                <span>Monday – Friday: 08:00 – 17:00 (CAT)</span>
                <span className="footer-entry-sub">Appointments by arrangement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Legal, Compliance, & Copyright */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-left">
          <span>&copy; {year} Clarkes Attorneys. All rights reserved.</span>
          <span className="footer-bottom-pipe">|</span>
          <span>Malawi Law Society Member</span>
        </div>

        <div className="footer-bottom-motto">
          <span className="footer-motto-rule" />
          <span className="footer-motto-text">Integrity &middot; Diligence &middot; Professional Judgment</span>
          <span className="footer-motto-rule" />
        </div>

        <div className="footer-bottom-right">
          <Link href="/contact" className="footer-bottom-sublink">
            Confidential Enquiries
          </Link>
          <span className="footer-bottom-dot">&bull;</span>
          <Link href="/about" className="footer-bottom-sublink">
            Chambers Profile
          </Link>
          <span className="footer-bottom-dot">&bull;</span>
          <Link href="/gallery" className="footer-bottom-sublink">
            Archive
          </Link>
        </div>
      </div>
    </footer>
  );
}
