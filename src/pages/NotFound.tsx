import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import { FadeIn } from "@/components/motion";

export default function NotFound() {
  return (
    <>
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
            <Link className="button button-solid button-animated" to="/">
              <span>Return home</span>
              <ArrowRight size={18} className="button-icon-arrow" />
            </Link>
            <Link className="button button-ghost" to="/contact">
              Contact the firm
            </Link>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
