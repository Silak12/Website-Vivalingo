import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  delay?: number;
  duration?: number;
  staggerChildren?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  once = true,
  as = 'p',
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.015,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once });
  
  // Split text into words and ensure no empty strings
  const words = text.split(' ').filter(word => word.trim() !== '');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren, 
        delayChildren: delay * i,
        // Ensure all children animate
        staggerDirection: 1,
        when: "beforeChildren",
      }
    })
  };
  
  const child = {
    hidden: { 
      opacity: 0, 
      y: 20, 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration
      }
    }
  };
  
  useEffect(() => {
    if (inView) {
      // Force complete animation sequence
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);
  
  // Use native HTML element
  const Component = motion[as] || motion.div;
  
  return (
    <Component
      ref={ref}
      className={`${className} overflow-visible`}
      variants={container}
      initial="hidden"
      animate={controls}
      style={{ display: 'block', width: '100%' }}
    >
      {words.map((word, index) => (
        <span key={index} style={{ position: 'relative', display: 'inline-block' }}>
          <motion.span
            variants={child}
            style={{ 
              display: 'inline-block',
              whiteSpace: 'pre'
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.35em' }}> </span>
          )}
        </span>
      ))}
    </Component>
  );
};

export default AnimatedText;