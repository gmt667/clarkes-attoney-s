import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/site-header";
import { contactEmail, navLinks, primaryPhoneHref } from "@/lib/navigation";
import { contactDetails } from "@/lib/site-content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-about">
          <div className="footer-brand">
            <BrandLogo variant="icon" className="footer-logo" />
            <div>
              <span>Clarkes Attorneys</span>
              <small>Legal Practitioners</small>
            </div>
          </div>
          <p>
            Legal support delivered with care, discretion, and practical
            judgment for individuals, businesses, and institutions.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <div className="footer-contact-list">
            <a href={primaryPhoneHref}>
              <Phone />
              <span>{contactDetails.phoneNumbers[0]}</span>
            </a>
            <a href={`mailto:${contactEmail}`}>
              <Mail />
              <span>{contactEmail}</span>
            </a>
            <div>
              <MapPin />
              <span>{contactDetails.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {year} Clarkes Attorneys. All rights reserved.</span>
        <span>Integrity. Care. Professional judgment.</span>
      </div>
    </footer>
  );
}
