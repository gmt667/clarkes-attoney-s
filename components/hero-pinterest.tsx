"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Facebook, Mail, Phone, Scale } from "lucide-react";
import { FacebookIcon, WhatsAppIcon } from "@/components/social-icons";
import { contactEmail, facebookHref, primaryPhoneHref, whatsappHref } from "@/lib/navigation";
import { motion } from "framer-motion";

const chartBars = [
  { month: "Jan", height: "45%" },
  { month: "Feb", height: "65%" },
  { month: "Mar", height: "85%" },
  { month: "Apr", height: "55%" },
  { month: "May", height: "75%" },
  { month: "Jun", height: "92%" },
  { month: "Jul", height: "68%" },
];

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
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="tn-eyebrow-pill"
          >
            <span className="tn-eyebrow-dot" />
            <span>ESTABLISHED 2017 &middot; LILONGWE, MALAWI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="tn-hero-headline"
          >
            SOLVING LEGAL
            <br />
            MATTERS WITH
            <br />
            <span className="tn-headline-focus">CONFIDENCE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="tn-hero-subtext"
          >
            A dedicated legal team committed to protecting your commercial rights, resolving high-stakes disputes, and securing your future before the courts of Malawi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="tn-hero-actions"
          >
            <Link href="/contact" className="tn-btn-primary">
              <span>Contact Us</span>
              <ArrowRight size={17} className="tn-btn-arrow" />
            </Link>
            <Link href="/practice-areas" className="tn-btn-secondary">
              <span>Learn More</span>
            </Link>
          </motion.div>

          {/* Deal Protection Widget (in-flow placement) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="tn-widget-deal"
          >
            <div className="tn-deal-thumb-wrap">
              <Image
                src="/images/attorneys/geoffrey-taumbe.jpg"
                alt="Geoffrey Mustafa Taumbe Managing Partner"
                fill
                className="tn-deal-thumb-img"
              />
            </div>
            <div className="tn-deal-body">
              <div className="tn-deal-header">
                <span className="tn-deal-badge">Senior Counsel</span>
                <Link href="/practice-areas" className="tn-deal-arrow-link" aria-label="Explore commercial advisory">
                  <ArrowUpRight size={13} />
                </Link>
              </div>
              <h4>PROTECTING EVERY DEAL YOU MAKE</h4>
              <Link href="/contact" className="tn-deal-cta">
                <span>GET STARTED</span>
                <span className="tn-deal-cta-underline" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Center / Right Visual: Lady Justice Statue */}
        <div className="tn-hero-visual-center">
          <div className="tn-statue-wrap">
            <Image
              src="/images/lady-justice.jpg"
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
