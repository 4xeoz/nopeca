"use client";

import Image from "next/image";
import leftImg from "@/public/left.png";
import middleImg from "@/public/middle.jpg";
import rightImg from "@/public/right.png";
import ScrollReveal from "../ui/ScrollReveal";
import type { Dictionary } from "@/dictionaries";

interface WhyWeLovedSectionProps {
  dict: Dictionary;
}

export default function WhyWeLovedSection({ dict }: WhyWeLovedSectionProps) {
  return (
    <section
      id="why"
      className="relative flex w-full items-center justify-center overflow-hidden px-4 py-12 md:py-20 lg:h-dvh lg:max-h-[1120px]"
    >
      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center">
        <div className="grid h-full w-full grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3 lg:grid-rows-[0.9fr_1.5fr_0.9fr]">

          {/* HEADER SECTION - Badge + Main Heading */}
          <ScrollReveal
            className="flex flex-col items-center text-center lg:col-span-2 lg:items-start lg:text-left"
            duration={0.6}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm mb-4 md:mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d4a84b]" />
              <span className="text-sm font-medium text-[#0a1628]">{dict.why.badge}</span>
            </div>
            {/* Main Heading */}
            <h2 className="text-balance text-3xl font-black leading-tight text-[--color-brand-primary] sm:text-4xl md:text-5xl lg:max-w-xl">
              {dict.why.title}
            </h2>
          </ScrollReveal>

          {/* IMAGE CARD - RIGHT */}
          <ScrollReveal
            direction="right"
            delay={0.15}
            className="relative h-48 overflow-hidden rounded-xl sm:h-56 md:h-64 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:h-auto"
          >
            <Image
              src={rightImg}
              alt="Student experience"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#012340]/60" />
          </ScrollReveal>

          {/* IMAGE CARD - LEFT */}
          <ScrollReveal
            direction="left"
            delay={0.25}
            className="relative h-48 overflow-hidden rounded-xl sm:h-56 md:h-64 lg:col-start-1 lg:row-span-2 lg:row-start-2 lg:h-auto"
          >
            <Image
              src={leftImg}
              alt="Student journey"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#012340]/60" />
          </ScrollReveal>

          {/* IMAGE CARD - MIDDLE (Golden) */}
          <ScrollReveal
            delay={0.35}
            className="relative h-48 overflow-hidden rounded-xl sm:h-56 md:h-64 lg:col-start-2 lg:row-start-2 lg:h-auto"
          >
            <Image
              src={middleImg}
              alt="University life"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#d9b573]/60" />
          </ScrollReveal>

          {/* FOOTER SECTION - Secondary Heading */}
          <ScrollReveal
            delay={0.2}
            className="flex items-center justify-center text-center lg:col-span-2 lg:my-auto lg:justify-start lg:text-left"
          >
            <h3 className="text-balance text-2xl font-black leading-tight text-[color:var(--color-ink-deep)] sm:text-3xl md:text-4xl lg:text-5xl">
              {dict.why.subtitle}
            </h3>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
