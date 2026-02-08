"use client"
import React from 'react'
import ArcGalleryHero from '../ui/HeroSectionUI/arc-gallery-hero'
import img1 from '@/public/arc_gallery/image-gen (1).png'
import img3 from '@/public/arc_gallery/image-gen (3).png'
import img4 from '@/public/arc_gallery/image-gen (4).png'
import img5 from '@/public/arc_gallery/image-gen (5).png'
import img6 from '@/public/arc_gallery/image-gen (6).png'
import img12 from '@/public/arc_gallery/image-gen (12).png'
import img14 from '@/public/arc_gallery/image-gen (14).png'
import img15 from '@/public/arc_gallery/image-gen (15).png'
import img16 from '@/public/arc_gallery/image-gen (16).png'
import imgJpg from '@/public/arc_gallery/image-gen.jpg'

const HeroSection = () => {

const images = [
  
  

  img5,

  img12,
  
    img16,
    img3,
    img1,
  img14,
    img4,
    img6,
  img15,

  imgJpg,
];

  return (
    <section id="home" className="w-full max-h-[1120px] overflow-hidden ">
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
        className="pt-5 pb-5  2xl:pt-40 2xl:pb-40"
      />
      </div>
    </section>
  )
}

export default HeroSection
