"use client";

import { useState } from "react";
import type { ExperienceClient } from "@/lib/site-content";

export function ClientLogoCard({ client }: { client: ExperienceClient }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const fallbackShort =
    client.kind === "badge"
      ? client.short
      : client.label
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => word[0]?.toUpperCase())
          .join("")
          .slice(0, 4);
  const fallbackAccent = client.kind === "badge" ? client.accent : "navy";

  if (client.logoUrl && !logoFailed) {
    return (
      <article className="client-logo-card client-logo-card-image">
        <span className="client-sector-tag">{client.sector}</span>
        <div className="client-image-container">
          <img
            className="client-logo-image"
            src={client.logoUrl}
            alt={`${client.label} logo`}
            loading="lazy"
            onError={() => setLogoFailed(true)}
          />
        </div>
        <span className="client-logo-label">{client.label}</span>
        {client.description ? <span className="client-logo-desc">{client.description}</span> : null}
      </article>
    );
  }

  return (
    <article className={`client-logo-card client-logo-card-badge client-logo-${fallbackAccent}`}>
      <span className="client-sector-tag">{client.sector}</span>
      <div className="client-logo-badge" aria-hidden="true">
        <span>{fallbackShort || "CL"}</span>
      </div>
      <span className="client-logo-label">{client.label}</span>
      {client.description ? <span className="client-logo-desc">{client.description}</span> : null}
    </article>
  );
}
