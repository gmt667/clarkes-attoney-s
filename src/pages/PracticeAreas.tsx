import { practiceAreas } from "@/content/site-content";
import { Card } from "@/components/card";
import { Link } from "react-router-dom";
import { ArrowRight, Scale } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/motion";



export default function PracticeAreasPage() {


  return (
    <>
      <PageHero
        eyebrow="Practice Areas"
        title="Comprehensive legal support across core business and dispute needs."
        copy="The firm's practice structure is broad enough to support most commercial and individual client needs while keeping the advice practical and focused."
        primaryHref="/contact"
        primaryLabel="Request consultation"
        secondaryHref="/experience"
        secondaryLabel="View experience"
        stat="6+"
        statLabel="Practice pillars covering disputes, corporate services, public law, property, IP, and ADR."
        icon={<Scale />}
      />

      <section>
        <FadeInStagger className="content-grid practice-page-grid" staggerDelay={0.06}>
          {practiceAreas.map((area) => (
            <FadeInStaggerItem key={area.title}>
              <Card className="practice-detail-card">
                <h2>{area.title}</h2>
                <p>{area.description}</p>
                <ul className="bullet-list">
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>

      <FadeIn duration={0.5}>
        <section className="inner-cta">
          <div>
            <p className="page-kicker">Matter Review</p>
            <h2>Not sure which practice area fits your matter?</h2>
            <p>
              Share the details with Clarkes Attorneys and the team will guide you
              toward the right legal support.
            </p>
          </div>
          <Link className="button button-solid button-animated" to="/contact">
            <span>Request guidance</span>
            <ArrowRight size={18} className="button-icon-arrow" />
          </Link>
        </section>
      </FadeIn>
    </>
  );
}
