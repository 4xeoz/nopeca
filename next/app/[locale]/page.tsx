import React from 'react';
import HomePageWrapper from '@/components/layout/HomePageWrapper';
import HeroSection from '@/components/sections/HeroSection';
import AnimatedLogoBand from '@/components/sections/AnimatedLogoBand';
import WhyWeLovedSection from '@/components/sections/WhyWeLovedSection';
import DiscoverSection from '@/components/sections/DiscoverSection';
import UniShowcaseSection from '@/components/sections/UniShowcaseSection';
import RegistrationStepsSection from '@/components/sections/RegistrationStepsSection';
import Footer from '@/components/sections/Footer';

const HomePage = () => {
        {/* // AnimationLoaderComponent -- on its own needs full flexibity -- no layout constrains */}
        {/* // HomePageWrapperComponent -- needs to have full flexibity 
        //          HeaderNavBar -- inside each section parent div -- full width, child div constrained with max-width based on screen size
        //          HeroSection -- 
        //          AnimatedLogoBand -- 
        //          WhyWeLovedSection
        //          DiscoverSection
        //          UniShowcaseSection
        //          ResgistrationStepsSection
        //          Footer 
        // */}
  return (
    <HomePageWrapper>
      <HeroSection />
      <AnimatedLogoBand />
      <WhyWeLovedSection />
      <DiscoverSection />
      <UniShowcaseSection />
      <RegistrationStepsSection />
      <Footer />
    </HomePageWrapper>
  );
};

export default HomePage;