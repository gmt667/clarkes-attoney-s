import { cache } from "react";
import {
  attorneys,
  blogPosts,
  clients,
  contactDetails,
  practiceAreas,
  values,
} from "./site-content";

type CmsContent = {
  values: typeof values;
  practiceAreas: typeof practiceAreas;
  attorneys: typeof attorneys;
  blogPosts: typeof blogPosts;
  clients: typeof clients;
  contactDetails: typeof contactDetails;
};

type SanityContent = {
  values?: typeof values;
  practiceAreas?: typeof practiceAreas;
  attorneys?: typeof attorneys;
  blogPosts?: Array<
    Omit<(typeof blogPosts)[number], "slug"> & {
      slug?: { current?: string } | string;
    }
  >;
  clients?: Array<{ name?: string }>;
  contactDetails?: Partial<typeof contactDetails>;
};

async function fetchSanity<T>(query: string): Promise<T | null> {
  try {
    const projectId =
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
      process.env.SANITY_PROJECT_ID;
    const dataset =
      process.env.NEXT_PUBLIC_SANITY_DATASET ??
      process.env.SANITY_DATASET;

    if (
      !projectId ||
      !dataset ||
      projectId === "your_project_id" ||
      projectId === "clarkes-attorneys"
    ) {
      return null;
    }

    const params = new URLSearchParams({
      query,
      perspective: "published",
    });

    const url = `https://${projectId}.api.sanity.io/v2024-06-01/data/query/${dataset}?${params.toString()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: process.env.SANITY_READ_TOKEN
        ? {
            Authorization: `Bearer ${process.env.SANITY_READ_TOKEN}`,
          }
        : undefined,
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const text = await response.text();
    if (!text) return null;
    const payload = JSON.parse(text) as { result?: T };
    return payload.result ?? null;
  } catch {
    return null;
  }
}

export const getCmsContent = cache(async (): Promise<CmsContent> => {
  const sanityContent = await fetchSanity<SanityContent>(
    `{
      "values": *[_type == "siteValue"] | order(order asc){title, text},
      "practiceAreas": *[_type == "practiceArea"] | order(order asc){title, description, items},
      "attorneys": *[_type == "attorney"] | order(order asc){name, role, bio, email},
      "blogPosts": *[_type == "post"] | order(publishedAt desc){slug, title, excerpt, publishedAt, category},
      "clients": *[_type == "client"] | order(order asc){name},
      "contactDetails": *[_type == "contactDetails"][0]{phoneNumbers, email, poBox, location}
    }`
  );

  if (sanityContent) {
    const mappedBlogPosts = (sanityContent.blogPosts ?? []).map((post) => ({
      ...post,
      slug:
        typeof post.slug === "string"
          ? post.slug
          : post.slug?.current ?? "",
    }));
    const mappedClients = (sanityContent.clients ?? [])
      .map((client) => {
        const name = client.name?.trim();
        if (!name) return null;
        const existing = clients.find((c) => c.name.toLowerCase() === name.toLowerCase());
        if (existing) return existing;
        const words = name.split(" ").filter(Boolean);
        const short = words.map((w) => w[0].toUpperCase()).join("").slice(0, 4);
        return {
          name,
          kind: "badge" as const,
          sector: "Corporate & Trade" as const,
          description: "Representative client engagement and advisory support.",
          label: name,
          short: short || "CL",
          accent: "navy" as const,
        };
      })
      .filter(Boolean);

    return {
      values: sanityContent.values ?? values,
      practiceAreas: sanityContent.practiceAreas ?? practiceAreas,
      attorneys: sanityContent.attorneys ?? attorneys,
      blogPosts: mappedBlogPosts.length ? mappedBlogPosts : blogPosts,
      clients: mappedClients.length ? (mappedClients as typeof clients) : clients,
      contactDetails: {
        ...contactDetails,
        ...sanityContent.contactDetails,
      },
    };
  }

  return {
    values,
    practiceAreas,
    attorneys,
    blogPosts,
    clients,
    contactDetails,
  };
});
