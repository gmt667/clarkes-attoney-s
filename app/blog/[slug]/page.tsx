import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";
import { getCmsContent } from "@/lib/cms";
import { PageShell } from "@/components/page-shell";
import { FadeIn } from "@/components/motion";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { blogPosts } = await getCmsContent();
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { blogPosts } = await getCmsContent();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found | Clarkes Attorneys" };
  }

  return {
    title: `${post.title} | Clarkes Attorneys`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { blogPosts } = await getCmsContent();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Simple paragraph renderer for post content
  const paragraphs = (post.content || post.excerpt).split("\n\n").filter(Boolean);

  // Renders inline **bold** markdown segments as <strong>
  function renderInline(text: string) {
    const segments = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    return segments.map((segment, i) =>
      segment.startsWith("**") && segment.endsWith("**") ? (
        <strong key={i}>{segment.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{segment}</span>
      )
    );
  }

  return (
    <PageShell>
      <article className="blog-article-container">
        <FadeIn direction="none" duration={0.3}>
          <Link className="button button-ghost blog-back-link" href="/blog">
            <ArrowLeft size={16} />
            Back to all articles
          </Link>
        </FadeIn>

        <FadeIn duration={0.5}>
          <header className="blog-article-header">
            <div className="blog-meta">
              <span className="blog-category-tag">
                <Tag size={14} />
                {post.category}
              </span>
              <time dateTime={post.publishedAt} className="blog-date">
                <Calendar size={14} />
                {post.publishedAt}
              </time>
            </div>

            <h1 className="blog-article-title">{post.title}</h1>
            <p className="blog-article-lead">{post.excerpt}</p>
          </header>
        </FadeIn>

        <FadeIn duration={0.6} delay={0.1}>
          <div className="blog-article-body">
            {paragraphs.map((p, idx) => {
              if (p.startsWith("### ")) {
                return <h3 key={idx}>{p.replace("### ", "")}</h3>;
              }
              if (p.startsWith("1. ") || p.startsWith("* ")) {
                const items = p.split("\n").filter(Boolean);
                return (
                  <ul key={idx} className="bullet-list blog-bullet-list">
                    {items.map((item, i) => (
                      <li key={i}>{renderInline(item.replace(/^(\d+\.|\*)\s*/, ""))}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={idx}>{renderInline(p)}</p>;
            })}
          </div>
        </FadeIn>

        <FadeIn duration={0.5}>
          <section className="inner-cta">
            <div>
              <p className="page-kicker">Specific Legal Matters</p>
              <h2>Need counsel on this topic?</h2>
              <p>
                This article provides general information. For formal advice tailored
                to your situation, get in touch with Clarkes Attorneys.
              </p>
            </div>
            <Link className="button button-solid button-animated" href="/contact">
              <span>Discuss with an attorney</span>
              <ArrowRight size={18} className="button-icon-arrow" />
            </Link>
          </section>
        </FadeIn>
      </article>
    </PageShell>
  );
}
