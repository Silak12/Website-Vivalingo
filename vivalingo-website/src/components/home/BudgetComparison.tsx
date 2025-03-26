import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Button from '../shared/Button';

interface BudgetItem {
  cost: number;
  description: string;
  icon: string;
}

const BudgetComparison: React.FC = () => {
  // Vivalingo budget is fixed at 200€
  const vivalingoBudget = 200;
  // Duolingo budget in millions
  const duolingoBudget = 70;
  
  // Animations references
  const duolingoContainerRef = useRef<HTMLDivElement>(null);
  const vivalingoContainerRef = useRef<HTMLDivElement>(null);
  
  // Toggle for "what I can buy" section
  const [showVivalingoItems, setShowVivalingoItems] = useState(false);
  
  // Animation for comparison containers
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Fun things Vivalingo can buy with their budget
  const vivalingoItems: BudgetItem[] = [
    { cost: 5, description: "A cup of coffee to fuel late-night coding", icon: "☕" },
    { cost: 15, description: "Premium domain for a month", icon: "🌐" },
    { cost: 25, description: "Stock photos that aren't obviously stock photos", icon: "📸" },
    { cost: 30, description: "A few hours of server time", icon: "🖥️" },
    { cost: 50, description: "A fancy dinner to celebrate a new feature", icon: "🍝" },
    { cost: 80, description: "Indie app store optimization service", icon: "📱" },
    { cost: 120, description: "Bug bounty for that critical issue", icon: "🐛" },
    { cost: 200, description: "A desperate attempt at micro-influencer marketing", icon: "📢" }
  ];
  
  // Ridiculous things Duolingo can buy with their budget
  const duolingoItems: BudgetItem[] = [
    { cost: 0.5, description: "A celebrity cameo in their ads", icon: "🌟" },
    { cost: 1, description: "Sponsorship of a mid-sized YouTube channel for a year", icon: "▶️" },
    { cost: 2, description: "A small billboard in Times Square for a month", icon: "🏙️" },
    { cost: 5, description: "Their owl mascot costume made of real feathers", icon: "🦉" },
    { cost: 10, description: "Naming rights to a minor league stadium", icon: "🏟️" },
    { cost: 20, description: "A Super Bowl commercial", icon: "🏈" },
    { cost: 30, description: "Their own satellite to beam language lessons from space", icon: "🛰️" },
    { cost: 50, description: "Lobbying to make their owl the national bird", icon: "🗳️" },
    { cost: 70, description: "Building a real-life owl-shaped headquarters", icon: "🏢" }
  ];
  
  // Format numbers with thousands separator
  const formatNumber = (num: number, inMillions = false) => {
    if (inMillions) {
      return `${num} million`;
    }
    return num.toLocaleString('en-US');
  };
  
  // Animated cash burn effect
  useEffect(() => {
    if (duolingoContainerRef.current) {
      const createMoneyBurn = () => {
        const money = document.createElement('div');
        money.className = 'absolute w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold';
        money.textContent = '€';
        
        // Random position at the bottom
        const left = Math.random() * 100;
        money.style.left = `${left}%`;
        money.style.bottom = '0';
        
        duolingoContainerRef.current?.appendChild(money);
        
        // Animation path
        gsap.to(money, {
          y: `-${Math.random() * 50 + 100}`,
          x: (Math.random() - 0.5) * 100,
          opacity: 0,
          duration: 2 + Math.random() * 2,
          ease: "power1.out",
          onComplete: () => money.remove()
        });
      };
      
      // Create money burning effect at intervals
      const interval = setInterval(createMoneyBurn, 300);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  // Coffee cup effect for Vivalingo
  useEffect(() => {
    if (vivalingoContainerRef.current && showVivalingoItems) {
      const coffeeAnimation = () => {
        const steam = document.createElement('div');
        steam.className = 'absolute text-sm opacity-80';
        steam.textContent = '~';
        
        // Position above the coffee cup
        steam.style.left = '25%';
        steam.style.bottom = '30%';
        
        vivalingoContainerRef.current?.appendChild(steam);
        
        // Steam rising animation
        gsap.to(steam, {
          y: -20,
          opacity: 0,
          duration: 2,
          ease: "power1.out",
          onComplete: () => steam.remove()
        });
      };
      
      const interval = setInterval(coffeeAnimation, 1000);
      
      return () => clearInterval(interval);
    }
  }, [showVivalingoItems]);
  
  // Calculate what percentage of Duolingo's budget is Vivalingo's
  const percentageOfDuolingo = (vivalingoBudget / (duolingoBudget * 1000000)) * 100;
  
  // This creates a human-understandable comparison
  const calculateComparison = (): string => {
    // Formats to a readable ridiculous comparison
    if (percentageOfDuolingo < 0.0001) {
      return `Duolingo spends your entire marketing budget every ${Math.round(86400 * 365 / (duolingoBudget * 1000000 / vivalingoBudget))} seconds`;
    } else if (percentageOfDuolingo < 0.001) {
      return `Duolingo spends your entire yearly marketing budget before their morning coffee`;
    } else {
      return `Duolingo spends your entire yearly marketing budget in less than a minute`;
    }
  };
  
  return (
    <section id="budget-comparison" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative">
     
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            The Ridiculous Marketing Budget Gap
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            David vs. Goliath? More like an ant vs. a space station. Here's what we're up against.
          </motion.p>
        </div>
        
        {/* Budget Size Visualization */}
        <div className="relative mb-16 max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-8">
              <div className="w-28 md:w-32 text-right pr-4 font-semibold">
                <span className="text-primary-400">Vivalingo</span>
              </div>
              
              {/* Vivalingo budget bar */}
              <div className="relative flex-grow h-8 bg-gray-700 rounded-r-full overflow-hidden flex items-center">
                <div 
                  className="h-full bg-primary-500 flex items-center justify-start pl-2"
                  style={{ width: `${Math.max(0.5, percentageOfDuolingo)}%` }}
                >
                  {percentageOfDuolingo > 3 ? `€${formatNumber(vivalingoBudget)}` : ''}
                </div>
                {percentageOfDuolingo <= 3 && (
                  <span className="ml-2 text-sm">{`€${formatNumber(vivalingoBudget)}`}</span>
                )}
                
                {/* Microscope icon for tiny budget */}
                <div className="absolute right-0 -top-8 text-primary-300 text-xl">
                  🔬
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs w-24 text-center">
                    Needs a microscope to see
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-28 md:w-32 text-right pr-4 font-semibold">
                <span className="text-green-400">Duolingo</span>
              </div>
              
              {/* Duolingo budget bar */}
              <div className="flex-grow h-8 bg-gray-700 rounded-r-full overflow-hidden flex items-center">
                <div 
                  className="h-full bg-green-500 pl-2 flex items-center"
                  style={{ width: '100%' }}
                >
                  €{formatNumber(duolingoBudget, true)}
                </div>
                
                {/* Money rain effect */}
                <div className="absolute right-0 -top-8 text-green-300 text-xl">
                  💰
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs w-24 text-center">
                    Money waterfall
                  </div>
                </div>
              </div>
            </div>
            
            {/* Humorous comparison */}
            <div className="mt-8 p-4 bg-gray-700 rounded-lg text-center">
              <p className="text-lg">
                {calculateComparison()}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Don't worry, we're doing just fine with our coffee budget.
              </p>
            </div>
          </div>
        </div>
        
        {/* What can you buy with these budgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vivalingo Budget */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
            ref={vivalingoContainerRef}
          >
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
              <span className="text-primary-400 mr-2">Vivalingo</span>
              <span className="text-lg">({formatNumber(vivalingoBudget)}€)</span>
            </h3>
            
            <p className="text-gray-300 mb-6">
              What we can do with our scrappy startup budget:
            </p>
            
            <Button 
              variant="primary" 
              size="md" 
              onClick={() => setShowVivalingoItems(!showVivalingoItems)}
              className="w-full mb-4"
            >
              {showVivalingoItems ? "Hide Items" : "Show What We Can Buy"}
            </Button>
            
            {showVivalingoItems && (
              <div className="space-y-3 mt-6 bg-gray-700 p-4 rounded-lg">
                {vivalingoItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center bg-gray-800 p-3 rounded"
                  >
                    <div className="text-2xl mr-3">{item.icon}</div>
                    <div className="flex-grow">
                      <div className="font-medium">{item.description}</div>
                      <div className="text-xs text-gray-400">{item.cost}€</div>
                    </div>
                    {item.cost === 5 && (
                      <div className="text-2xl animate-pulse">☕</div>
                    )}
                  </motion.div>
                ))}
                <div className="text-center text-sm text-gray-400 mt-2">
                  Budget spent: {vivalingoItems.reduce((sum, item) => sum + item.cost, 0)}€ of {vivalingoBudget}€
                </div>
              </div>
            )}
            
            {!showVivalingoItems && (
              <div className="opacity-60 text-center py-8">
                <div className="text-5xl mb-2">☕</div>
                <div className="text-sm">Click above to see what we can afford</div>
              </div>
            )}
            
            <div className="mt-6 text-sm text-gray-400">
              <p className="italic">"It's not about the money, it's about the passion." - Every bootstrapped founder ever</p>
            </div>
          </motion.div>
          
          {/* Duolingo Budget */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg overflow-hidden relative"
            ref={duolingoContainerRef}
          >
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
              <span className="text-green-400 mr-2">Duolingo</span>
              <span className="text-lg">({formatNumber(duolingoBudget, true)}€)</span>
            </h3>
            
            <p className="text-gray-300 mb-6">
              What they can do with their Silicon Valley money pit:
            </p>
            
            <div className="space-y-3 mt-2">
              {duolingoItems.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center bg-gray-700 p-3 rounded"
                >
                  <div className="text-2xl mr-3">{item.icon}</div>
                  <div className="flex-grow">
                    <div className="font-medium">{item.description}</div>
                    <div className="text-xs text-gray-400">{item.cost} million €</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 text-sm text-gray-400">
              <p className="italic">"When you have this much money, why not put your owl on the moon?" - Duolingo's marketing team, probably</p>
            </div>
            
            {/* Money burning effect container - GSAP will add elements here */}
          </motion.div>
        </div>
        
        {/* Final funny comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 mx-auto max-w-4xl"
        >
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-6">The Bottom Line</h3>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="bg-gray-700 p-4 rounded-lg flex-1">
                <div className="text-4xl mb-2">🦉</div>
                <h4 className="font-semibold text-green-400">Duolingo</h4>
                <p className="text-sm mt-2">Spends {formatNumber(Math.round(duolingoBudget * 1000000 / vivalingoBudget))} times more than us</p>
              </div>
              
              <div className="text-4xl font-bold text-gray-500">VS</div>
              
              <div className="bg-gray-700 p-4 rounded-lg flex-1">
                <div className="text-4xl mb-2">🚀</div>
                <h4 className="font-semibold text-primary-400">Vivalingo</h4>
                <p className="text-sm mt-2">We put our budget where it matters - in the product</p>
              </div>
            </div>
            
            <p className="mt-8 text-lg">
              They might have the money, but we have the <span className="text-primary-400 font-semibold">passion</span> and the <span className="text-primary-400 font-semibold">Birkenbihl method</span>.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              (And honestly, who needs a Super Bowl ad when you have a good product?)
            </p>
          </div>
        </motion.div>
      </div>
    
    </section>
  );
};

export default BudgetComparison;