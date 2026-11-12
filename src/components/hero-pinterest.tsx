

import { ResponsiveImage as Image } from "@/components/responsive-image";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { FacebookIcon, WhatsAppIcon, InstagramIcon, TwitterXIcon } from "@/components/social-icons";
import { contactEmail, facebookHref, whatsappHref, instagramHref, twitterHref } from "@/config/navigation";
import { HeroMessaging } from "./hero-messaging";




export function HeroPinterest() {
  return (
    <section className="tn-hero" aria-label="Hero Section">
      {/* Ambient background glow accents */}
      <div className="tn-hero-glow tn-glow-left" aria-hidden="true" />
      <div className="tn-hero-glow tn-glow-right" aria-hidden="true" />

      {/* Main Hero Canvas */}
      <div className="tn-hero-stage">
        {/* Left Copy Block */}
        <div className="tn-hero-copy">
          <HeroMessaging />

          <p
            className="tn-hero-subtext"
          >
            A dedicated legal team committed to protecting your commercial rights, resolving high-stakes disputes, and securing your future before the courts of Malawi.
          </p>

          <div
            className="tn-hero-actions"
          >
            <Link to="/contact" className="tn-btn-primary">
              <span>Contact Us</span>
              <ArrowRight size={17} className="tn-btn-arrow" />
            </Link>
            <Link to="/practice-areas" className="tn-btn-secondary">
              <span>Learn More</span>
            </Link>
          </div>

          {/* Deal Protection Widget (in-flow placement) */}
          <div
            className="tn-widget-deal"
          >
            <div className="tn-deal-thumb-wrap">
              <Image
                src="/images/attorneys/geoffrey-taumbe.jpg"
                alt="Geoffrey Mustafa Taumbe Managing Partner"
                fill
                sizes="64px"
                loading="eager"
                className="tn-deal-thumb-img"
              />
            </div>
            <div className="tn-deal-body">
              <div className="tn-deal-header">
                <span className="tn-deal-badge">Senior Counsel</span>
                <Link to="/practice-areas" className="tn-deal-arrow-link" aria-label="Explore commercial advisory">
                  <ArrowUpRight size={13} />
                </Link>
              </div>
              <h4>PROTECTING EVERY DEAL YOU MAKE</h4>
              <Link to="/contact" className="tn-deal-cta">
                <span>GET STARTED</span>
                <span className="tn-deal-cta-underline" />
              </Link>
            </div>
          </div>
        </div>

        {/* Center / Right Visual: Lady Justice Statue */}
        <div className="tn-hero-visual-center">
          <div className="tn-statue-wrap">
            <Image
              src="/images/lady-justice.png"
              alt="Lady Justice statue holding the scales of justice"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
              className="tn-statue-img"
            />
            <div className="tn-statue-fade" />
          </div>
        </div>

        {/* Center Floating Social Capsule Dock */}
        <div className="tn-social-dock" aria-label="Firm Social Links">
          <a
            href={facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Clarkes Attorneys Facebook"
            className="tn-dock-item"
          >
            <FacebookIcon />
          </a>
          <a
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Clarkes Attorneys Instagram"
            className="tn-dock-item"
          >
            <InstagramIcon />
          </a>
          <a
            href={twitterHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Clarkes Attorneys X"
            className="tn-dock-item"
          >
            <TwitterXIcon />
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Clarkes Attorneys WhatsApp"
            className="tn-dock-item"
          >
            <WhatsAppIcon />
          </a>
          <a
            href={`mailto:${contactEmail}`}
            aria-label="Email Clarkes Attorneys"
            className="tn-dock-item"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
