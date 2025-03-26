import React from 'react';
import Hero from '../components/home/Hero';
import WordFlowAnimation from '../components/home/WordFlowAnimation';
import MethodFeatures from '../components/home/MethodFeatures';
import MethodDemo from '../components/home/MethodDemo';
import PricingSection from '../components/home/PricingSection';
import BudgetComparison from '../components/home/BudgetComparison';
import DownloadCTA from '../components/home/DownloadCTA';
import DiscountSection from '../components/home/DiscountSection';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <WordFlowAnimation />
      <MethodFeatures />
      <DiscountSection />
      <PricingSection />
      <DownloadCTA />
    </>
  );
};

export default Home;