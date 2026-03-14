"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import ScrollReveal from "../ui/ScrollReveal";
import type { Dictionary } from "@/dictionaries";

const VIDEO_URL =
  "https://ugmzfzkyvnajamtfmzpk.supabase.co/storage/v1/object/public/public%20assets/school.mp4";
const MAPS_URL = "https://maps.google.com/?q=Boumerdes+Algeria";

const TRUST_ICONS = [
  // graduation cap
  <svg key="cap" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>,
  // calendar
  <svg key="cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>,
  // building
  <svg key="bld" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="4" y="2" width="16" height="20" rx="1" /><line x1="9" y1="22" x2="9" y2="12" /><line x1="15" y1="22" x2="15" y2="12" /><rect x="9" y="12" width="6" height="10" /><line x1="9" y1="7" x2="9.01" y2="7" /><line x1="15" y1="7" x2="15.01" y2="7" /><line x1="12" y1="7" x2="12.01" y2="7" /><line x1="12" y1="4" x2="12.01" y2="4" />
  </svg>,
];

interface VisitInstituteSectionProps {
  dict: Dictionary;
}

export default function VisitInstituteSection({ dict }: VisitInstituteSectionProps) {
  const [videoOpen, setVideoOpen] = useState(false);

  const thumbRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: thumbRef,
    offset: ["start end", "end start"],
  });
  const thumbY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const trustItems = [dict.visit.trust1, dict.visit.trust2, dict.visit.trust3];

  return (
    <section
      id="visit"
      className="relative w-full overflow-hidden bg-[--color-bg-primary] px-4 py-16 md:py-24"
    >
      {/* Subtle background arc decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-[#d9b573]/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[#012340]/6 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">

        {/* ─── LEFT: Text content ─── */}
        <div className="flex flex-col gap-6">

          {/* Badge */}
          <ScrollReveal duration={0.5}>
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#d4a84b]" />
              <span className="text-sm font-semibold tracking-wide text-[#0a1628]">
                {dict.visit.badge}
              </span>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={0.1} duration={0.6}>
            <h2 className="text-balance text-4xl font-black leading-tight text-[--color-brand-primary] sm:text-5xl lg:text-6xl">
              {dict.visit.title}{" "}
              <span className="relative inline-block text-[#d4a84b]">
                {dict.visit.titleHighlight}
                {/* Underline brush stroke */}
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 6 C50 2, 100 7, 198 4"
                    stroke="#d4a84b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </span>
            </h2>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={0.2} duration={0.6}>
            <p className="max-w-md text-base leading-relaxed text-[--color-text-muted] sm:text-lg">
              {dict.visit.subtitle}
            </p>
          </ScrollReveal>

          {/* Trust badges */}
          <ScrollReveal delay={0.3} duration={0.6}>
            <div className="flex flex-wrap gap-3">
              {trustItems.map((label, i) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-[#012340] shadow-sm ring-1 ring-[#012340]/8"
                >
                  <span className="text-[#d4a84b]">{TRUST_ICONS[i]}</span>
                  {label}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Office hours */}
          <ScrollReveal delay={0.35} duration={0.6}>
            <div className="flex w-fit items-center gap-2.5 rounded-xl bg-[#012340]/5 px-4 py-2.5 text-sm font-medium text-[#012340]">
              {/* clock icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-[#d4a84b]">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {dict.visit.hours}
            </div>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.4} duration={0.6}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary: play video */}
              <button
                onClick={() => setVideoOpen(true)}
                className="group flex items-center gap-2.5 rounded-xl bg-[#012340] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#012340]/85 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {/* play icon */}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d4a84b]/20 transition-colors group-hover:bg-[#d4a84b]/30">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[#d4a84b] translate-x-0.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </span>
                {dict.visit.primaryCta}
              </button>

              {/* Secondary: directions */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-[#012340]/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#012340] shadow-sm transition-all duration-200 hover:border-[#012340]/30 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                {/* map pin icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#d4a84b]">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {dict.visit.secondaryCta}
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* ─── RIGHT: Video thumbnail ─── */}
        <ScrollReveal direction="right" delay={0.15} duration={0.7} className="relative">

          {/* Main video card */}
          <div
            ref={thumbRef}
            className="relative mx-auto aspect-[9/16] w-full max-w-[300px] cursor-pointer overflow-hidden rounded-3xl shadow-2xl lg:mx-0 lg:max-w-none"
            onClick={() => setVideoOpen(true)}
          >
            {/* Parallax video preview */}
            <motion.div
              style={{ y: thumbY }}
              className="absolute inset-[-12%]"
            >
              <video
                src={VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Subtle bottom gradient for location tag readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={() => setVideoOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-2 ring-white/30 transition-all duration-300 hover:bg-white/25 hover:ring-white/50"
                aria-label="Play video"
              >
                {/* Outer pulse ring */}
                <span className="absolute -inset-3 animate-ping rounded-full bg-white/10" />
                {/* Inner pulse ring */}
                <span className="absolute -inset-1.5 animate-pulse rounded-full bg-white/10" />
                {/* Play icon */}
                <svg viewBox="0 0 24 24" fill="white" className="relative h-8 w-8 translate-x-1">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </motion.button>
            </div>

            {/* Location tag — bottom left */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 backdrop-blur-md ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d4a84b]">
                <svg viewBox="0 0 24 24" fill="white" className="h-3.5 w-3.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" fill="#012340" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold leading-none text-white">{dict.visit.locationLabel}</p>
                <p className="mt-0.5 text-[10px] leading-none text-white/70">{dict.visit.locationSub}</p>
              </div>
            </a>

            {/* "Watch our story" label — top right */}
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[#d4a84b] px-3 py-1.5">
              <span className="text-xs font-bold text-[#012340]">▶ Notre Institut</span>
            </div>
          </div>

          {/* Floating decorative card — bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="absolute -bottom-5 -right-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 md:-right-6"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#012340]/8">
              <svg viewBox="0 0 24 24" fill="none" stroke="#012340" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-black text-[#012340]">500+ Students</p>
              <p className="text-xs text-[--color-text-muted]">Successfully placed</p>
            </div>
          </motion.div>

        </ScrollReveal>
      </div>

      {/* ─── Video Lightbox Modal ─── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative"
              style={{ maxHeight: "85vh", aspectRatio: "9/16" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -right-2 -top-12 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/20 transition-colors hover:bg-white/25"
                aria-label="Close video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="h-4 w-4">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Vertical video player */}
              <video
                key={videoOpen ? "open" : "closed"}
                src={VIDEO_URL}
                controls
                autoPlay
                playsInline
                className="h-full w-full rounded-2xl bg-black shadow-2xl"
                style={{ maxHeight: "85vh" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
