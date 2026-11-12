import { ResponsiveImage as Image } from "@/components/responsive-image";
import { Camera, Images } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { galleryImages } from "@/content/site-content";
import { DetailDialog } from "@/components/detail-dialog";



export default function GalleryPage() {
  const [featured, ...items] = galleryImages;

  return (
    <>
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
            <DetailDialog title={featured.title} className="gallery-feature-image gallery-open" lightbox trigger={<Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />}>
              <div className="lightbox-image"><Image src={featured.image} alt={featured.title} fill sizes="90vw" style={{ objectFit: "contain" }} /></div>
              <p>{featured.category}</p>
            </DetailDialog>
          </FadeIn>
        ) : null}

        <FadeInStagger className="gallery-grid" staggerDelay={0.05}>
          {items.map((item) => (
            <FadeInStaggerItem key={item.image}>
              <article className={`gallery-card gallery-card-${item.orientation}`}>
                <DetailDialog title={item.title} className="gallery-image-wrap gallery-open" lightbox trigger={<Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />}>
                  <div className="lightbox-image"><Image src={item.image} alt={item.title} fill sizes="90vw" style={{ objectFit: "contain" }} /></div>
                  <p>{item.category}</p>
                </DetailDialog>
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
    </>
  );
}
