import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/components/scroll-to-top";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="site-shell inner-page">
        <SiteHeader />

        {children}

        <SiteFooter />
      </div>
      <ScrollToTop />
    </>
  );
}
