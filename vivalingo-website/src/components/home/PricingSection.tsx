import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../shared/Button';
import WaveDivider from '../shared/WaveDivider';

const PricingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'monthly' | 'yearly' | 'lifetime'>('monthly');

  // Dynamic pricing content based on active tab
  const getPricingDetails = () => {
    switch(activeTab) {
      case 'monthly':
        return {
          price: '2.99',
          period: 'month',
          savings: '',
          features: [
            'Full access to all languages',
            'Unlimited audio control',
            'All Birkenbihl method features',
            'Multiple language switching',
            'Ad-free experience'
          ]
        };
      case 'yearly':
        return {
          price: '12.99',
          period: 'year',
          savings: 'Save 64% compared to monthly',
          features: [
            'Everything in monthly plan',
            'Priority customer support',
            'Early access to new languages',
            'Downloadable content for offline use',
            'Advanced progress tracking'
          ]
        };
      case 'lifetime':
        return {
          price: '49.99',
          period: 'one-time payment',
          savings: 'Best value - No recurring payments',
          features: [
            'Everything in yearly plan',
            'Future language packs included',
            'All future app updates',
            'Premium learning resources',
            'Priority feature requests'
          ]
        };
      default:
        return {
          price: '2.99',
          period: 'month',
          savings: '',
          features: []
        };
    }
  };

  const details = getPricingDetails();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="pricing" className="py-20 bg-white relative">
      {/* Top wave animation */}
      <WaveDivider 
        position="top" 
        color="#ffffff" 
        height={80}
        style="gentle-wave" // Or any other style you prefer
        opacity={0.2} // Optional: control transparency
      />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Simple & Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Choose the plan that works best for you. All plans include a 7-day free trial with full access to all features. Cancel anytime.
          </motion.p>
        </div>
        
        {/* Pricing Tabs */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-gray-100 p-1 rounded-full flex items-center">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`flex-1 py-2 rounded-full text-center transition-all duration-300 ${
                activeTab === 'monthly' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveTab('yearly')}
              className={`flex-1 py-2 rounded-full text-center transition-all duration-300 relative ${
                activeTab === 'yearly' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              <span className="flex flex-col items-center justify-center">
                <span>Yearly</span>
                <span className={`text-xs font-medium ${activeTab === 'yearly' ? 'text-white/80' : 'text-green-600'}`}>Save 64%</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('lifetime')}
              className={`flex-1 py-2 rounded-full text-center transition-all duration-300 relative ${
                activeTab === 'lifetime' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              <span className="flex flex-col items-center justify-center">
                <span>Lifetime</span>
                <span className={`text-xs font-medium ${activeTab === 'lifetime' ? 'text-white/80' : 'text-yellow-600'}`}>Best value</span>
              </span>
            </button>
          </div>
        </div>
        
        {/* Main Pricing Card */}
        <motion.div
          key={activeTab} // This forces re-render and animation when tab changes
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-primary-100 mb-12"
        >
          {/* Card Header */}
          <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-8 text-white">
            {activeTab === 'lifetime' && (
              <div className="absolute top-0 right-0 bg-yellow-400 text-primary-900 font-bold px-4 py-2 rounded-bl-lg flex items-center">
                <span className="mr-1">👑</span> BEST VALUE
              </div>
            )}
            {activeTab === 'yearly' && (
              <div className="absolute top-0 right-0 bg-green-400 text-green-900 font-bold px-4 py-2 rounded-bl-lg flex items-center">
                <span className="mr-1">⭐</span> POPULAR
              </div>
            )}
            
            <h3 className="text-xl font-bold mb-2 flex items-center">
              {activeTab === 'monthly' && 'Monthly Access'}
              {activeTab === 'yearly' && 'Yearly Access'}
              {activeTab === 'lifetime' && 'Lifetime Access'}
            </h3>
            
            <div className="flex items-baseline">
              <span className="text-5xl font-bold">€{details.price}</span>
              <span className="ml-2 text-lg opacity-90">/{details.period}</span>
            </div>
            
            {details.savings && (
              <div className="mt-2 inline-block bg-white/20 rounded-full px-3 py-1 text-sm">
                {details.savings}
              </div>
            )}
          </div>
          
          {/* Card Body */}
          <div className="p-8">
            <div className="mb-6">
              <div className="text-lg font-semibold mb-2 text-gray-800">All plans include:</div>
              <motion.ul 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {details.features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    variants={itemVariants}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                      <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="font-medium text-gray-800 mb-2">🎁 7-day free trial</div>
              <p className="text-sm text-gray-600">Try all features with no commitment. Cancel anytime before the trial ends.</p>
            </div>
            
            <div className="flex flex-col space-y-4">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full flex items-center justify-center"
                icon={<span className="mr-2">📱</span>}
              >
                Download App & Try For Free
              </Button>
              
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1 flex items-center justify-center"
                  icon={<span className="mr-2">🍎</span>}
                >
                  App Store
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1 flex items-center justify-center"
                  icon={<span className="mr-2">🤖</span>}
                >
                  Play Store
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Additional Benefits */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-xl"
          >
            <div className="text-primary-500 mb-4 flex justify-center">
              <span className="text-4xl">🌎</span>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Multiple Languages</h3>
            <p className="text-gray-600 text-center text-sm">
              Learn Spanish, French, German, Italian, and more with a single subscription.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-xl"
          >
            <div className="text-primary-500 mb-4 flex justify-center">
              <span className="text-4xl">🔊</span>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Birkenbihl Method</h3>
            <p className="text-gray-600 text-center text-sm">
              Learn languages naturally without grammar drills, using your brain's innate language acquisition.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-xl"
          >
            <div className="text-primary-500 mb-4 flex justify-center">
              <span className="text-4xl">🛡️</span>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">No Hidden Fees</h3>
            <p className="text-gray-600 text-center text-sm">
              Transparent pricing with no unexpected charges. The price you see is what you pay.
            </p>
          </motion.div>
        </div>
        
        {/* FAQ Teaser */}
        <div className="text-center mt-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-600"
          >
            Have questions about our pricing? Check our <span className="text-primary-500 font-medium">FAQ section</span> or contact our support team.
          </motion.p>
        </div>
      </div>
      
      {/* Bottom wave animation */}
      <WaveDivider 
        position="bottom" 
        color="#1f2937" 
        height={80} 
        className="mt-12" 
      />
    </section>
  );
};

export default PricingSection;