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

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      const rate = scrollTop * -speed;
      
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const translateY = direction === 'up' ? rate : -rate;
        element.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div ref={elementRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default ParallaxSection;