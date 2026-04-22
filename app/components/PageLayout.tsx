import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  includeFooter?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = '',
  includeFooter = true 
}) => {
  return (
    <>
      <Navigation />
      <main className={`pt-20 md:pt-24 ${className}`}>
        {children}
      </main>
      {includeFooter && <Footer />}
    </>
  );
};

export default PageLayout;