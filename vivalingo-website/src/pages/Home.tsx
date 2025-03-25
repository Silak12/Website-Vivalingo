import React from 'react';
import Hero from '../components/home/Hero';
import WordFlowAnimation from '../components/home/WordFlowAnimation';
import MethodFeatures from '../components/home/MethodFeatures';
import MethodDemo from '../components/home/MethodDemo';
import PricingSection from '../components/home/PricingSection';
import BudgetComparison from '../components/home/BudgetComparison';
import DownloadCTA from '../components/home/DownloadCTA';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <WordFlowAnimation />
      <MethodFeatures />
      <MethodDemo />
      <PricingSection />
      <BudgetComparison />
      <DownloadCTA />
    </>
  );
};

export default Home;