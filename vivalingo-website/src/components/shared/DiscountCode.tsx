import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DiscountCodeProps {
  code: string;
  isActive?: boolean;
  onClick?: (code: string) => void;
}

const DiscountCode: React.FC<DiscountCodeProps> = ({
  code,
  isActive = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const handleClick = () => {
    if (onClick) {
      onClick(code);
    } else {
      // Copy to clipboard functionality
      navigator.clipboard.writeText(code).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };
  
  const baseClasses = 'relative flex items-center justify-center px-4 py-2 font-mono font-bold border-2 rounded-md cursor-pointer transition-all duration-300';
  
  const activeClasses = isActive
    ? 'bg-accent-100 border-accent-500 text-accent-800'
    : 'bg-white border-gray-300 text-gray-700 hover:border-primary-400 hover:text-primary-600';
  
  return (
    <motion.div
      className={`${baseClasses} ${activeClasses}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {code}
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
      
      {/* Copy tooltip */}
      {isHovered && !isActive && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isCopied ? 'Copied!' : 'Click to copy'}
        </motion.div>
      )}
      
      {/* Active code tooltip */}
      {isHovered && isActive && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs py-1 px-2 rounded"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Active code! Try it now!
        </motion.div>
      )}
    </motion.div>
  );
};

export default DiscountCode;