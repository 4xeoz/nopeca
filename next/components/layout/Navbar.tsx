"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import logoMark from "@/public/singl_logo_colord_white_background@4x.png";
import type { Dictionary } from "@/dictionaries";
import {
  trackGetStartedClick,
  trackLanguageSwitch,
  trackBlogClick,
  trackPhoneCall,
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
    <svg aria-hidden className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg aria-hidden className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.13 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.5v2.42z" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}


const CONTACTS = [
  { key: "phone1",   label: "0560 409 193", sublabel: "Call us", href: "tel:+213560409193", Icon: PhoneIcon, bg: "#0a1628", onTrack: () => trackPhoneCall("0560409193") },
  { key: "phone2",   label: "0560 409 195", sublabel: "Call us", href: "tel:+213560409195", Icon: PhoneIcon, bg: "#0a1628", onTrack: () => trackPhoneCall("0560409195") },
] as const;

function ContactDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Contact options"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4a84b] shadow-sm transition hover:bg-[#c49a3d] md:h-10 md:w-10"
      >
        <PhoneIcon className="h-4 w-4 text-white md:h-5 md:w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 flex min-w-[200px] flex-col gap-1 rounded-2xl border border-[--color-border-soft] bg-white p-2 shadow-xl"
          >
            {CONTACTS.map((c) => (
              <a
                key={c.key}
                href={c.href}
                onClick={() => { c.onTrack(); setOpen(false); }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[--color-bg-secondary]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: c.bg }}>
                  <c.Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-[--color-text-primary]/50 leading-none mb-0.5">{c.sublabel}</p>
                  <p className="text-sm font-semibold text-[--color-text-primary] leading-none">{c.label}</p>
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsOpen(false);
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  const handleToggle = () => setIsOpen((o) => !o);
  const handleClose = () => setIsOpen(false);

  const enHref = pathname.replace(`/${locale}`, "/en");
  const frHref = pathname.replace(`/${locale}`, "/fr");
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        <nav className="flex items-center justify-between gap-3 rounded-full border border-[--color-border-soft] bg-[--color-bg-secondary] px-3 py-2 shadow-xl shadow-black/10 backdrop-blur md:px-5 md:py-2.5">

          {/* LEFT: Logo */}
          <div className="flex shrink-0 items-center">
            {isHomePage ? (
              <a href="#home" onClick={(e) => handleSmoothScroll(e, "#home")} className="flex items-center">
                <Image src={logoMark} alt="Nopeca logo" width={140} height={140} className="h-8 w-auto object-contain md:h-11" priority />
              </a>
            ) : (
              <Link href={`/${locale}`} className="flex items-center">
                <Image src={logoMark} alt="Nopeca logo" width={140} height={140} className="h-8 w-auto object-contain md:h-11" priority />
              </Link>
            )}
          </div>

          {/* CENTER: Desktop nav links with active state */}
          <div className="hidden flex-1 items-center justify-center gap-1 text-sm font-semibold text-[--color-text-primary] lg:flex xl:gap-2 xl:text-base">
            {isHomePage ? (
              <a href="#home" onClick={(e) => handleSmoothScroll(e, "#home")} className="rounded-full px-4 py-2 transition-colors hover:text-[--color-brand-primary] bg-[--color-brand-primary]/10 text-[--color-brand-primary]">
                {dict.nav.home}
              </a>
            ) : (
              <Link href={`/${locale}`} className="rounded-full px-4 py-2 transition-colors text-[--color-text-primary] hover:text-[--color-brand-primary] hover:bg-[--color-brand-primary]/5">
                {dict.nav.home}
              </Link>
            )}
            <Link
              href={`/${locale}/universities`}
              className={`rounded-full px-4 py-2 transition-colors ${pathname.includes('/universities') ? 'bg-[--color-brand-primary]/10 text-[--color-brand-primary]' : 'text-[--color-text-primary] hover:text-[--color-brand-primary] hover:bg-[--color-brand-primary]/5'}`}
            >
              {dict.nav.universities}
            </Link>
            <Link
              href={`/${locale}/blog`}
              onClick={() => trackBlogClick()}
              className={`rounded-full px-4 py-2 transition-colors ${pathname.includes('/blog') ? 'bg-[--color-brand-primary]/10 text-[--color-brand-primary]' : 'text-[--color-text-primary] hover:text-[--color-brand-primary] hover:bg-[--color-brand-primary]/5'}`}
            >
              {dict.nav.blog}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={`rounded-full px-4 py-2 transition-colors ${pathname.includes('/contact') ? 'bg-[--color-brand-primary]/10 text-[--color-brand-primary]' : 'text-[--color-text-primary] hover:text-[--color-brand-primary] hover:bg-[--color-brand-primary]/5'}`}
            >
              {dict.nav.contact}
            </Link>
          </div>

          {/* RIGHT: Search + Quick actions + CTA + phone dropdown + hamburger */}
          <div className="flex items-center justify-end gap-1.5 md:gap-2">
            {/* Language pill toggle - Desktop only */}
            <div className="hidden items-center rounded-full border border-[--color-border-soft] bg-[--color-bg-primary]/60 p-0.5 sm:flex">
              <Link
                href={enHref}
                onClick={() => trackLanguageSwitch("en")}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all md:px-3 md:text-sm ${locale === "en" ? "bg-[--color-brand-primary] text-white shadow-sm" : "text-[--color-text-secondary] hover:text-[--color-text-primary]"}`}
              >
                <span aria-hidden>{LOCALE_FLAGS.en}</span><span className="hidden md:inline">EN</span>
              </Link>
              <Link
                href={frHref}
                onClick={() => trackLanguageSwitch("fr")}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all md:px-3 md:text-sm ${locale === "fr" ? "bg-[--color-brand-primary] text-white shadow-sm" : "text-[--color-text-secondary] hover:text-[--color-text-primary]"}`}
              >
                <span aria-hidden>{LOCALE_FLAGS.fr}</span><span className="hidden md:inline">FR</span>
              </Link>
            </div>

            {/* Get Started CTA */}
            <Link
              href={`/${locale}/contact`}
              onClick={() => trackGetStartedClick("navbar")}
              className="hidden rounded-full bg-[--color-brand-secondary] px-4 py-2 text-xs font-semibold tracking-wide text-white transition hover:-translate-y-0.5 hover:shadow-lg md:inline-flex md:px-5 md:py-2.5 md:text-sm"
            >
              {dict.nav.applyNow}
            </Link>

            {/* Phone dropdown */}
            <ContactDropdown />

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={handleToggle}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[--color-brand-primary] text-[--color-brand-primary] transition-colors hover:bg-[--color-brand-primary]/10 md:h-10 md:w-10 lg:hidden"
            >
              {isOpen ? <IconClose /> : <IconHamburger />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-3xl border border-[--color-border-soft] bg-[--color-bg-primary] p-4 shadow-2xl shadow-black/10 lg:hidden"
            >
              <div className="flex flex-col gap-3 text-sm font-semibold text-[--color-text-primary]">
                {/* Main Navigation Section */}
                <div>
                  <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[--color-text-secondary]">Navigation</p>
                  <div className="flex flex-col gap-1">
                    {isHomePage ? (
                      <a href="#home" onClick={(e) => handleSmoothScroll(e, "#home")} className="rounded-xl px-3 py-2.5 bg-[--color-brand-primary]/10 text-[--color-brand-primary]">
                        {dict.nav.home}
                      </a>
                    ) : (
                      <Link href={`/${locale}`} onClick={handleClose} className="rounded-xl px-3 py-2.5 text-[--color-text-primary] hover:bg-[--color-brand-primary]/5 hover:text-[--color-brand-primary]">
                        {dict.nav.home}
                      </Link>
                    )}
                    <Link href={`/${locale}/universities`} onClick={handleClose} className={`rounded-xl px-3 py-2.5 transition ${pathname.includes('/universities') ? 'bg-[--color-brand-primary]/10 text-[--color-brand-primary]' : 'text-[--color-text-primary] hover:bg-[--color-brand-primary]/5 hover:text-[--color-brand-primary]'}`}>
                      {dict.nav.universities}
                    </Link>
                    <Link href={`/${locale}/blog`} onClick={() => { handleClose(); trackBlogClick(); }} className={`rounded-xl px-3 py-2.5 transition ${pathname.includes('/blog') ? 'bg-[--color-brand-primary]/10 text-[--color-brand-primary]' : 'text-[--color-text-primary] hover:bg-[--color-brand-primary]/5 hover:text-[--color-brand-primary]'}`}>
                      {dict.nav.blog}
                    </Link>
                    <Link href={`/${locale}/contact`} onClick={handleClose} className={`rounded-xl px-3 py-2.5 transition ${pathname.includes('/contact') ? 'bg-[--color-brand-primary]/10 text-[--color-brand-primary]' : 'text-[--color-text-primary] hover:bg-[--color-brand-primary]/5 hover:text-[--color-brand-primary]'}`}>
                      {dict.nav.contact}
                    </Link>
                  </div>
                </div>

                {/* Language Section */}
                <div>
                  <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[--color-text-secondary]">Language</p>
                  <div className="flex items-center gap-2 rounded-xl border border-[--color-border-soft] p-1">
                    <Link href={enHref} onClick={() => { handleClose(); trackLanguageSwitch("en"); }} className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition ${locale === "en" ? "bg-[--color-brand-primary] text-white shadow-sm" : "text-[--color-text-secondary]"}`}>
                      <span>{LOCALE_FLAGS.en}</span><span>English</span>
                    </Link>
                    <Link href={frHref} onClick={() => { handleClose(); trackLanguageSwitch("fr"); }} className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition ${locale === "fr" ? "bg-[--color-brand-primary] text-white shadow-sm" : "text-[--color-text-secondary]"}`}>
                      <span>{LOCALE_FLAGS.fr}</span><span>Français</span>
                    </Link>
                  </div>
                </div>

                {/* Contact Section */}
                <div>
                  <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[--color-text-secondary]">Get in Touch</p>
                  <div className="flex flex-col gap-1.5">
                    {CONTACTS.map((c) => (
                      <a
                        key={c.key}
                        href={c.href}
                        onClick={() => { c.onTrack(); handleClose(); }}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[--color-bg-secondary]/40"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: c.bg }}>
                          <c.Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-[--color-text-primary]/50 leading-none mb-0.5">{c.sublabel}</p>
                          <p className="text-sm font-semibold leading-none">{c.label}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => { handleClose(); trackGetStartedClick("navbar"); }}
                  className="inline-flex items-center justify-center rounded-full bg-[--color-brand-secondary] px-5 py-3 text-sm font-semibold tracking-wide text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {dict.nav.applyNow}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
