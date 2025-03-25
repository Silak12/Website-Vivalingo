import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type DividerStyle = 'gentle-wave' | 'curved' | 'slant' | 'triangle' | 'bubbles' | 'rounded' | 'fade';

interface ImprovedDividerProps {
  position?: 'top' | 'bottom';
  color?: string;
  backgroundColor?: string;
  height?: number;
  width?: number;
  animated?: boolean;
  inverted?: boolean;
  className?: string;
  style?: DividerStyle;
  opacity?: number;
}

const ImprovedDivider: React.FC<ImprovedDividerProps> = ({
  position = 'bottom',
  color = '#ffffff',
  backgroundColor = 'transparent',
  height = 70,
  width = 1440,
  animated = true,
  inverted = false,
  className = '',
  style = 'gentle-wave',
  opacity = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Create separate refs for each animation element
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const wave3Ref = useRef<SVGPathElement>(null);
  const singlePathRef = useRef<SVGPathElement>(null);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const rectRef = useRef<SVGRectElement>(null);
  
  // Helper function to get the correct divider path based on the style
  const getDividerPath = (): React.ReactNode => {
    switch (style) {
      case 'gentle-wave':
        return (
          <>
            <defs>
              <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0" />
                <stop offset="100%" stopColor={color} stopOpacity={opacity.toString()} />
              </linearGradient>
            </defs>
            <path
              ref={wave1Ref}
              d="M0,50 C300,20 400,80 600,50 C800,20 900,80 1200,50 L1200,0 L0,0 Z"
              fill={position === 'top' ? `url(#fadeGradient)` : color}
              fillOpacity={position === 'top' ? 1 : (0.3 * opacity)}
            />
            <path
              ref={wave2Ref}
              d="M0,50 C150,80 350,20 550,50 C750,80 950,20 1200,50 L1200,0 L0,0 Z"
              fill={color}
              fillOpacity={0.5 * opacity}
            />
            <path
              ref={wave3Ref}
              d="M0,50 C200,90 500,10 800,50 C1000,80 1100,30 1200,50 L1200,0 L0,0 Z"
              fill={color}
              fillOpacity={0.8 * opacity}
            />
          </>
        );
        
      case 'curved':
        return (
          <path
            ref={singlePathRef}
            d="M0,0 L0,30 Q600,100 1200,30 L1200,0 Z"
            fill={color}
            fillOpacity={opacity}
          />
        );
        
      case 'slant':
        return (
          <path
            ref={singlePathRef}
            d="M0,0 L1200,70 L1200,0 Z"
            fill={color}
            fillOpacity={opacity}
          />
        );
        
      case 'triangle':
        return (
          <path
            ref={singlePathRef}
            d="M0,0 L600,70 L1200,0 Z"
            fill={color}
            fillOpacity={opacity}
          />
        );
        
      case 'bubbles':
        // Create a series of circles that appear to float from the edge
        // Initialize circle refs array if needed
        if (circleRefs.current.length !== 20) {
          circleRefs.current = Array(20).fill(null);
        }
        
        return (
          <g>
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                ref={(el) => { circleRefs.current[i] = el; }}
                cx={width * (i / 20) + (Math.random() * 30)}
                cy={height - (Math.random() * height * 0.7) - 10}
                r={5 + Math.random() * 15}
                fill={color}
                fillOpacity={(0.2 + Math.random() * 0.5) * opacity}
              />
            ))}
          </g>
        );
        
      case 'rounded':
        return (
          <path
            ref={singlePathRef}
            d="M0,70 C300,0 900,0 1200,70 L1200,0 L0,0 Z"
            fill={color}
            fillOpacity={opacity}
          />
        );
        
      case 'fade':
        return (
          <>
            <defs>
              <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0" />
                <stop offset="100%" stopColor={color} stopOpacity={opacity.toString()} />
              </linearGradient>
            </defs>
            <rect
              ref={rectRef}
              width={width}
              height={height}
              fill="url(#fadeGradient)"
            />
          </>
        );
        
      default:
        return (
          <path
            ref={singlePathRef}
            d="M0,0 L0,70 L1200,70 L1200,0 Z"
            fill={color}
            fillOpacity={opacity}
          />
        );
    }
  };
  
  useEffect(() => {
    if (!animated || !svgRef.current) return;
    
    // Clean up any existing animations
    const cleanupFns: (() => void)[] = [];
    
    // Apply animations based on style
    if (style === 'gentle-wave') {
      // Animate the three wave paths
      if (wave1Ref.current) {
        const anim1 = gsap.to(wave1Ref.current, {
          x: inverted ? '-10%' : '10%',
          duration: 25,
          repeat: -1,
          ease: 'sine.inOut',
          yoyo: true,
        });
        cleanupFns.push(() => anim1.kill());
      }
      
      if (wave2Ref.current) {
        const anim2 = gsap.to(wave2Ref.current, {
          x: inverted ? '8%' : '-8%',
          duration: 20,
          repeat: -1,
          ease: 'sine.inOut',
          yoyo: true,
          delay: 1,
        });
        cleanupFns.push(() => anim2.kill());
      }
      
      if (wave3Ref.current) {
        const anim3 = gsap.to(wave3Ref.current, {
          x: inverted ? '-6%' : '6%',
          duration: 30,
          repeat: -1,
          ease: 'sine.inOut',
          yoyo: true,
          delay: 2,
        });
        cleanupFns.push(() => anim3.kill());
      }
    } else if (style === 'bubbles') {
      // Animate the bubble circles
      circleRefs.current.forEach((circle, i) => {
        if (circle) {
          const animBubble = gsap.to(circle, {
            y: `-=${20 + Math.random() * 30}`,
            x: `${(Math.random() - 0.5) * 20}`,
            duration: 5 + Math.random() * 10,
            repeat: -1,
            ease: 'sine.inOut',
            yoyo: true,
            delay: i * 0.2,
          });
          cleanupFns.push(() => animBubble.kill());
        }
      });
    } else if (singlePathRef.current) {
      // Animate other path styles with subtle movement
      const animPath = gsap.to(singlePathRef.current, {
        scaleX: 1.02,
        scaleY: inverted ? 0.98 : 1.02,
        duration: 20,
        repeat: -1,
        ease: 'sine.inOut',
        yoyo: true,
        transformOrigin: 'center bottom',
      });
      cleanupFns.push(() => animPath.kill());
    }
    
    // Add parallax effect
    if (containerRef.current) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const speed = 0.05; // Reduced parallax speed for subtlety
          const progress = self.progress;
          const yOffset = (progress - 0.5) * height * speed;
          
          if (svgRef.current) {
            gsap.to(svgRef.current, {
              y: yOffset,
              duration: 0.5,
              ease: 'power1.out',
            });
          }
        },
      });
      
      cleanupFns.push(() => scrollTrigger.kill());
    }
    
    // Cleanup function
    return () => {
      cleanupFns.forEach(fn => fn());
    };
  }, [animated, height, inverted, style, opacity, width]);
  
  const positionClass = position === 'top' 
    ? 'top-0' 
    : 'bottom-0';
  
  const transform = position === 'top' ? 'rotate(180deg)' : '';
  
  return (
    <div 
      ref={containerRef}
      className={`absolute left-0 right-0 overflow-hidden pointer-events-none ${positionClass} ${className}`} 
      style={{ 
        height: `${height}px`,
        backgroundColor
      }}
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ transform }}
      >
        {getDividerPath()}
      </svg>
    </div>
  );
};

export default ImprovedDivider;