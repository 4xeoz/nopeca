"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import logoMark from "@/public/singl_logo_colord_white_background@4x.png";
import type { Dictionary } from "@/dictionaries";
import {
  trackWhatsAppClick,
  trackGetStartedClick,
  trackLanguageSwitch,
  trackBlogClick,
} from "@/lib/gtag";

interface NavbarProps {
  locale: string;
  dict: Dictionary;
}

const LOCALE_FLAGS: Record<string, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
};

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

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="white"
    >
      <path d="M12 2a10 10 0 0 0-8.66 15.06L2 22l5.11-1.31A10 10 0 1 0 12 2Zm5.24 14.31c-.22.62-1.3 1.19-1.85 1.27s-.44.41-2.91-.6-4.75-3.39-4.88-3.55-.73-1-.73-1.91.46-1.38.62-1.57.36-.24.49-.24.24 0 .35.01.26-.04.41.31.52 1.26.57 1.35.09.21 0 .34c-.09.13-.13.21-.26.33s-.27.28-.12.55.67 1.1 1.44 1.78 1.48.97 1.7 1.08.33.09.45-.05.52-.61.66-.82.27-.18.45-.11 1.17.55 1.37.65.32.15.37.23-.01.68-.23 1.3Z" />
    </svg>
  );
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
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

  // Language switching
  const enHref = pathname.replace(`/${locale}`, `/en`);
  const frHref = pathname.replace(`/${locale}`, `/fr`);

  return (
    <motion.header
      className="sticky top-3 z-50 md:top-6"
      animate={{ y: hidden ? "-150%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <nav className="grid grid-cols-3 items-center gap-3 rounded-full border border-[--color-border-soft] bg-[--color-bg-secondary] px-3 py-2 shadow-xl shadow-black/10 backdrop-blur md:px-5 md:py-3">

          {/* Left: Desktop nav links + mobile hamburger */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Desktop nav links — Home + Blog only */}
            <div className="hidden items-center gap-5 text-sm font-semibold text-[--color-text-primary] lg:flex xl:gap-7 xl:text-base">
              <a
                href="#home"
                onClick={(e) => handleSmoothScroll(e, "#home")}
                className="transition-colors hover:text-[--color-brand-primary]"
              >
                {dict.nav.home}
              </a>
              <Link
                href={`/${locale}/blog`}
                onClick={() => trackBlogClick()}
                className="transition-colors hover:text-[--color-brand-primary]"
              >
                {dict.nav.blog}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={handleToggle}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[--color-brand-primary] text-[--color-brand-primary] transition-colors hover:bg-[--color-brand-primary]/10 md:h-11 md:w-11 lg:hidden"
            >
              {isOpen ? <IconClose /> : <IconHamburger />}
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="flex items-center"
            >
              <Image
                src={logoMark}
                alt="Nopeca logo"
                width={140}
                height={140}
                className="h-9 w-auto object-contain md:h-13"
                priority
              />
            </a>
          </div>

          {/* Right: Lang toggle + WhatsApp + Get Started */}
          <div className="flex items-center justify-end gap-2 md:gap-3">
            {/* Language pill toggle with flags */}
            <div className="hidden items-center rounded-full border border-[--color-border-soft] bg-[--color-bg-primary]/60 p-0.5 sm:flex">
              <Link
                href={enHref}
                onClick={() => trackLanguageSwitch("en")}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all md:px-3 md:text-sm ${
                  locale === "en"
                    ? "bg-[--color-brand-primary] text-white shadow-sm"
                    : "text-[--color-text-secondary] hover:text-[--color-text-primary]"
                }`}
              >
                <span aria-hidden>{LOCALE_FLAGS.en}</span>
                <span>EN</span>
              </Link>
              <Link
                href={frHref}
                onClick={() => trackLanguageSwitch("fr")}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all md:px-3 md:text-sm ${
                  locale === "fr"
                    ? "bg-[--color-brand-primary] text-white shadow-sm"
                    : "text-[--color-text-secondary] hover:text-[--color-text-primary]"
                }`}
              >
                <span aria-hidden>{LOCALE_FLAGS.fr}</span>
                <span>FR</span>
              </Link>
            </div>

            {/* WhatsApp CTA */}
            <Link
              href="https://wa.me/213561799531"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("navbar")}
              className="hidden items-center justify-center rounded-full bg-[#25D366] p-2.5 transition hover:-translate-y-0.5 hover:shadow-lg md:inline-flex md:p-3"
              aria-label="Contact on WhatsApp"
            >
              <WhatsAppIcon />
            </Link>

            {/* Get Started → scrolls to contact/footer */}
            <a
              href="#contact"
              onClick={(e) => {
                handleSmoothScroll(e, "#contact");
                trackGetStartedClick("navbar");
              }}
              className="hidden rounded-full bg-[--color-brand-secondary] px-4 py-2 text-xs font-semibold tracking-wide text-white transition hover:-translate-y-0.5 hover:shadow-lg md:inline-flex md:px-5 md:py-2.5 md:text-sm"
            >
              {dict.nav.applyNow}
            </a>
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
              <div className="flex flex-col gap-1 text-sm font-semibold text-[--color-text-primary] md:gap-2 md:text-base">
                {/* Home */}
                <a
                  href="#home"
                  onClick={(e) => handleSmoothScroll(e, "#home")}
                  className="rounded-xl px-3 py-2.5 transition-colors hover:bg-[--color-bg-secondary]/40 hover:text-[--color-brand-primary] md:py-3"
                >
                  {dict.nav.home}
                </a>

                {/* Blog */}
                <Link
                  href={`/${locale}/blog`}
                  onClick={() => { handleClose(); trackBlogClick(); }}
                  className="rounded-xl px-3 py-2.5 transition-colors hover:bg-[--color-bg-secondary]/40 hover:text-[--color-brand-primary] md:py-3"
                >
                  {dict.nav.blog}
                </Link>

                <div className="mt-2 flex flex-col gap-2">
                  {/* Language toggle */}
                  <div className="flex items-center gap-2 rounded-xl border border-[--color-border-soft] p-1">
                    <Link
                      href={enHref}
                      onClick={() => { handleClose(); trackLanguageSwitch("en"); }}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition-all ${
                        locale === "en"
                          ? "bg-[--color-brand-primary] text-white"
                          : "text-[--color-text-secondary]"
                      }`}
                    >
                      <span>{LOCALE_FLAGS.en}</span>
                      <span>English</span>
                    </Link>
                    <Link
                      href={frHref}
                      onClick={() => { handleClose(); trackLanguageSwitch("fr"); }}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition-all ${
                        locale === "fr"
                          ? "bg-[--color-brand-primary] text-white"
                          : "text-[--color-text-secondary]"
                      }`}
                    >
                      <span>{LOCALE_FLAGS.fr}</span>
                      <span>Français</span>
                    </Link>
                  </div>

                  {/* WhatsApp */}
                  <Link
                    href="https://wa.me/213561799531"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { handleClose(); trackWhatsAppClick("navbar"); }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </Link>

                  {/* Get Started */}
                  <a
                    href="#contact"
                    onClick={(e) => {
                      handleSmoothScroll(e, "#contact");
                      trackGetStartedClick("navbar");
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-[--color-brand-secondary] px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-md transition hover:-translate-y-0.5 md:py-3 md:text-base"
                  >
                    {dict.nav.applyNow}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
