"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import logoMark from "@/public/singl_logo_colord_white_background@4x.png";
import type { Dictionary } from "@/dictionaries";

interface NavbarProps {
  locale: string;
  dict: Dictionary;
}

function IconHamburger() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4 md:h-5 md:w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4 md:h-5 md:w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  );
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  const navLinks = [
    { href: "#home", label: dict.nav.home },
    { href: "#why", label: dict.nav.why },
    { href: "#discover", label: dict.nav.discover },
    { href: "#universities", label: dict.nav.universities },
    { href: "#steps", label: dict.nav.howItWorks },
    { href: `/${locale}/blog`, label: dict.nav.blog, isPage: true },
    { href: "#contact", label: dict.nav.contact },
  ];

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Close mobile menu when scrolling
    if (isOpen) return;

    const direction = latest > lastY.current ? "down" : "up";
    if (direction === "down" && latest > 80) {
      setHidden(true);
    } else if (direction === "up") {
      setHidden(false);
    }
    lastY.current = latest;
  });

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsOpen(false);

      const targetId = href.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const handleToggle = () => setIsOpen((open) => !open);
  const handleClose = () => setIsOpen(false);

  // Build the opposite locale link
  const switchLocale = locale === "fr" ? "en" : "fr";
  const switchLabel = dict.lang.switchTo;
  // Replace the current locale segment in the pathname
  const switchHref = pathname.replace(`/${locale}`, `/${switchLocale}`);

  return (
    <motion.header
      className="sticky top-3 z-50 md:top-6"
      animate={{ y: hidden ? "-150%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-3 rounded-full border border-[--color-border-soft] bg-[--color-bg-secondary] px-3 py-2 shadow-xl shadow-black/10 backdrop-blur md:gap-6 md:px-4 md:py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src={logoMark}
              alt="Nopeca logo"
              width={140}
              height={140}
              className="h-9 w-auto object-contain md:h-14"
              priority
            />
          </div>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 text-sm font-semibold text-[--color-text-primary] lg:flex xl:gap-8 xl:text-base">
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-[--color-brand-primary]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="transition-colors hover:text-[--color-brand-primary]"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Right side: CTA + Lang + Admin + Hamburger */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language switcher */}
            <Link
              href={switchHref}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[--color-brand-primary] text-xs font-bold text-[--color-brand-primary] transition-colors hover:bg-[--color-brand-primary] hover:text-white md:h-10 md:w-10 md:text-sm"
            >
              {switchLabel}
            </Link>

            {/* Admin login - desktop */}
            <Link
              href="/admin/login"
              className="hidden items-center gap-1.5 rounded-full border border-[--color-brand-primary] px-4 py-2 text-xs font-semibold text-[--color-brand-primary] transition-colors hover:bg-[--color-brand-primary] hover:text-white md:inline-flex md:px-5 md:py-2.5 md:text-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              Admin
            </Link>

            {/* Apply now - desktop */}
            <a
              href="#steps"
              onClick={(e) => handleSmoothScroll(e, "#steps")}
              className="hidden rounded-full bg-[--color-brand-secondary] px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:-translate-y-0.5 hover:shadow-lg md:inline-flex md:px-6 md:py-3 md:text-base"
            >
              {dict.nav.applyNow}
            </a>

            {/* WhatsApp - desktop */}
            <Link
              href="https://wa.me/213561799531"
              target="_blank"
              className="hidden items-center justify-center rounded-full bg-[--color-brand-secondary] p-2.5 transition hover:-translate-y-0.5 hover:shadow-lg md:inline-flex md:p-3"
            >
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="white"
              >
                <path d="M12 2a10 10 0 0 0-8.66 15.06L2 22l5.11-1.31A10 10 0 1 0 12 2Zm5.24 14.31c-.22.62-1.3 1.19-1.85 1.27s-.44.41-2.91-.6-4.75-3.39-4.88-3.55-.73-1-.73-1.91.46-1.38.62-1.57.36-.24.49-.24.24 0 .35.01.26-.04.41.31.52 1.26.57 1.35.09.21 0 .34c-.09.13-.13.21-.26.33s-.27.28-.12.55.67 1.1 1.44 1.78 1.48.97 1.7 1.08.33.09.45-.05.52-.61.66-.82.27-.18.45-.11 1.17.55 1.37.65.32.15.37.23-.01.68-.23 1.3Z" />
              </svg>
            </Link>

            {/* Hamburger - mobile/tablet */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={handleToggle}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[--color-brand-primary] text-[--color-brand-primary] transition-colors hover:bg-[--color-brand-primary]/10 md:h-12 md:w-12 lg:hidden"
            >
              {isOpen ? <IconClose /> : <IconHamburger />}
            </button>
          </div>
        </nav>

        {/* Mobile/tablet dropdown menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-3xl border border-[--color-border-soft] bg-[--color-bg-primary] p-4 shadow-2xl shadow-black/10 md:mt-3 md:rounded-[3rem] md:p-5 lg:hidden"
            >
              <div className="flex flex-col gap-1 text-sm font-semibold text-[--color-text-primary] md:gap-3 md:text-base">
                {navLinks.map((link) =>
                  link.isPage ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleClose}
                      className="rounded-xl px-3 py-2.5 transition-colors hover:bg-[--color-bg-secondary]/40 hover:text-[--color-brand-primary] md:py-3"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="rounded-xl px-3 py-2.5 transition-colors hover:bg-[--color-bg-secondary]/40 hover:text-[--color-brand-primary] md:py-3"
                    >
                      {link.label}
                    </a>
                  )
                )}
                <div className="mt-2 flex flex-col gap-2">
                  {/* Admin login - mobile */}
                  <Link
                    href="/admin/login"
                    onClick={handleClose}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[--color-brand-primary] px-5 py-2.5 text-sm font-semibold text-[--color-brand-primary] transition hover:bg-[--color-brand-primary] hover:text-white"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Admin Login
                  </Link>
                  <a
                    href="#steps"
                    onClick={(e) => handleSmoothScroll(e, "#steps")}
                    className="inline-flex items-center justify-center rounded-full bg-[--color-brand-secondary] px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-md transition hover:-translate-y-0.5 md:px-5 md:py-3 md:text-base"
                  >
                    {dict.nav.applyNow}
                  </a>
                  <Link
                    href="https://wa.me/213561799531"
                    target="_blank"
                    onClick={handleClose}
                    className="inline-flex items-center justify-center rounded-full bg-[--color-brand-secondary] p-2.5 shadow-md transition hover:-translate-y-0.5 md:p-3"
                  >
                    <svg
                      aria-hidden
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 md:h-6 md:w-6"
                      fill="white"
                    >
                      <path d="M12 2a10 10 0 0 0-8.66 15.06L2 22l5.11-1.31A10 10 0 1 0 12 2Zm5.24 14.31c-.22.62-1.3 1.19-1.85 1.27s-.44.41-2.91-.6-4.75-3.39-4.88-3.55-.73-1-.73-1.91.46-1.38.62-1.57.36-.24.49-.24.24 0 .35.01.26-.04.41.31.52 1.26.57 1.35.09.21 0 .34c-.09.13-.13.21-.26.33s-.27.28-.12.55.67 1.1 1.44 1.78 1.48.97 1.7 1.08.33.09.45-.05.52-.61.66-.82.27-.18.45-.11 1.17.55 1.37.65.32.15.37.23-.01.68-.23 1.3Z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
