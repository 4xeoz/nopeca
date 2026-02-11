import React from 'react';
import HomePageWrapper from '@/components/layout/HomePageWrapper';
import HeroSection from '@/components/sections/HeroSection';
import AnimatedLogoBand from '@/components/sections/AnimatedLogoBand';
import WhyWeLovedSection from '@/components/sections/WhyWeLovedSection';
import UniShowcaseSection from '@/components/sections/UniShowcaseSection';
import RegistrationStepsSection from '@/components/sections/RegistrationStepsSection';
import DiscoverPathwaysSection from '@/components/sections/DiscoverPathwaysSection';
import BlogSection from '@/components/sections/BlogSection';
import JsonLd from '@/components/seo/JsonLd';
import { getDictionary } from '@/dictionaries';
import type { Locale } from '@/i18n.config';

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <JsonLd locale={locale} dict={dict} />
      <HomePageWrapper locale={locale} dict={dict}>
        <HeroSection />
        <AnimatedLogoBand />
        <WhyWeLovedSection dict={dict} />
        <DiscoverPathwaysSection dict={dict} />
        <UniShowcaseSection dict={dict} />
        <BlogSection locale={locale} />
        <RegistrationStepsSection dict={dict} />
      </HomePageWrapper>
    </>
  );
}
