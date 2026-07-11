import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  direction = 'up',
  delay = 0,
  distance = 50,
  duration = 0.8,
  ease = 'power3.out',
  stagger = 0,
  className = '',
  style = {},
  once = true
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const yFrom = direction === 'up' ? distance : direction === 'down' ? -distance : 0;
    const xFrom = direction === 'left' ? distance : direction === 'right' ? -distance : 0;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: yFrom, x: xFrom, opacity: 0 },
        {
          y: 0,
          x: 0,
          opacity: 1,
          delay,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'bottom 12%',
            toggleActions: once ? 'play none none none' : 'play reverse play reverse'
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction, delay, distance, duration, ease, stagger, once]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  );
};

export default AnimatedContent;
