"use client"
import React from 'react'
import ArcGalleryHero from '../ui/HeroSectionUI/arc-gallery-hero'

const HeroSection = () => {

const images = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",


];

  return (
    <section className="w-full h-screen max-h-[1120px] bg-red-200 pt-16 ">
      <div className="max-w-7xl mx-auto  relative">
        <ArcGalleryHero
        images={images}
        startAngle={20}
        endAngle={160}
        radiusXl={560}
        radiusLg={560}
        radiusMd={550}
        radiusSm={490}
        cardSizeLg={150}
        cardSizeMd={140}
        cardSizeSm={140}
        className="pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-10 xl:pt-32 xl:pb-16 2xl:pt-40 2xl:pb-40 overflow-hidden"
      />
      </div>
    </section>
  )
}

export default HeroSection
