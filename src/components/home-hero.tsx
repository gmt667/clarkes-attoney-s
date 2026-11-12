import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { ResponsiveImage as Image } from './responsive-image';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from './motion';
import { contactEmail } from '@/config/navigation';

export function HomeHero() { return (
<section className="home-editorial-hero" aria-labelledby="home-hero-title">
        <div className="home-editorial-grid">
          <FadeInStagger className="home-editorial-copy">
            <FadeInStaggerItem>
              <div className="home-editorial-kicker">
                <span aria-hidden="true" />
                <p>Legal practitioners in Lilongwe, Malawi</p>
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <h1 id="home-hero-title">
                <span className="hero-title-line">Solving complex</span>
                <span className="hero-title-line hero-title-accent">legal challenges</span>
                <span className="hero-title-line">with confidence</span>
              </h1>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <p className="home-editorial-intro">
                Clarkes Attorneys provides litigation, advisory, corporate,
                property, intellectual property, and dispute resolution services
                for individuals, businesses, and institutions.
              </p>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="home-editorial-actions">
                <Link className="reference-button reference-button-primary" to="/contact">
                  <span>Discuss your matter</span>
                  <ArrowUpRight size={17} />
                </Link>
                <Link className="reference-button reference-button-secondary" to="/practice-areas">
                  <span>Explore services</span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="home-editorial-location">
                <MapPin size={16} />
                <span>Along Kamuzu Procession Road, Lilongwe</span>
              </div>
            </FadeInStaggerItem>
          </FadeInStagger>

          <FadeIn direction="left" delay={0.12} className="home-editorial-visual">
            <div className="home-justice-frame">
              <Image
                src="/images/hero-law-firm.png"
                alt="Lady Justice in a contemporary legal setting"
                fill
                priority
                sizes="(max-width: 840px) 100vw, 52vw"
                className="home-justice-image"
              />
              <div className="home-justice-wash" />

              <div className="home-established-card">
                <strong>2017</strong>
                <span>Established in Malawi</span>
              </div>

            </div>
          </FadeIn>
        </div>

        <div className="home-editorial-rail">
          <Link to="/our-team" className="home-partner-card">
            <Image
              src="/images/attorneys/geoffrey-taumbe.jpg"
              alt="Geoffrey Mustafa Taumbe, Managing Partner"
              width={72}
              height={72}
            />
            <span>
              <small>Managing Partner</small>
              <strong>Direct, considered legal guidance</strong>
            </span>
            <ArrowUpRight size={17} />
          </Link>

          <a className="home-email-card" href={`mailto:${contactEmail}`}>
            <span className="home-email-icon"><Mail size={17} /></span>
            <span>
              <small>General enquiries</small>
              <strong>{contactEmail}</strong>
            </span>
          </a>
        </div>
      </section>
); }
