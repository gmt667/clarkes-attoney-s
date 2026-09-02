"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail, Menu, Moon, Phone, Sun, X } from "lucide-react";
import { contactEmail, navLinks, primaryPhoneHref } from "@/lib/navigation";
import { useTheme } from "@/components/theme-provider";

// ─── Brand Logo ───────────────────────────────────────────────────────────────

export function BrandLogo({
  variant,
  tone = "light",
  className,
}: {
  variant: "full" | "icon";
  tone?: "light" | "dark";
  className?: string;
}) {
  const src =
    variant === "full"
      ? tone === "dark"
        ? "/logo-full-dark.svg"
        : "/logo-full.svg"
      : "/logo-icon.svg";
  const dims =
    variant === "full"
      ? { width: 360, height: 96 }
      : { width: 56, height: 56 };

  return (
    <Image
      src={src}
      alt="Clarkes Attorneys"
      width={dims.width}
      height={dims.height}
      className={className}
      priority={variant === "full"}
    />
  );
}

// ─── Theme Toggle Button ──────────────────────────────────────────────────────

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={17} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 60, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -60, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={17} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─── Site Header ──────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Detect scroll for elevated navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <>
      <header className={`topbar${scrolled ? " topbar-scrolled" : ""}`}>
        {/* Brand */}
        <Link className="brand" href="/" aria-label="Clarkes Attorneys Home">
          <BrandLogo variant="full" className="brand-logo brand-logo-full" />
          <BrandLogo variant="icon" className="brand-logo brand-logo-icon" />
        </Link>

        {/* Desktop navigation */}
        <nav className="nav-desktop" aria-label="Main navigation">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${active ? " nav-link-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span>{item.label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-active-pill"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
          <div className="nav-contact" aria-label="Contact shortcuts">
            <a
              className="nav-contact-link nav-contact-call"
              href={primaryPhoneHref}
              aria-label="Call Clarkes Attorneys"
              title="Call firm"
            >
              <Phone size={15} />
            </a>
            <a
              className="nav-contact-link nav-contact-email"
              href={`mailto:${contactEmail}`}
              aria-label="Email Clarkes Attorneys"
              title="Email firm"
            >
              <Mail size={15} />
            </a>
          </div>
        </nav>

        {/* Right controls: theme toggle + mobile menu button */}
        <div className="topbar-controls">
          <ThemeToggle />

          <button
            ref={toggleRef}
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-dropdown"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="x"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.16 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="m"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.16 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Compact dropdown mobile menu — anchored to top-right of navbar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              className="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              ref={menuRef}
              key="dropdown"
              id="mobile-nav-dropdown"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="mobile-dropdown"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ type: "spring", damping: 26, stiffness: 340 }}
            >
              <nav className="mobile-dropdown-links" aria-label="Mobile navigation">
                {navLinks.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`mobile-dropdown-link${active ? " mobile-dropdown-link-active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                    >
                      <span>{item.label}</span>
                      {active ? (
                        <span className="mobile-dropdown-dot" aria-hidden="true" />
                      ) : (
                        <ArrowRight size={14} className="mobile-dropdown-arrow" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mobile-dropdown-footer">
                <a href={primaryPhoneHref} className="mobile-dropdown-contact">
                  <Phone size={14} />
                  <span>+265 881 618 041</span>
                </a>
                <a href={`mailto:${contactEmail}`} className="mobile-dropdown-contact">
                  <Mail size={14} />
                  <span>{contactEmail}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
