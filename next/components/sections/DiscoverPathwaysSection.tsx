"use client";

import Image from "next/image";
import studentsImg from "@/public/students-university.png";
import ScrollReveal from "../ui/ScrollReveal";

export default function DiscoverPathwaysSection() {
  return (
    <section className="relative flex w-full items-stretch justify-center overflow-hidden bg-[#f5f0e8] px-4 py-12 md:py-20 lg:h-dvh lg:max-h-[1120px]">
      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {/* Vertical stripes */}
        <div className="absolute inset-0 flex justify-between px-16">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-full w-px bg-[color:var(--color-stripe-wisp-60)]"
            />
          ))}
        </div>

        {/* Decorative arcs - Left */}
        <svg
          className="absolute -left-32 top-0 h-[600px] w-[600px] opacity-40"
          viewBox="0 0 600 600"
          fill="none"
        >
          <path
            d="M-100 600 C 100 400, 300 200, 600 100"
            stroke="var(--color-accent-arc)"
            strokeWidth="120"
            fill="none"
          />
        </svg>

        {/* Decorative arcs - Right */}
        <svg
          className="absolute -right-32 bottom-0 h-[500px] w-[500px] opacity-30"
          viewBox="0 0 500 500"
          fill="none"
        >
          <path
            d="M500 -50 C 400 150, 200 300, -50 400"
            stroke="var(--color-accent-arc)"
            strokeWidth="100"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative mx-auto h-auto w-full max-w-6xl">
        <div className="grid h-full grid-cols-1 items-stretch gap-6 md:gap-8 lg:grid-cols-[40%_1fr]">

          {/* LEFT COLUMN - White Card (slides from left) */}
          <ScrollReveal
            direction="left"
            duration={0.7}
            className="flex h-full flex-col rounded-3xl bg-white p-6 sm:p-8 lg:p-12"
          >
            {/* Badge */}
            <div className="mx-auto mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#f5f0e8] px-4 py-2 md:mb-8">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0a1628]" />
              <span className="text-sm font-medium text-[#0a1628]">
                Why we are loved
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-balance text-center text-3xl font-black leading-tight text-[#0a1628] sm:text-4xl md:text-5xl">
              Discover your pathways
            </h2>

            {/* Spacer */}
            <div className="hidden flex-1 lg:block" />

            {/* CTA Button */}
            <button
              type="button"
              className="mt-6 w-full rounded-full bg-[#d4a84b] px-8 py-3 text-base font-medium text-white transition-colors hover:bg-[#c49a3d] sm:py-4 sm:text-lg md:mt-8 lg:mt-0"
            >
              Next Step
            </button>
          </ScrollReveal>

          {/* RIGHT COLUMN - Image with Overlapping Cards (slides from right) */}
          <ScrollReveal
            direction="right"
            delay={0.15}
            duration={0.7}
            className="relative h-64 sm:h-80 md:h-96 lg:h-auto"
          >
            {/* Main image container */}
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <Image
                src={studentsImg}
                alt="Students walking towards historic university building"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* OVERLAPPING CARDS */}
            <div className="absolute bottom-3 right-3 flex flex-col gap-2 sm:bottom-4 sm:right-4 sm:gap-3 md:gap-4">
              {/* White card */}
              <div className="h-24 w-32 rounded-xl bg-white sm:h-28 sm:w-40 md:h-32 md:w-48 lg:h-[160px] lg:w-[280px] lg:rounded-2xl" />
              {/* Gold card */}
              <div className="h-24 w-32 rounded-xl bg-[#d4a84b] sm:h-28 sm:w-40 md:h-32 md:w-48 lg:h-[160px] lg:w-[280px] lg:rounded-2xl" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
