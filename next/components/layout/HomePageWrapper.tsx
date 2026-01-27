"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

interface HomePageWrapperProps {
  children: React.ReactNode;
}

export default function HomePageWrapper({ children }: HomePageWrapperProps) {
  const footerContainerRef = useRef(null);

  // Track scroll progress of the footer container
  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "start 0.3"], // Animation completes when 20% of component is visible
  });

  // Transform values: start → end (as scroll progresses 0 → 1)
  const margin = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [50, 0]); // 24px ≈ rounded-3xl
  const yTranslate = useTransform(scrollYProgress, [0, 1], [400, 0]);

  return (
    <div className="w-full bg-[--color-bg-primary] text-[--color-text-primary]">
      <Navbar />
      {children}

      {/* Animated Footer Container */}
      <div ref={footerContainerRef} className="overflow-hidden">
        <motion.div
          style={{
            margin,
            rotate,
            borderRadius,
            y: yTranslate,
          }}
          className="overflow-hidden"
        >
          <FooterSection />
        </motion.div>
      </div>
    </div>
  );
}
