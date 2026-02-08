"use client";

import { motion } from "motion/react";
import ScrollReveal from "../ui/ScrollReveal";

export default function UniShowcaseSection() {
  const universities = [
    { id: 1, name: "University 1" },
    { id: 2, name: "University 2" },
    { id: 3, name: "University 3" },
    { id: 4, name: "University 4" },
    { id: 5, name: "University 5" },
    { id: 6, name: "University 6" },
  ];

  return (
    <section
      id="universities"
      className="flex w-full items-center overflow-hidden bg-[--color-brand-primary] px-4 py-12 md:py-20 lg:h-[80dvh] lg:max-h-[920px]"
    >
      <div className="mx-auto flex h-auto max-w-6xl flex-col gap-8 md:gap-12 lg:h-1/2 lg:flex-row lg:items-center lg:gap-6">
        {/* LEFT COLUMN - Header Content */}
        <ScrollReveal
          direction="left"
          className="flex w-full shrink-0 flex-col gap-6 md:gap-8 lg:w-[30%] lg:gap-12"
        >
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f5f0e8] px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0a1628]" />
            <span className="text-sm font-medium text-[#0a1628]">
              Why we are loved
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-balance text-3xl font-bold leading-tight text-[#f5f0e8] sm:text-4xl md:text-5xl">
            World&apos;s Top Education
          </h2>
        </ScrollReveal>

        {/* RIGHT COLUMN - University Cards Grid */}
        <div className="w-full flex-1 overflow-x-auto lg:overflow-visible">
          <motion.div
            className="flex gap-3 pb-4 sm:gap-4 lg:gap-4 lg:pb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {universities.map((uni) => (
              <motion.div
                key={uni.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex h-40 w-40 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/20 bg-white/10 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-[280px] lg:w-[280px] lg:text-lg"
              >
                {uni.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
