'use client';
import React, { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion } from 'motion/react';
import AnimatedVectorline from './animated-vector-line';

type ArcGalleryHeroProps = {
  images: Array<string | StaticImageData>;
  startAngle?: number;
  endAngle?: number;
  radiusXl?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  radiusXs?: number;
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
  const [canAnimate, setCanAnimate] = useState(false);

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

  useEffect(() => {
    const markReady = () => setCanAnimate(true);

    if (typeof window !== 'undefined') {
      if ((window as any).__appReady) {
        markReady();
      } else {
        window.addEventListener('app:ready', markReady, { once: true });
      }
    }

    return () => window.removeEventListener('app:ready', markReady);
  }, []);

  const count = Math.max(images.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <section className={`relative h-[90dvh] max-h-[1120px] flex items-center md:items-end ${className} `}>
      <div className="relative flex-1 flex items-center justify-center md:items-end h-full">
        <div
          className="absolute -translate-y-[10%] sm:-translate-y-[60%] md:-translate-y-[20%] xl:-translate-y-[10%]  flex-1 flex items-center justify-center translate-x-[-10%] lg:translate-x-[-5%]"
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
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: dimensions.cardSize,
                    height: dimensions.cardSize,
                    left: `calc(50% + ${x}px)`,
                    bottom: `${y}px`,
                    transform: `translate(-50%, 50%)`,
                    zIndex: count - i,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={canAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.5,
                    delay: canAnimate ? i * 0.1 : 0,
                    ease: 'easeOut',
                  }}
                >
                  <div
                    className="rounded-2xl shadow-xl ring-1 ring-border bg-card transition-transform hover:scale-105 w-full h-full overflow-hidden"
                    style={{ transform: `rotate(${angle / 10}deg)` }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 90px, (max-width: 1024px) 100px, (max-width: 1280px) 120px, (max-width: 1536px) 140px, 160px"
                      className="object-cover"
                      draggable={false}
                      priority={i < 4}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="text-center max-w-3xl px-6"
          initial={{ opacity: 0 }}
          animate={canAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: canAnimate ? 0.8 : 0, ease: 'easeOut' }}
        >
          <h1 className="text-[2.4rem] mt-20 leading-none sm:leading-normal sm:text-5xl lg:text-[5.5rem] font-black tracking-tight text-foreground py-6 ">
            Unlock Your{" "}
            <span className="relative inline-block text-nowrap ">
              Future Education
              <span className="pointer-events-none absolute right-0 -bottom-5 w-[60%] lg:-bottom-10">
                <AnimatedVectorline />
              </span>
            </span>
          </h1>
          <p className=" mt-4 leading-tight sm:leading-normal sm:mt-8 text-lg text-muted-foreground">
            Our templates eliminate the need for custom design, long feedback loops, and endless dev cycles — helping you go live in days, not weeks.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row">
            <button className="rounded-full bg-[--color-brand-secondary] px-10 py-3 text-base font-bold text-white sm:px-14 sm:py-4 sm:text-lg md:px-20 md:py-5 md:text-xl">Get Started</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArcGalleryHero;
