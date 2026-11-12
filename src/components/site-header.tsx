import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Mail, Menu, Moon, Phone, Sun, X } from 'lucide-react';
import { contactEmail, navLinks, primaryPhoneHref } from '@/config/navigation';
import { useTheme } from './theme-provider';
import { ResponsiveImage } from './responsive-image';

export function BrandLogo({ variant, tone, className }: { variant: 'full' | 'icon'; tone?: 'light' | 'dark' | 'auto'; className?: string }) {
  const { theme } = useTheme();
  const dark = tone === 'dark' || ((!tone || tone === 'auto') && theme === 'dark');
  return <ResponsiveImage src={variant === 'icon' ? '/logo-icon.svg' : dark ? '/logo-full-dark.svg' : '/logo-full.svg'}
    alt="Clarkes Attorneys" width={variant === 'icon' ? 56 : 360} height={variant === 'icon' ? 56 : 96} className={className} priority />;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); toggle.current?.focus(); }
    };
    const onOutside = (event: PointerEvent) => {
      if (!dropdown.current?.contains(event.target as Node) && !toggle.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onOutside); };
  }, [menuOpen]);

  return <header className={`topbar${scrolled ? ' topbar-scrolled' : ''}`}>
    <Link className="brand" to="/" aria-label="Clarkes Attorneys Home">
      <BrandLogo variant="full" className="brand-logo brand-logo-full" />
      <BrandLogo variant="icon" className="brand-logo brand-logo-icon" />
    </Link>
    <nav className="nav-desktop" aria-label="Main navigation">
      {navLinks.map(item => <NavLink key={item.href} to={item.href} end={item.href === '/'} className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}>
        {({ isActive }) => <><span>{item.label}</span>{isActive ? <span className="nav-active-pill" /> : null}</>}
      </NavLink>)}
      <div className="nav-contact" aria-label="Contact shortcuts">
        <a className="nav-contact-link nav-contact-call" href={primaryPhoneHref} aria-label="Call Clarkes Attorneys"><Phone size={16} /></a>
        <a className="nav-contact-link nav-contact-email" href={`mailto:${contactEmail}`} aria-label="Email Clarkes Attorneys"><Mail size={16} /></a>
      </div>
    </nav>
    <div className="topbar-controls">
      <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
      <button ref={toggle} type="button" className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav-dropdown" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
    {menuOpen ? <div ref={dropdown} id="mobile-nav-dropdown" className="mobile-dropdown">
      <nav className="mobile-dropdown-links" aria-label="Mobile navigation">
        {navLinks.map(item => <NavLink key={item.href} to={item.href} end={item.href === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => `mobile-dropdown-link${isActive ? ' mobile-dropdown-link-active' : ''}`}>
          {item.label}
        </NavLink>)}
      </nav>
      <div className="mobile-dropdown-footer">
        <a href={primaryPhoneHref} className="mobile-dropdown-contact"><Phone size={16} />+265 881 618 041</a>
        <a href={`mailto:${contactEmail}`} className="mobile-dropdown-contact"><Mail size={16} />{contactEmail}</a>
      </div>
    </div> : null}
  </header>;
}
