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
    href: facebookHref,
    label: "Clarkes Attorneys on Facebook",
    icon: FacebookIcon,
  },
  {
    href: whatsappHref,
    label: "Clarkes Attorneys WhatsApp",
    icon: WhatsAppIcon,
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
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-scenic" aria-label="Clarkes Attorneys Footer">
      {/* ── Top Atmospheric Silhouette Scenic Header (Pinterest Inspired) ── */}
      <div className="footer-scenic-backdrop" aria-hidden="true">
        {/* SVG Atmospheric Landscape Silhouette */}
        <svg
          className="footer-scenic-svg"
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Distant Rolling Hills Layer 1 */}
          <path
            d="M0 120 C 180 80, 340 130, 520 95 C 700 60, 880 110, 1080 75 C 1260 45, 1380 90, 1440 80 L 1440 220 L 0 220 Z"
            fill="url(#hill-grad-1)"
            opacity="0.45"
          />
          {/* Midground Hills Layer 2 */}
          <path
            d="M0 140 C 140 110, 300 155, 480 130 C 660 105, 840 145, 1020 120 C 1200 95, 1360 135, 1440 125 L 1440 220 L 0 220 Z"
            fill="url(#hill-grad-2)"
            opacity="0.65"
          />
          {/* Foreground Silhouette with Natural Tree & Ridgeline Layer 3 */}
          <path
            d="M0 168 C 120 150, 260 175, 420 158 C 580 140, 740 170, 920 152 C 1100 135, 1280 165, 1440 150 L 1440 220 L 0 220 Z"
            fill="url(#hill-grad-3)"
            opacity="0.95"
          />
          {/* Acacia / Dignified Trees Silhouette on the Ridge */}
          <g opacity="0.8" fill="#040b15">
            {/* Tree 1 (Right Knoll) */}
            <path d="M1280 154 C 1280 142, 1278 135, 1279 122 C 1273 120, 1260 115, 1258 108 C 1264 107, 1274 110, 1279 114 C 1280 105, 1276 96, 1280 88 C 1285 95, 1284 105, 1283 115 C 1290 111, 1302 108, 1306 112 C 1298 116, 1288 120, 1284 124 C 1285 136, 1286 145, 1287 154 Z" />
            <ellipse cx="1282" cy="85" rx="36" ry="14" />
            <ellipse cx="1260" cy="106" rx="26" ry="10" />
            <ellipse cx="1302" cy="110" rx="24" ry="9" />
            {/* Tree 2 (Left Distance) */}
            <path d="M160 162 C 160 152, 159 146, 160 138 C 156 136, 148 132, 146 128 C 151 127, 157 129, 160 132 C 161 126, 158 120, 161 114 C 164 119, 163 126, 162 133 C 166 130, 174 128, 177 130 C 172 133, 165 136, 163 139 C 163 148, 164 155, 165 162 Z" />
            <ellipse cx="161" cy="112" rx="24" ry="10" />
            <ellipse cx="147" cy="127" rx="18" ry="7" />
            <ellipse cx="174" cy="130" rx="16" ry="6" />
          </g>
          {/* Gradients */}
          <defs>
            <linearGradient id="hill-grad-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14324f" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#081829" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="hill-grad-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c2339" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#051220" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="hill-grad-3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#07192b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#040b15" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient Top Glow Line */}
        <div className="footer-scenic-rim" />
      </div>

      {/* ── Pre-footer Chambers Consultation Action Banner ── */}
      <div className="footer-scenic-banner">
        <div className="footer-scenic-banner-copy">
          <div className="footer-badge-pill">
            <Scale size={14} className="footer-pill-icon" />
            <span>Senior Legal Counsel &amp; Court Advocacy</span>
          </div>
          <h2>Need sound legal counsel or experienced court representation?</h2>
          <p>
            Our Lilongwe chambers advise corporate institutions, businesses, and private clients
            with absolute confidentiality, strategic foresight, and meticulous preparation.
          </p>
        </div>

        <div className="footer-scenic-banner-actions">
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

      {/* ── Main Multi-Column Grid with Vertical Hairline Dividers (Pinterest Design) ── */}
      <div className="footer-scenic-columns">
        {/* Column 1: Brand Authority & Seal */}
        <div className="footer-scenic-col footer-scenic-col-brand">
          <Link href="/" className="footer-brand-lockup" aria-label="Clarkes Attorneys">
            <BrandLogo variant="icon" className="footer-crest" />
            <div className="footer-brand-headings">
              <span className="footer-brand-title">CLARKES ATTORNEYS</span>
              <span className="footer-brand-sub">LEGAL PRACTITIONERS · LILONGWE, MALAWI</span>
            </div>
          </Link>

          <p className="footer-brand-desc">
            A client-centred legal practice founded in 2017. Delivering principled advocacy,
            transactional counsel, and practical problem-solving across civil, commercial, and
            administrative jurisdictions.
          </p>

          <div className="footer-regulatory-box">
            <ShieldCheck size={17} className="footer-reg-icon" />
            <div className="footer-reg-text">
              <strong>Regulated Legal Practitioners</strong>
              <span>Admitted before High Court of Malawi &amp; Subordinate Courts</span>
            </div>
          </div>

          {/* Social Media Cluster */}
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

        {/* Vertical Divider */}
        <div className="footer-col-divider" aria-hidden="true" />

        {/* Column 2: Practice Disciplines (2 sub-columns of links like Pinterest ref) */}
        <div className="footer-scenic-col footer-scenic-col-practice">
          <div className="footer-scenic-heading">
            <span>PRACTICE DISCIPLINES</span>
          </div>
          <ul className="footer-scenic-links">
            {practiceAreas.map((area) => (
              <li key={area.title}>
                <Link href="/practice-areas" className="footer-scenic-link">
                  <span className="footer-scenic-bullet" />
                  <span>{area.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Vertical Divider */}
        <div className="footer-col-divider" aria-hidden="true" />

        {/* Column 3: The Firm Navigation */}
        <div className="footer-scenic-col footer-scenic-col-firm">
          <div className="footer-scenic-heading">
            <span>THE FIRM</span>
          </div>
          <ul className="footer-scenic-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-scenic-link">
                  <span className="footer-scenic-bullet" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Vertical Divider */}
        <div className="footer-col-divider" aria-hidden="true" />

        {/* Column 4: Lilongwe Chambers Location & Hours */}
        <div className="footer-scenic-col footer-scenic-col-chambers">
          <div className="footer-scenic-heading">
            <span>LILONGWE CHAMBERS</span>
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
                <span className="footer-entry-sub">Consultations by appointment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-Footer Bottom Bar ── */}
      <div className="footer-scenic-bottom">
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
