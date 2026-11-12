import { blogPosts } from "@/content/site-content";
import { Card } from "@/components/card";
import { Link } from "react-router-dom";
import { ArrowRight, Newspaper } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/motion";



export default function BlogPage() {


  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Practical legal insights for businesses and individuals."
        copy="A publishing area for legal updates, client guidance, and practical explanations."
        primaryHref="/contact"
        primaryLabel="Ask a question"
        secondaryHref="/practice-areas"
        secondaryLabel="Browse services"
        stat={`${blogPosts.length}`}
        statLabel="Current insights prepared for clients and businesses."
        icon={<Newspaper />}
      />

      <section>
        <FadeInStagger className="content-grid blog-grid" staggerDelay={0.06}>
          {blogPosts.map((post) => (
            <FadeInStaggerItem key={post.slug}>
              <Card className="blog-card">
                <div className="blog-meta">
                  <span>{post.category}</span>
                  <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <Link className="route-card-link" to={`/blog/${post.slug}`}>
                  <span>Read article</span>
                  <ArrowRight size={16} className="route-card-arrow" />
                </Link>
              </Card>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </section>

      <FadeIn duration={0.5}>
        <section className="inner-cta">
          <div>
            <p className="page-kicker">Legal Insight</p>
            <h2>Need advice on a specific legal issue?</h2>
            <p>
              The blog gives general guidance. For advice tailored to your facts,
              contact Clarkes Attorneys directly.
            </p>
          </div>
          <Link className="button button-solid button-animated" to="/contact">
            <span>Ask Clarkes</span>
            <ArrowRight size={18} className="button-icon-arrow" />
          </Link>
        </section>
      </FadeIn>
    </>
  );
}
