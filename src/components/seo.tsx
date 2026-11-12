import { useLocation } from 'react-router-dom';
import { blogPosts } from '@/content/site-content';
import { pageMetadata } from '@/config/page-metadata';
import { environment } from '@/config/environment';

const pageNames = { '/about': 'About', '/practice-areas': 'PracticeAreas', '/our-team': 'OurTeam', '/experience': 'Experience', '/gallery': 'Gallery', '/blog': 'Blog', '/contact': 'Contact' } as const;
export function Seo() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '') || '/';
  const post = blogPosts.find(item => `/blog/${item.slug}` === path);
  const page = pageNames[path as keyof typeof pageNames];
  const known = path === '/' || Boolean(page) || Boolean(post);
  const metadata = post ? { title: `${post.title} | Clarkes Attorneys`, description: post.excerpt }
    : page ? pageMetadata[page] : path === '/' ? { title: 'Clarkes Attorneys | Legal Practitioners', description: 'Clarkes Attorneys provides litigation, corporate advisory, property, intellectual property, public law, and dispute resolution services.' }
    : { title: 'Page Not Found | Clarkes Attorneys', description: 'This page is not available. Contact Clarkes Attorneys for assistance.' };
  return <>
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description} />
    <meta property="og:title" content={metadata.title} />
    <meta property="og:description" content={metadata.description} />
    <meta property="og:type" content={post ? 'article' : 'website'} />
    {!known ? <meta name="robots" content="noindex, follow" /> : null}
    {known && environment.siteUrl ? <link rel="canonical" href={`${environment.siteUrl}${path}`} /> : null}
  </>;
}
