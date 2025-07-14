import React from 'react';
import { PortfolioSection } from './PortfolioSection';

export const PortfolioPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-secondary mb-6">Your Portfolio</h1>
      <PortfolioSection />
    </div>
  );
};
