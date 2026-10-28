import { contactDetails } from "./site-content";

export const contactEmail = contactDetails.email;
export const primaryPhoneHref = `tel:${contactDetails.phoneNumbers[0].replace(/\s+/g, "")}`;

// Social media links
export const facebookHref = "https://web.facebook.com/clarkesattorneys";
export const whatsappHref = `https://wa.me/${contactDetails.phoneNumbers[0].replace(/\D/g, "")}`;
export const instagramHref = "https://www.instagram.com/clarkes_attorneys";
export const twitterHref = "https://x.com/Clarkes_Mw";
export const linkedinHref = "https://www.linkedin.com/company/clarkes-attorneys";
export const tiktokHref = "https://www.tiktok.com/@clarkes_attorneys";
export const youtubeHref = "https://www.youtube.com/@clarkesattorneys";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Practice", href: "/practice-areas" },
  { label: "Our Team", href: "/our-team" },
  { label: "Experience", href: "/experience" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
