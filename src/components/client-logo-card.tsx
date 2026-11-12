
import { useState } from "react";
import type { ExperienceClient } from "@/content/site-content";

export function ClientLogoCard({ client }: { client: ExperienceClient }) {
  const [logoFailed, setLogoFailed] = useState(false);
  // Original CHRR/Twitter logo URLs return 404. Keep their existing named badge
  // fallback and use original local artwork for the other portfolio entries.
  const localLogo = client.name === "AKWA Group" ? "/images/clients/akwa-group.png"
    : client.logoUrl?.startsWith("/") ? client.logoUrl : undefined;
  if (client.name === "Human Rights Defenders Coalition" && client.kind === "sprite") {
    const { crop } = client;
    return <article className="client-logo-card client-logo-card-image">
      <span className="client-sector-tag">{client.sector}</span>
      <div className="client-image-container">
        <span className="client-logo-sprite" role="img" aria-label={`${client.label} logo`}
          style={{ aspectRatio: `${crop.width} / ${crop.height}`, backgroundSize: `${1536 / crop.width * 100}% ${1024 / crop.height * 100}%`, backgroundPosition: `${crop.x / (1536 - crop.width) * 100}% ${crop.y / (1024 - crop.height) * 100}%` }} />
      </div>
      <span className="client-logo-label">{client.label}</span>
      <span className="client-logo-desc">{client.description}</span>
    </article>;
  }
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

  if (localLogo && !logoFailed) {
    return (
      <article className="client-logo-card client-logo-card-image">
        <span className="client-sector-tag">{client.sector}</span>
        <div className="client-image-container">
          <img
            className="client-logo-image"
            src={localLogo}
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
