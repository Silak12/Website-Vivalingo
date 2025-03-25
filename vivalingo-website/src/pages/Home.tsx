import React from 'react';
import Hero from '../components/home/Hero';
import WordFlowAnimation from '../components/home/WordFlowAnimation';
import MethodFeatures from '../components/home/MethodFeatures';
import PricingSection from '../components/home/PricingSection';
import BudgetComparison from '../components/home/BudgetComparison';
import DownloadCTA from '../components/home/DownloadCTA';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <WordFlowAnimation />
      <MethodFeatures />
      <PricingSection />
      <BudgetComparison />
      <DownloadCTA />
    </>
  );
};

export default Home;