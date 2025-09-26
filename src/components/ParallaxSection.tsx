import { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down';
  style?: React.CSSProperties;
}

const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'up',
  style
}: ParallaxSectionProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset;
          const rate = scrollTop * -speed;
          
          if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            const translateY = direction === 'up' ? rate : -rate;
            element.style.transform = `translate3d(0, ${translateY}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add will-change for better performance
    element.style.willChange = 'transform';

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      element.style.willChange = 'auto';
    };
  }, [speed, direction]);

  return (
    <div ref={elementRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default ParallaxSection;