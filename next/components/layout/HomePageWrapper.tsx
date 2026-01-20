import React from 'react';

interface HomePageWrapperProps {
  children: React.ReactNode;
}

export default function HomePageWrapper({ children }: HomePageWrapperProps) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}
