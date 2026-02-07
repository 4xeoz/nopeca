"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import logoMark from "@/public/singl_logo_colord_white_background@4x.png";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#why", label: "Why Nopeca" },
  { href: "#discover", label: "Discover" },
  { href: "#universities", label: "Universities" },
  { href: "#steps", label: "How it works" },
  { href: "#contact", label: "Contact" },
];

function IconHamburger() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
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
      className="h-5 w-5"
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only hide/show on desktop (md: 768px+)
    if (window.innerWidth < 768) {
      setHidden(false);
      return;
    }

    const direction = latest > lastY.current ? "down" : "up";
    // Hide when scrolling down past 80px, show when scrolling up
    if (direction === "down" && latest > 80) {
      setHidden(true);
    } else if (direction === "up") {
      setHidden(false);
    }
    lastY.current = latest;
  });

  const handleToggle = () => setIsOpen((open) => !open);
  const handleClose = () => setIsOpen(false);

  return (
    <motion.header
      className="sticky top-6 z-50"
      animate={{ y: hidden ? "-150%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-6 rounded-full border border-[--color-border-soft] bg-[--color-bg-secondary] px-4 py-3 shadow-xl shadow-black/10 backdrop-blur">
          <div className="flex items-center gap-4">
            <Image
              src={logoMark}
              alt="Nopeca logo"
              width={140}
              height={140}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>

          {/* <div className="hidden items-center gap-10 text-base font-semibold text-[--color-text-primary] md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-[--color-brand-primary]">
                {link.label}
              </Link>
            ))}
          </div> */}

          <div className="flex items-center gap-4">
            <Link
              href="#steps"
              className="hidden rounded-full bg-[--color-brand-secondary] px-6 py-3 text-base font-semibold tracking-wide text-white transition hover:-translate-y-0.5 hover:shadow-lg md:inline-flex"
            >
              Apply now
            </Link>
            <Link
              href="https://wa.me/213561799531"
              target="_blank"
              className="hidden items-center justify-center rounded-full bg-[--color-brand-secondary] p-3 transition hover:-translate-y-0.5 hover:shadow-lg md:inline-flex"
            >
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="white"
              >
                <path d="M12 2a10 10 0 0 0-8.66 15.06L2 22l5.11-1.31A10 10 0 1 0 12 2Zm5.24 14.31c-.22.62-1.3 1.19-1.85 1.27s-.44.41-2.91-.6-4.75-3.39-4.88-3.55-.73-1-.73-1.91.46-1.38.62-1.57.36-.24.49-.24.24 0 .35.01.26-.04.41.31.52 1.26.57 1.35.09.21 0 .34c-.09.13-.13.21-.26.33s-.27.28-.12.55.67 1.1 1.44 1.78 1.48.97 1.7 1.08.33.09.45-.05.52-.61.66-.82.27-.18.45-.11 1.17.55 1.37.65.32.15.37.23-.01.68-.23 1.3Z" />
              </svg>
            </Link>
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={handleToggle}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[--color-brand-primary] text-[--color-brand-primary] transition-colors hover:bg-[--color-brand-primary]/10 md:hidden"
            >
              {isOpen ? <IconClose /> : <IconHamburger />}
            </button>
          </div>
        </nav>

        {isOpen && (
          <div className="mt-3 rounded-[3rem] border border-[--color-border-soft] bg-[--color-bg-primary] p-5 shadow-2xl shadow-black/10 md:hidden">
            <div className="flex flex-col gap-3 text-base font-semibold text-[--color-text-primary]">
              {/* {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleClose}
                  className="rounded-xl px-3 py-3 transition-colors hover:bg-[--color-bg-secondary]/40 hover:text-[--color-brand-primary]"
                >
                  {link.label}
                </Link>
              ))} */}
              <div className="mt-2 flex flex-col gap-2">
                <Link
                  href="#steps"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center rounded-full bg-[--color-brand-secondary] px-5 py-3 text-base font-semibold tracking-wide text-white shadow-md transition hover:-translate-y-0.5"
                >
                  Apply now
                </Link>
                <Link
                  href="https://wa.me/213561799531"
                  target="_blank"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center rounded-full bg-[--color-brand-secondary] p-3 shadow-md transition hover:-translate-y-0.5"
                >
                  <svg
                    aria-hidden
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="white"
                  >
                    <path d="M12 2a10 10 0 0 0-8.66 15.06L2 22l5.11-1.31A10 10 0 1 0 12 2Zm5.24 14.31c-.22.62-1.3 1.19-1.85 1.27s-.44.41-2.91-.6-4.75-3.39-4.88-3.55-.73-1-.73-1.91.46-1.38.62-1.57.36-.24.49-.24.24 0 .35.01.26-.04.41.31.52 1.26.57 1.35.09.21 0 .34c-.09.13-.13.21-.26.33s-.27.28-.12.55.67 1.1 1.44 1.78 1.48.97 1.7 1.08.33.09.45-.05.52-.61.66-.82.27-.18.45-.11 1.17.55 1.37.65.32.15.37.23-.01.68-.23 1.3Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
}
