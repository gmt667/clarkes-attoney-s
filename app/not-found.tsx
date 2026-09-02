import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/motion";

export default function NotFound() {
  return (
    <main className="site-shell inner-page">
      <SiteHeader />
      <FadeIn duration={0.6}>
        <section className="not-found-panel">
          <div className="not-found-icon" aria-hidden="true">
            <Home size={32} />
          </div>
          <p className="page-kicker">Page Not Found</p>
          <h1>This page is not available.</h1>
          <p>
            The page may have moved while the Clarkes Attorneys website was being
            reorganized into independent routes.
          </p>
          <div className="page-hero-actions not-found-actions">
            <Link className="button button-solid button-animated" href="/">
              <span>Return home</span>
              <ArrowRight size={18} className="button-icon-arrow" />
            </Link>
            <Link className="button button-ghost" href="/contact">
              Contact the firm
            </Link>
          </div>
        </section>
      </FadeIn>
      <SiteFooter />
    </main>
  );
}
