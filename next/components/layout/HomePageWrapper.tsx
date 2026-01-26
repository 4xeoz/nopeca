import React from 'react';
import Navbar from './Navbar';
import FooterSection from './FooterSection';

interface HomePageWrapperProps {
  children: React.ReactNode;
}

export default function HomePageWrapper({ children }: HomePageWrapperProps) {
  return (
    <div className="w-full bg-white text-[--color-text-primary]">
      <Navbar />
      {children}
      <FooterSection />
    </div>
  );
}
