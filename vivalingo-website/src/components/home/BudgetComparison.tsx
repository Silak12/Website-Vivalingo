import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Button from '../shared/Button';
import AnimatedText from '../shared/AnimatedText';

interface BudgetItem {
  cost: number;
  description: string;
  icon: string;
}

const BudgetComparison: React.FC = () => {
  // VivaLaLingo budget is fixed at 200€
  const VivaLaLingoBudget = 200;
  // Duolingo budget in millions
  const duolingoBudget = 70;
  
  // Refs for animations
  const circleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const duolingoContainerRef = useRef<HTMLDivElement>(null);
  const VivaLaLingoContainerRef = useRef<HTMLDivElement>(null);
  
  // Toggle for "what I can buy" section
  const [showVivaLaLingoItems, setShowVivaLaLingoItems] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Fun things VivaLaLingo can buy with their budget
  const VivaLaLingoItems: BudgetItem[] = [
    { cost: 5, description: "A cup of coffee to fuel late-night coding", icon: "☕" },
    { cost: 15, description: "Premium domain for a month", icon: "🌐" },
    { cost: 25, description: "Stock photos that aren't obviously stock photos", icon: "📸" },
    { cost: 30, description: "A few hours of server time", icon: "🖥️" },
    { cost: 50, description: "A fancy dinner to celebrate a new feature", icon: "🍝" },
    { cost: 80, description: "Indie app store optimization service", icon: "📱" },
  ];
  
  // Ridiculous things Duolingo can buy with their budget
  const duolingoItems: BudgetItem[] = [
    { cost: 0.5, description: "A celebrity cameo in their ads", icon: "🌟" },
    { cost: 1, description: "Sponsorship of a mid-sized YouTube channel for a year", icon: "▶️" },
    { cost: 2, description: "A small billboard in Times Square for a month", icon: "🏙️" },
    { cost: 5, description: "Their owl mascot costume made of real feathers", icon: "🦉" },
    { cost: 10, description: "Naming rights to a minor league stadium", icon: "🏟️" },
    { cost: 20, description: "A Super Bowl commercial", icon: "🏈" },
    { cost: 50, description: "Their own satellite to beam language lessons from space", icon: "🛰️" },
  ];
  
  // Format numbers with thousands separator
  const formatNumber = (num: number, inMillions = false) => {
    if (inMillions) {
      return `${num} million`;
    }
    return num.toLocaleString('en-US');
  };
  
  // Enhanced background effects and parallax
  useEffect(() => {
    if (circleRef.current) {
      // Initialize enhanced GSAP animation for background circles
      gsap.fromTo(
        circleRef.current,
        {
          scale: 0.9,
          opacity: 0.6,
        },
        {
          scale: 1.1,
          opacity: 0.8,
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      );
    }
  }, []);
  
  // Create floating particles
  useEffect(() => {
    if (particlesRef.current) {
      // Create particles
      const particlesContainer = particlesRef.current;
      const numberOfParticles = window.innerWidth < 768 ? 4 : 8;
      
      // Clear existing particles
      particlesContainer.innerHTML = '';
      
      for (let i = 0; i < numberOfParticles; i++) {
        // Create a particle
        const particle = document.createElement('div');
        
        // Random size
        const size = Math.random() * 10 + 3;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Apply styles with pointer-events-none to ensure they don't interfere with interactions
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.pointerEvents = 'none';
        
        // Add to container
        particlesContainer.appendChild(particle);
        
        // Animate with GSAP
        gsap.to(particle, {
          y: '-=30',
          x: `+=${Math.random() * 20 - 10}`,
          opacity: 0,
          duration: 6 + Math.random() * 6,
          ease: 'power1.out',
          repeat: -1,
          repeatRefresh: true,
          delay: Math.random() * 4
        });
      }
    }
  }, []);
  
  // Animated cash burn effect - simplified
  useEffect(() => {
    if (duolingoContainerRef.current) {
      const createMoneyBurn = () => {
        const money = document.createElement('div');
        money.className = 'absolute w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white font-bold pointer-events-none';
        money.textContent = '€';
        
        // Random position at the bottom
        const left = Math.random() * 100;
        money.style.left = `${left}%`;
        money.style.bottom = '0';
        
        duolingoContainerRef.current?.appendChild(money);
        
        // Animation path
        gsap.to(money, {
          y: `-${Math.random() * 40 + 60}`,
          x: (Math.random() - 0.5) * 40,
          opacity: 0,
          duration: 2 + Math.random() * 2,
          ease: "power1.out",
          onComplete: () => {
            if (duolingoContainerRef.current?.contains(money)) {
              money.remove();
            }
          }
        });
      };
      
      // Create money burning effect at intervals - less frequent
      const interval = setInterval(createMoneyBurn, 1000);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  // Coffee cup effect for VivaLaLingo - simplified version
  useEffect(() => {
    if (VivaLaLingoContainerRef.current && showVivaLaLingoItems) {
      const coffeeAnimation = () => {
        const steam = document.createElement('div');
        steam.className = 'absolute text-sm opacity-80 pointer-events-none';
        steam.textContent = '~';
        
        // Position above the coffee cup
        steam.style.left = '10%';
        steam.style.top = '40%';
        
        VivaLaLingoContainerRef.current?.appendChild(steam);
        
        // Steam rising animation
        gsap.to(steam, {
          y: -10,
          opacity: 0,
          duration: 2,
          ease: "power1.out",
          onComplete: () => {
            if (VivaLaLingoContainerRef.current?.contains(steam)) {
              steam.remove();
            }
          }
        });
      };
      
      const interval = setInterval(coffeeAnimation, 2000);
      
      return () => clearInterval(interval);
    }
  }, [showVivaLaLingoItems]);
  
  // Calculate what percentage of Duolingo's budget is VivaLaLingo's
  const percentageOfDuolingo = (VivaLaLingoBudget / (duolingoBudget * 1000000)) * 100;
  
  // This creates a human-understandable comparison
  const calculateComparison = (): string => {
    // Formats to a readable ridiculous comparison
    if (percentageOfDuolingo < 0.0001) {
      return `Duolingo spends your entire budget every ${Math.round(86400 * 365 / (duolingoBudget * 1000000 / VivaLaLingoBudget))} seconds`;
    } else if (percentageOfDuolingo < 0.001) {
      return `Duolingo spends your entire yearly budget before their morning coffee`;
    } else {
      return `Duolingo spends your entire yearly budget in less than a minute`;
    }
  };
  
  return (
    <section id="budget-comparison" className="py-20 relative overflow-hidden">
      {/* Enhanced background with subtle gradient */}
      <div className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(10,10,40,0.95), rgba(40,40,100,0.9), rgba(10,10,40,0.95))`,
          transform: 'scale(1.02)'
        }}
      ></div>
      
      {/* Background Circle Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <div 
          ref={circleRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-300/20 to-secondary-300/20 blur-3xl"
        />
      </div>
      
      {/* Floating Particles */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 z-1 overflow-hidden pointer-events-none"
      ></div>
     
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <AnimatedText
            text="David vs. Goliath"
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            as="h2"
          />
          <AnimatedText
            text="The Ridiculous Marketing Budget Gap"
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            as="p"
            delay={0.2}
          />
        </div>
        
        {/* Budget Size Visualization - Simplified with consistent styling */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mb-16 max-w-3xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10">
            <div className="flex items-center mb-10">
              <div className="w-32 text-right pr-4 font-semibold">
                <span className="text-primary-400">VivaLaLingo</span>
              </div>
              
              {/* VivaLaLingo budget bar */}
              <div className="relative flex-grow h-10 bg-gray-700/50 rounded-full overflow-hidden flex items-center">
                <div 
                  className="h-full bg-primary-500 flex items-center justify-start pl-2 rounded-full"
                  style={{ width: `${Math.max(2, percentageOfDuolingo)}%` }}
                >
                  {percentageOfDuolingo > 5 ? `€${formatNumber(VivaLaLingoBudget)}` : ''}
                </div>
                {percentageOfDuolingo <= 5 && (
                  <span className="ml-3 text-sm text-white">{`€${formatNumber(VivaLaLingoBudget)}`}</span>
                )}
                
                {/* Microscope icon for tiny budget */}
                <div className="absolute right-0 -top-8 text-primary-300 text-xl">
                  🔬
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs w-24 text-center text-white">
                    Microscope needed
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-32 text-right pr-4 font-semibold">
                <span className="text-green-400">Duolingo</span>
              </div>
              
              {/* Duolingo budget bar */}
              <div className="flex-grow h-10 bg-gray-700/50 rounded-full overflow-hidden flex items-center">
                <div 
                  className="h-full bg-green-500 pl-3 flex items-center rounded-full"
                  style={{ width: '100%' }}
                >
                  €{formatNumber(duolingoBudget, true)}
                </div>
                
                {/* Money rain effect */}
                <div className="absolute right-0 -top-8 text-green-300 text-xl">
                  💰
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs w-24 text-center text-white">
                    Money waterfall
                  </div>
                </div>
              </div>
            </div>
            
            {/* Simplified comparison */}
            <div className="mt-8 p-4 bg-black/20 backdrop-blur-md rounded-lg text-center">
              <p className="text-xl text-white">
                {calculateComparison()}
              </p>
              <p className="text-sm text-gray-300 mt-2">
                But that doesn't stop us from building the best language learning app
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* What can you buy with these budgets - Simplified layout for both */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* VivaLaLingo Budget */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10"
            ref={VivaLaLingoContainerRef}
          >
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
              <span className="text-primary-400 mr-2">VivaLaLingo</span>
              <span className="text-lg">({formatNumber(VivaLaLingoBudget)}€)</span>
            </h3>
            
            <p className="text-gray-300 mb-6">
              What we can do with our scrappy startup budget:
            </p>
            
            <Button 
              variant="primary" 
              size="md" 
              onClick={() => setShowVivaLaLingoItems(!showVivaLaLingoItems)}
              className="w-full mb-4 shadow-lg shadow-primary-500/30"
            >
              {showVivaLaLingoItems ? "Hide Items" : "Show What We Can Buy"}
            </Button>
            
            {showVivaLaLingoItems && (
              <div className="space-y-3 mt-6 bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                {VivaLaLingoItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center bg-white/5 p-3 rounded-lg"
                  >
                    <div className="text-2xl mr-3">{item.icon}</div>
                    <div className="flex-grow">
                      <div className="font-medium text-white">{item.description}</div>
                      <div className="text-xs text-gray-400">{item.cost}€</div>
                    </div>
                    {item.cost === 5 && (
                      <div className="text-2xl">☕</div>
                    )}
                  </motion.div>
                ))}
                <div className="text-center text-sm text-gray-300 mt-2">
                  Budget spent: {VivaLaLingoItems.reduce((sum, item) => sum + item.cost, 0)}€ of {VivaLaLingoBudget}€
                </div>
              </div>
            )}
            
            {!showVivaLaLingoItems && (
              <div className="opacity-60 text-center py-8">
                <div className="text-4xl mb-2">☕</div>
                <div className="text-sm text-gray-300">Click above to see what we can afford</div>
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
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 overflow-hidden relative"
            ref={duolingoContainerRef}
          >
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
              <span className="text-green-400 mr-2">Duolingo</span>
              <span className="text-lg">({formatNumber(duolingoBudget, true)}€)</span>
            </h3>
            
            <p className="text-gray-300 mb-6">
              What they can do with their Silicon Valley money pit:
            </p>
            
            <div className="space-y-3 mt-2 bg-black/20 backdrop-blur-sm p-4 rounded-lg">
              {duolingoItems.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center bg-white/5 p-3 rounded-lg"
                >
                  <div className="text-2xl mr-3">{item.icon}</div>
                  <div className="flex-grow">
                    <div className="font-medium text-white">{item.description}</div>
                    <div className="text-xs text-gray-400">{item.cost} million €</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 text-sm text-gray-400">
              <p className="italic">"When you have this much money, why not put your owl on the moon?" - Duolingo's marketing team, probably</p>
            </div>
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
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-6 text-white">The Bottom Line</h3>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg flex-1">
                <div className="text-4xl mb-2">🦉</div>
                <h4 className="font-semibold text-green-400">Duolingo</h4>
                <p className="text-sm mt-2 text-gray-300">Spends {formatNumber(Math.round(duolingoBudget * 1000000 / VivaLaLingoBudget))} times more than us</p>
              </div>
              
              <div className="text-4xl font-bold text-gray-500">VS</div>
              
              <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg flex-1">
                <div className="text-4xl mb-2">🚀</div>
                <h4 className="font-semibold text-primary-400">VivaLaLingo</h4>
                <p className="text-sm mt-2 text-gray-300">We put our budget where it matters - in the product</p>
              </div>
            </div>
            
            <p className="mt-8 text-lg text-white">
              They might have the money, but we have the <span className="text-primary-400 font-semibold">passion</span> and the <span className="text-primary-400 font-semibold">Birkenbihl method</span>.
            </p>
            
            {/* App Download CTA */}
            <div className="mt-8">
              <Button 
                variant="secondary" 
                size="lg"
                className="shadow-lg shadow-secondary-500/30"
              >
                Try Our App Instead
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BudgetComparison;