"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { trackPhoneCall } from "@/lib/gtag";

// ─── Icons ────────────────────────────────────────────────────────────────────

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.13 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.5v2.42z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className={className}>
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  );
}

// ─── Contact options ──────────────────────────────────────────────────────────

const CONTACTS = [
  {
    key: "phone1",
    label: "0560 409 193",
    sublabel: "Call us",
    href: "tel:+213560409193",
    icon: PhoneIcon,
    bg: "#0f172a",
    iconColor: "text-[#d4a84b]",
    onTrack: () => trackPhoneCall("0560409193"),
  },
  {
    key: "phone2",
    label: "0560 409 195",
    sublabel: "Call us",
    href: "tel:+213560409195",
    icon: PhoneIcon,
    bg: "#0f172a",
    iconColor: "text-[#d4a84b]",
    onTrack: () => trackPhoneCall("0560409195"),
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const wiggleControls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Periodic attention-grab wiggle on the main button
  useEffect(() => {
    const runWiggle = async () => {
      if (isOpen) return;
      await wiggleControls.start({
        rotate: [0, -18, 18, -12, 12, -6, 6, 0],
        scale:  [1, 1.08, 1.08, 1.05, 1.05, 1.02, 1.02, 1],
        transition: { duration: 0.7, ease: "easeInOut" },
      });
    };

    // First wiggle after 3 s, then every 6 s
    const initial = setTimeout(runWiggle, 3000);
    intervalRef.current = setInterval(runWiggle, 6000);

    return () => {
      clearTimeout(initial);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen, wiggleControls]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3 md:right-6"
    >
      {/* Expanded contact options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            {CONTACTS.map((c, i) => (
              <motion.a
                key={c.key}
                href={c.href}
                onClick={() => { c.onTrack(); setIsOpen(false); }}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.2, delay: i * 0.06, ease: "easeOut" }}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 shadow-xl backdrop-blur-md transition-transform hover:-translate-x-1"
                style={{ backgroundColor: c.bg }}
              >
                {/* Icon bubble */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <c.icon className={`h-5 w-5 ${c.iconColor}`} />
                </div>
                {/* Labels */}
                <div className="pr-1">
                  <p className="text-xs font-medium text-white/60 leading-none mb-0.5">{c.sublabel}</p>
                  <p className="text-sm font-bold text-white leading-none">{c.label}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main trigger button */}
      <div className="relative">
        {/* Ripple rings — only when closed */}
        {!isOpen && (
          <>
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full bg-[#d4a84b]"
              animate={{ scale: [1, 2], opacity: [0.45, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full bg-[#d4a84b]"
              animate={{ scale: [1, 2], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />
          </>
        )}

        <motion.button
          animate={wiggleControls}
          onClick={() => setIsOpen((o: boolean) => !o)}
          aria-label="Contact us"
          className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl shadow-black/40 transition-shadow hover:shadow-[#d4a84b]/30 focus:outline-none md:h-16 md:w-16"
          style={{ backgroundColor: isOpen ? "#1a1a2e" : "#d4a84b" }}
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <CloseIcon className="h-5 w-5 text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="phone"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <PhoneIcon className="h-7 w-7 text-white md:h-8 md:w-8" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
