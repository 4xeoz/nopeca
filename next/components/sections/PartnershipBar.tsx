"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dictionary } from "@/dictionaries";

// Inline SVG recreation of the Advanced Pathways Campus logo
// Used as fallback if the PNG file is not yet placed at /advanced-pathways-campus-logo.png
function APCLogoSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 80"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Advanced Pathways Campus"
      role="img"
    >
      {/* Gate / arch icon */}
      {/* Outer arch — slate blue */}
      <path
        d="M12 68 Q12 20 32 20 Q52 20 52 68"
        fill="none"
        stroke="#8fa3bc"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* Inner arch — navy */}
      <path
        d="M20 68 Q20 30 32 30 Q44 30 44 68"
        fill="none"
        stroke="#012340"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* 4-pointed star — gold */}
      <g transform="translate(32, 14)">
        <polygon
          points="0,-7 1.5,-1.5 7,0 1.5,1.5 0,7 -1.5,1.5 -7,0 -1.5,-1.5"
          fill="#d4a84b"
        />
      </g>

      {/* "ADVANCED" */}
      <text x="68" y="28" fontFamily="'Arial', sans-serif" fontWeight="800" fontSize="15" fill="#012340" letterSpacing="1.5">
        ADVANCED
      </text>
      {/* "PATHWAYS" */}
      <text x="68" y="48" fontFamily="'Arial', sans-serif" fontWeight="800" fontSize="15" fill="#012340" letterSpacing="1.5">
        PATHWAYS
      </text>
      {/* "CAMPUS" */}
      <text x="68" y="67" fontFamily="'Arial', sans-serif" fontWeight="800" fontSize="15" fill="#d4a84b" letterSpacing="2">
        CAMPUS
      </text>
    </svg>
  );
}

interface PartnershipBarProps {
  dict: Dictionary;
}

const BENEFITS = [
  { key: "benefit1" as const, icon: "✦" },
  { key: "benefit2" as const, icon: "✦" },
  { key: "benefit3" as const, icon: "✦" },
];

export default function PartnershipBar({ dict }: PartnershipBarProps) {
  const t = dict.partnership;
  const [imgError, setImgError] = useState(false);

  return (
    <section
      className="w-full bg-white border-b border-[#E8E4DD]"
      aria-label={t.label}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">

          {/* Left: label + logo */}
          <div className="flex items-center gap-4 sm:gap-5">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8195a6] whitespace-nowrap leading-none">
              {t.label}
            </span>

            {/* Thin vertical rule between label and logo */}
            <span className="hidden sm:block w-px h-5 bg-[#E8E4DD] flex-shrink-0" />

            {/* Logo — PNG file preferred, SVG inline fallback */}
            <a
              href="https://advancedpathwayscampus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand-secondary] rounded"
              aria-label="Advanced Pathways Campus website"
            >
              {!imgError ? (
                <Image
                  src="/advanced-pathways-campus-logo.png"
                  alt="Advanced Pathways Campus"
                  width={172}
                  height={44}
                  className="h-8 sm:h-9 w-auto object-contain"
                  onError={() => setImgError(true)}
                  priority
                />
              ) : (
                <APCLogoSVG className="h-9 sm:h-10 w-auto" />
              )}
            </a>
          </div>

          {/* Vertical divider — desktop only */}
          <span className="hidden sm:block w-px self-stretch bg-[#E8E4DD] mx-8 flex-shrink-0" />

          {/* Right: 3 micro-benefits */}
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7 list-none m-0 p-0">
            {BENEFITS.map(({ key, icon }) => (
              <li key={key} className="flex items-center gap-1.5 min-h-[44px] sm:min-h-0">
                <span
                  className="text-[--color-brand-secondary] text-[9px] flex-shrink-0"
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <span className="text-[13px] text-[#444444] font-medium leading-tight">
                  {t[key]}
                </span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
