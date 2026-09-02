import type { Metadata } from "next";
import Image from "next/image";
import { Camera, Images } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { galleryImages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Gallery | Clarkes Attorneys",
  description:
    "A visual archive of Clarkes Attorneys notices, firm identity, and professional updates.",
};

export default function GalleryPage() {
  const [featured, ...items] = galleryImages;

  return (
    <PageShell>
      <PageHero
        eyebrow="Gallery"
        title="A visual archive of firm updates and moments."
        copy="Browse selected Clarkes Attorneys notices, identity pieces, and professional updates. New images can be added to this page as the firm grows its archive."
        primaryHref="/contact"
        primaryLabel="Contact the firm"
        secondaryHref="/experience"
        secondaryLabel="View experience"
        stat={`${galleryImages.length}`}
        statLabel="Images currently in the gallery archive."
        icon={<Images />}
      />

      <section className="gallery-section" aria-label="Clarkes Attorneys gallery">
        {featured ? (
          <FadeIn className="gallery-feature">
            <div className="gallery-feature-copy">
              <p className="page-kicker">{featured.category}</p>
              <h2>{featured.title}</h2>
              <p>
                The gallery keeps selected visual material in one organised
                place, making it easy to add future firm photographs, notices,
                and public updates.
              </p>
            </div>
            <div className="gallery-feature-image">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </FadeIn>
        ) : null}

        <FadeInStagger className="gallery-grid" staggerDelay={0.05}>
          {items.map((item) => (
            <FadeInStaggerItem key={item.image}>
              <article className={`gallery-card gallery-card-${item.orientation}`}>
                <div className="gallery-image-wrap">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
                <div className="gallery-card-caption">
                  <span>
                    <Camera size={14} />
                    {item.category}
                  </span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>
    </PageShell>
  );
}
