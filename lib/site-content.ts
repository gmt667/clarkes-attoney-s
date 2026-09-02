export type PracticeArea = {
  title: string;
  description: string;
  items: string[];
};

export type Attorney = {
  name: string;
  role: string;
  bio: string;
  email?: string;
  image?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  category: string;
};

export type GalleryImage = {
  title: string;
  category: string;
  image: string;
  orientation: "portrait" | "landscape" | "square";
};

export type ExperienceClient =
  | {
      name: string;
      kind: "sprite";
      sector: (typeof clientSectors)[number];
      description: string;
      crop: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
      label: string;
      logoUrl?: string;
    }
  | {
      name: string;
      kind: "badge";
      sector: (typeof clientSectors)[number];
      description: string;
      label: string;
      short: string;
      accent: "navy" | "gold" | "blue";
      logoUrl?: string;
    };

export const contactDetails = {
  phoneNumbers: ["+265 881 618 041", "+265 999 515 212"],
  email: "info@clarkesattorneys.mw",
  poBox: "Post Office Box X273, Lilongwe",
  location: "Along the Kamuzu Processing Road, SS Rent a Car Building, Second Floor, Office 15",
};

export const values = [
  {
    title: "Integrity",
    text: "We uphold the highest standards of honesty, ethics, and transparency in every matter we undertake.",
  },
  {
    title: "Excellence",
    text: "We aim to maintain careful standards of work, preparation, and communication.",
  },
  {
    title: "Professionalism",
    text: "We conduct ourselves with competence, respect, diligence, and courtesy so every client receives quality representation.",
  },
  {
    title: "Accountability",
    text: "We honour commitments, communicate clearly, and remain reliable in every engagement.",
  },
  {
    title: "Confidentiality",
    text: "We safeguard client information with the highest level of discretion and care.",
  },
  {
    title: "Innovation",
    text: "We embrace modern legal practice and strategic thinking to deliver efficient, forward-looking solutions.",
  },
];

export const practiceAreas: PracticeArea[] = [
  {
    title: "Litigation",
    description: "High-stakes advocacy for civil, commercial, and criminal disputes.",
    items: ["Civil Litigation", "Commercial Litigation", "Criminal Litigation"],
  },
  {
    title: "Intellectual Property",
    description: "Protection for brands, inventions, and proprietary know-how.",
    items: ["Trademark Registration", "Patent Registration", "IP Protection"],
  },
  {
    title: "Public Law",
    description: "Advice and representation in public-sector and regulatory matters.",
    items: ["Public Prosecution", "Administrative Law"],
  },
  {
    title: "Property & Real Estate",
    description: "Practical support for conveyancing and property transactions.",
    items: ["Conveyancing", "Property Transactions", "Land Advisory"],
  },
  {
    title: "Corporate Services",
    description: "Commercial support for companies and growing businesses.",
    items: ["Legal Advisory Services", "Company Secretarial Services", "Corporate Governance"],
  },
  {
    title: "Alternative Dispute Resolution",
    description: "Efficient arbitration and mediation solutions.",
    items: ["Arbitration", "Mediation", "Negotiated Settlements"],
  },
];

export const attorneys: Attorney[] = [
  {
    name: "Geoffrey Mustafa Taumbe",
    role: "Managing Partner",
    bio: "Geoffrey Mustafa Taumbe is the founding Managing Partner of Clarkes Attorneys. He leads the firm's litigation and corporate practice with a broad range of experience spanning civil litigation, commercial law, corporate advisory, property law, dispute resolution, and legal consultancy. Geoffrey has appeared before the High Court and subordinate courts in a variety of complex commercial and civil matters. He advises corporate clients, institutions, and individuals on governance, contractual arrangements, regulatory compliance, and strategic legal matters. His approach is grounded in thorough preparation, clear communication, and a commitment to achieving practical outcomes for clients across all sectors the firm serves.",
    email: "geoffrey@clarkesattorneys.mw",
    image: "/images/attorneys/geoffrey-taumbe.jpg",
  },
  {
    name: "Kennedy Chiphaso",
    role: "Associate",
    bio: "Kennedy Chiphaso is an Associate at Clarkes Attorneys with hands-on experience in litigation, legal research, corporate advisory, and client representation. He has developed a strong foundation in drafting legal documents including contracts, opinions, pleadings, and correspondence, and he provides structured support in dispute resolution proceedings and pre-litigation negotiations. Kennedy works closely with the Managing Partner on commercial matters, assisting clients with documentation, regulatory filings, and advisory support. He is known for his methodical research approach and his ability to translate complex legal questions into clear, actionable guidance for clients in both the private and public sectors.",
    email: "kennedy@clarkesattorneys.mw",
    image: "/images/attorneys/kennedy-chiphaso.jpg",
  },
  {
    name: "Prince Stevens Thengo",
    role: "Legal Consultant",
    bio: "Prince Stevens Thengo serves as Legal Consultant at Clarkes Attorneys, bringing specialist expertise in policy analysis, commercial law, and legal advisory services. He supports the firm's work in legal research, documentation, legal opinion drafting, and strategic consultancy, with a particular focus on complex regulatory and policy matters. Prince contributes to the firm's advisory engagements with public sector institutions, civil society organisations, and commercial clients, helping to analyse legislative frameworks and develop practical compliance strategies. His consultancy work combines rigorous analysis with pragmatic guidance, making him a valuable resource for clients facing regulatory change or navigating unfamiliar legal terrain.",
    email: "stevens@clarkesattorneys.mw",
    image: "/images/attorneys/prince-stevens-thengo.jpg",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    title: "Clarkes Attorneys brand identity",
    category: "Firm Identity",
    image: "/images/gallery/clarkes-attorneys-logo-cover.jpg",
    orientation: "landscape",
  },
  {
    title: "Counsel at court",
    category: "Practice",
    image: "/images/gallery/counsel-at-court.jpg",
    orientation: "landscape",
  },
  {
    title: "Geoffrey Mustafa Taumbe office portrait",
    category: "Attorney Profile",
    image: "/images/gallery/geoffrey-mustafa-taumbe-office-portrait.jpg",
    orientation: "square",
  },
  {
    title: "Prince Stevens Thengo portrait",
    category: "Attorney Profile",
    image: "/images/gallery/prince-stevens-thengo-portrait.jpg",
    orientation: "portrait",
  },
  {
    title: "Kennedy Chiphaso court portrait",
    category: "Attorney Profile",
    image: "/images/gallery/kennedy-chiphaso-court-portrait.jpg",
    orientation: "portrait",
  },
  {
    title: "Kennedy Chiphaso advocacy portrait",
    category: "Attorney Profile",
    image: "/images/gallery/kennedy-chiphaso-advocacy-portrait.jpg",
    orientation: "portrait",
  },
  {
    title: "Counsel in advocacy dress",
    category: "Practice",
    image: "/images/gallery/counsel-in-advocacy-dress.jpg",
    orientation: "portrait",
  },
  {
    title: "John Chilembwe Day message",
    category: "Public Notice",
    image: "/images/gallery/john-chilembwe-day.jpg",
    orientation: "landscape",
  },
  {
    title: "General notice",
    category: "Public Notice",
    image: "/images/gallery/general-notice-2023.jpg",
    orientation: "square",
  },
  {
    title: "New year message",
    category: "Firm Notice",
    image: "/images/gallery/new-year-message-2024.jpg",
    orientation: "landscape",
  },
  {
    title: "Process server vacancy notice",
    category: "Careers",
    image: "/images/gallery/process-server-vacancy-2024-september.jpg",
    orientation: "portrait",
  },
  {
    title: "Recruitment notice",
    category: "Careers",
    image: "/images/gallery/process-server-vacancy-2024-january.jpg",
    orientation: "portrait",
  },
  {
    title: "Condolence message",
    category: "Public Notice",
    image: "/images/gallery/condolence-message.jpg",
    orientation: "landscape",
  },
  {
    title: "Malawi Law Society new year message",
    category: "Professional Community",
    image: "/images/gallery/malawi-law-society-new-year.jpg",
    orientation: "portrait",
  },
];


export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-the-right-legal-structure",
    title: "How to choose the right legal structure for a growing business",
    excerpt: "A practical overview of how legal structure affects liability, governance, tax, and long-term growth.",
    content: `When establishing or expanding a business, selecting the appropriate legal structure is one of the most critical foundational decisions a founder or board will make. The chosen structure dictates personal liability, compliance requirements, tax obligations, and your ability to attract external investment.

### Key Considerations for Business Owners

1. **Liability Protection:** Operating as a private limited company creates a distinct legal entity separate from its owners. This safeguards personal assets against business liabilities, debt claims, and contractual disputes.
2. **Governance and Secretarial Compliance:** Statutory reporting, annual returns, and clear director duties become mandatory as you scale. Ensuring proper company secretarial administration prevents regulatory penalties and maintains good standing.
3. **Capital and Investment Structure:** Investors and commercial banks prefer dealing with well-structured corporate entities. Having transparent share capital and shareholder agreements makes debt or equity financing significantly smoother.

Choosing the right structure early prevents costly reorganizations down the line. Our corporate practice assists entrepreneurs and growing enterprises with entity formation, governance frameworks, and regulatory compliance.`,
    publishedAt: "2026-07-12",
    category: "Corporate",
  },
  {
    slug: "why-documentation-wins-disputes",
    title: "Why documentation wins disputes before they begin",
    excerpt: "The paper trail often decides the outcome. Here is how to build one that protects your position.",
    content: `In legal practice, especially within commercial litigation and arbitration, contemporary written records carry immense evidentiary weight. When commercial relationships face strain or contracts are breached, oral testimony rarely outweighs clear, contemporaneous documentation.

### Building an Irresistible Paper Trail

* **Written Confirmation:** Always follow up significant verbal agreements, phone calls, or meetings with a clear written email summary detailing agreed terms, responsibilities, and timelines.
* **Formal Variations:** Ensure any contractual amendments are executed in writing in accordance with the contract's variation clauses. Informal side-agreements are frequently unenforceable.
* **Incident Logging:** In property disputes, construction delays, or employment matters, maintain chronological logs of events, formal notices sent, and responses received.

A disciplined approach to record-keeping not only strengthens your hand if litigation becomes necessary, but often deters counterparties from raising frivolous claims altogether.`,
    publishedAt: "2026-07-08",
    category: "Litigation",
  },
  {
    slug: "protecting-brand-identity",
    title: "Protecting brand identity in a crowded market",
    excerpt: "Trademark registrations, policing, and practical steps that help businesses keep control of their brand.",
    content: `A brand's reputation and visual identity represent significant intangible value. Without formal intellectual property protection, businesses risk losing customer goodwill to competitors operating with similar marks or copying proprietary materials.

### Steps to Safeguard Your Brand

1. **Early Trademark Registration:** Secure registration for your business name, logo, and core product marks early in relevant classes. Prior usage alone may offer limited protection compared to statutory trademark registration.
2. **Monitoring the Market:** Actively monitor industry developments and trade registers for conflicting registrations or unauthorized use of confusingly similar marks.
3. **Enforcement and Licensing:** Issue prompt cease-and-desist notices where infringement occurs, and ensure formal trademark licensing agreements are executed when allowing subsidiaries, franchisees, or partners to use your mark.

Our IP practice assists clients in navigating trademark applications, opposition proceedings, and enforcement strategies to secure brand equity.`,
    publishedAt: "2026-06-28",
    category: "IP",
  },
];

export const clientSectors = [
  "All",
  "Public & Civil Society",
  "Corporate & Trade",
  "Energy & Petroleum",
  "Hospitality & Real Estate",
] as const;

export const clients: ExperienceClient[] = [
  {
    name: "Human Rights Defenders Coalition",
    kind: "sprite",
    label: "Human Rights Defenders Coalition",
    logoUrl: "https://hrdcmalawi.org/images/logo.png",
    crop: { x: 0, y: 0, width: 620, height: 450 },
    sector: "Public & Civil Society",
    description: "Constitutional litigation and public interest legal representation.",
  },
  {
    name: "AKWA Group",
    kind: "sprite",
    label: "AKWA Group",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/83/Akwa_Group.png",
    crop: { x: 760, y: 0, width: 776, height: 360 },
    sector: "Corporate & Trade",
    description: "Commercial law advisory and corporate governance consultancy.",
  },
  {
    name: "Agri Zone Trading L.L.C.",
    kind: "sprite",
    label: "Agri Zone Trading L.L.C.",
    logoUrl: "/images/clients/agri-zone-logo.png",
    crop: { x: 360, y: 300, width: 760, height: 380 },
    sector: "Corporate & Trade",
    description: "Cross-border commercial contracts and trade dispute resolution.",
  },
  {
    name: "Ametros",
    kind: "sprite",
    label: "Ametros",
    logoUrl: "/images/clients/ametros-logo.png",
    crop: { x: 0, y: 640, width: 760, height: 384 },
    sector: "Corporate & Trade",
    description: "Regulatory compliance, intellectual property, and strategic legal counsel.",
  },
  {
    name: "Government of Malawi",
    kind: "sprite",
    label: "Government of Malawi",
    logoUrl: "/images/clients/government-of-malawi.png",
    crop: { x: 970, y: 540, width: 566, height: 484 },
    sector: "Public & Civil Society",
    description: "Public sector advisory, legislative review, and legal consultancy.",
  },
  {
    name: "Centre for Human Rights and Rehabilitation",
    kind: "badge",
    label: "Centre for Human Rights and Rehabilitation",
    logoUrl: "https://chrrmw.org/wp-content/uploads/2021/05/cropped-chrr-logo.png",
    short: "CHRR",
    accent: "navy",
    sector: "Public & Civil Society",
    description: "Human rights advocacy and legal advisory services.",
  },
  {
    name: "Nezzer Lodges & Michiru Hotels",
    kind: "badge",
    label: "Nezzer Lodges & Michiru Hotels",
    short: "NMH",
    accent: "gold",
    sector: "Hospitality & Real Estate",
    description: "Conveyancing, property leases, and commercial hospitality law.",
  },
  {
    name: "Super Sakuwa Steel",
    kind: "badge",
    label: "Super Sakuwa Steel",
    short: "SSS",
    accent: "blue",
    sector: "Corporate & Trade",
    description: "Industrial transactions, employment advisory, and commercial litigation.",
  },
  {
    name: "Supersink Petroleum",
    kind: "badge",
    label: "Supersink Petroleum",
    logoUrl: "https://pbs.twimg.com/profile_images/1572462532414611456/pc8yui_N_400x400.jpg",
    short: "SP",
    accent: "navy",
    sector: "Energy & Petroleum",
    description: "Petroleum distribution licensing, regulatory compliance, and commercial contracts.",
  },
];

export const experienceHighlights = [
  {
    title: "Civil & Public Litigation",
    stat: "Court",
    statLabel: "Dispute support",
    description:
      "Litigation support for corporate entities, civil society organizations, and individuals.",
    sector: "Public & Civil Society",
  },
  {
    title: "Corporate Transactions & Advisory",
    stat: "Advisory",
    statLabel: "Commercial support",
    description:
      "Support with corporate governance, commercial arrangements, shareholder matters, and regulatory compliance.",
    sector: "Corporate & Trade",
  },
  {
    title: "Property Development & Conveyancing",
    stat: "Property",
    statLabel: "Conveyancing",
    description:
      "Real estate support covering land acquisitions, lease drafting, title transfers, and commercial property matters.",
    sector: "Hospitality & Real Estate",
  },
  {
    title: "Energy & Industrial Regulatory Law",
    stat: "Energy",
    statLabel: "Regulatory support",
    description:
      "Support with energy-sector licensing, supply chain contracts, statutory compliance, and environmental obligations.",
    sector: "Energy & Petroleum",
  },
];
