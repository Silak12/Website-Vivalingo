import React from 'react';

type DividerStyle = 'curve' | 'wave' | 'angle' | 'fade';

interface SimpleDividerProps {
  position?: 'top' | 'bottom';
  color?: string;
  height?: number;
  className?: string;
  style?: DividerStyle;
}

/**
 * A simple, lightweight section divider component without animations or GSAP dependencies
 */
const SimpleDivider: React.FC<SimpleDividerProps> = ({
  position = 'bottom',
  color = '#ffffff',
  height = 70,
  className = '',
  style = 'curve',
}) => {
  // Set the SVG path based on the selected style
  const getDividerPath = (): string => {
    const width = 1200; // SVG viewBox width
    
    switch (style) {
      case 'curve':
        return `M0 ${height} C300 0 900 0 ${width} ${height} L${width} 0 L0 0 Z`;
        
      case 'wave':
        return `M0 ${height} C200 ${height * 0.3} 400 ${height * 0.7} 600 ${height * 0.5} C800 ${height * 0.3} 1000 ${height * 0.6} ${width} ${height * 0.4} L${width} 0 L0 0 Z`;
        
      case 'angle':
        return `M0 0 L${width} ${height} L${width} 0 Z`;
        
      case 'fade':
        // For fade, we'll use a linear gradient in the component return
        return `M0 0 L0 ${height} L${width} ${height} L${width} 0 Z`;
        
      default:
        return `M0 0 L0 ${height} L${width} ${height} L${width} 0 Z`;
    }
  };
  
  const positionClass = position === 'top' ? 'top-0' : 'bottom-0';
  
  return (
    <div 
      className={`absolute left-0 right-0 w-full overflow-hidden pointer-events-none ${positionClass} ${className}`} 
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      {style === 'fade' ? (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: position === 'top' 
              ? `linear-gradient(to bottom, ${color}, transparent)` 
              : `linear-gradient(to top, ${color}, transparent)`
          }}
        ></div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 1200 ${height}`}
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ 
            transform: position === 'top' ? 'rotate(180deg)' : undefined,
            display: 'block'
          }}
        >
          <path
            d={getDividerPath()}
            fill={color}
          />
        </svg>
      )}
    </div>
  );
};

export default SimpleDivider;