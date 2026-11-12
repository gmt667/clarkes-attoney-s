import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Seo } from '@/components/seo';

export function SiteLayout() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      else if (navigationType !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' });
      if (!hash && navigationType !== 'POP') document.getElementById('main-content')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, navigationType]);
  return <>
    <Seo />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className={`site-shell ${pathname === '/' ? 'home-reference-shell' : 'inner-page'}`}>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}><Outlet /></main>
      <SiteFooter />
    </div>
    <ScrollToTop />
  </>;
}
