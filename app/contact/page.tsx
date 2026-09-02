import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { BrandLogo } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/motion";
import { contactEmail, primaryPhoneHref } from "@/lib/navigation";
import { contactDetails } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact | Clarkes Attorneys",
  description:
    "Contact Clarkes Attorneys for consultation requests, legal inquiries, and office details.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Discuss your matter with Clarkes Attorneys."
        copy="Share the legal support you need and the team will respond with the next practical step."
        primaryHref="#enquiry-form"
        primaryLabel="Send an enquiry"
        secondaryHref="/practice-areas"
        secondaryLabel="View services"
        stat="Direct"
        statLabel="Enquiries are handled with confidentiality and rapid response from senior practitioners."
        icon={<MessageSquareText />}
      />

      <section className="contact-section">
        <FadeIn direction="right" duration={0.45} className="contact-card-wrap">
          <div className="contact-card">
            <div className="contact-brand">
              <BrandLogo variant="icon" className="logo-mark" />
              <h2>Clarkes Attorneys</h2>
            </div>
            <p>
              Let&apos;s discuss your matter and map out the most efficient path
              forward.
            </p>
            <div className="contact-grid">
              <div>
                <Phone size={18} />
                {contactDetails.phoneNumbers.map((phone) => (
                  <a
                    key={phone}
                    href={phone.startsWith("+") ? `tel:${phone.replace(/\s+/g, "")}` : primaryPhoneHref}
                    className="contact-info-link"
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <div>
                <Mail size={18} />
                <a href={`mailto:${contactDetails.email}`} className="contact-info-link">
                  {contactDetails.email}
                </a>
                <span>{contactDetails.poBox}</span>
              </div>
              <div>
                <MapPin size={18} />
                <span>{contactDetails.location}</span>
              </div>
            </div>
            <div className="contact-actions">
              <a className="button button-solid" href={`mailto:${contactEmail}`}>
                <span>Email Direct</span>
              </a>
              <Link className="button button-ghost" href="/">
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="left" duration={0.45} id="enquiry-form" className="contact-form-wrap">
          <ContactForm source="Contact page enquiry form" />
        </FadeIn>
      </section>
    </PageShell>
  );
}
