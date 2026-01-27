'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AnimatedVectorline from './animated-vector-line';
type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  // Responsive radius for all breakpoints
  radiusXl?: number;   // >= 1536px
  radiusLg?: number;   // 1280px - 1535px
  radiusMd?: number;   // 1024px - 1279px
  radiusSm?: number;   // 768px - 1023px
  radiusXs?: number;   // < 768px
  // Responsive card sizes
  cardSizeXl?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  cardSizeXs?: number;
  className?: string;
};

const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = -110,
  endAngle = 110,
  radiusXl = 420,
  radiusLg = 380,
  radiusMd = 280,
  radiusSm = 240,
  radiusXs = 280,
  cardSizeXl = 160,
  cardSizeLg = 140,
  cardSizeMd = 120,
  cardSizeSm = 100,
  cardSizeXs = 90,
  className = '',
}) => {
  const [dimensions, setDimensions] = useState({
    radius: radiusXl,
    cardSize: cardSizeXl,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let radius = radiusXl;
      let cardSize = cardSizeXl;

      if (width < 768) {
        radius = radiusXs;
        cardSize = cardSizeXs;
      } else if (width < 1024) {
        radius = radiusSm;
        cardSize = cardSizeSm;
      } else if (width < 1280) {
        radius = radiusMd;
        cardSize = cardSizeMd;
      } else if (width < 1536) {
        radius = radiusLg;
        cardSize = cardSizeLg;
      } else {
        radius = radiusXl;
        cardSize = cardSizeXl;
      }

      setDimensions({ radius, cardSize });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusXl, radiusLg, radiusMd, radiusSm, radiusXs, cardSizeXl, cardSizeLg, cardSizeMd, cardSizeSm, cardSizeXs]);

  const count = Math.max(images.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <section className={`relative  h-[90vh] max-h-[1120px] flex items-center  md:items-end    ${className}`}>
      <div className="relative flex-1 flex items-center justify-center md:items-end px-6  h-full">
        <div
          className="absolute -translate-y-[60%]  md:-translate-y-[20%] xl:-translate-y-[10%]  opacity-50 flex-1 flex items-center justify-center "
          style={{
            width: '100%',
            height: dimensions.radius,
          }}
        >
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
            {images.map((src, i) => {
              const angle = startAngle + step * i;
              const angleRad = (angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * dimensions.radius;
              const y = Math.sin(angleRad) * dimensions.radius;

              return (
                <div
                  key={i}
                  className="absolute opacity-0 animate-fade-in-up"
                  style={{
                    width: dimensions.cardSize,
                    height: dimensions.cardSize,
                    left: `calc(50% + ${x}px)`,
                    bottom: `${y}px`,
                    transform: `translate(-50%, 50%)`,
                    animationDelay: `${i * 100}ms`,
                    animationFillMode: 'forwards',
                    zIndex: count - i,
                  }}
                >
                  <div
                    className="rounded-2xl shadow-xl ring-1 ring-border bg-card transition-transform hover:scale-105 w-full h-full overflow-hidden"
                    style={{ transform: `rotate(${angle / 4}deg)` }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      draggable={false}
                      unoptimized
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center max-w-3xl px-6 opacity-0 animate-fade-in " style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <h1 className="text-[2.6rem] sm:text-5xl lg:text-[5.5rem] font-black tracking-tight text-foreground py-6">
            Unlock Your{" "}
            <span className="relative inline-block">
              Future Education
              <span className="pointer-events-none absolute right-0 -bottom-5 w-[60%] lg:-bottom-10">
                <AnimatedVectorline />
              </span>
            </span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground">
            Our templates eliminate the need for custom design, long feedback loops, and endless dev cycles — helping you go live in days, not weeks.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row">
            <button className="rounded-full bg-[--color-brand-secondary] px-10 py-3 text-base font-bold text-white sm:px-14 sm:py-4 sm:text-lg md:px-20 md:py-5 md:text-xl">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArcGalleryHero;