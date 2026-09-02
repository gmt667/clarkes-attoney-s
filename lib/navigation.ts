import { contactDetails } from "./site-content";

export const contactEmail = contactDetails.email;
export const primaryPhoneHref = `tel:${contactDetails.phoneNumbers[0].replace(/\s+/g, "")}`;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Practice", href: "/practice-areas" },
  { label: "Attorneys", href: "/attorneys" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
