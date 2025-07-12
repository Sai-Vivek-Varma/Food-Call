import { useEffect, useRef, useState } from "react";

/**
 * AnimatedNumber - animates a number from start to end over a duration
 * @param {number} value - The target value to animate to
 * @param {number} [duration=1200] - Animation duration in ms
 * @param {number} [start=0] - Start value (default 0)
 * @param {string} [className] - Optional className for styling
 */
export default function AnimatedNumber({
  value,
  duration = 1200,
  start = 0,
  className = "",
}) {
  const [display, setDisplay] = useState(start);
  const raf = useRef();
  const startTimestamp = useRef();
  const prevValue = useRef(start);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef();

  // Intersection Observer to trigger animation when element is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    
    let cancelled = false;
    function animate(ts) {
      if (!startTimestamp.current) startTimestamp.current = ts;
      const progress = Math.min((ts - startTimestamp.current) / duration, 1);
      // Use easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const next = Math.round(
        prevValue.current + (value - prevValue.current) * easeOutQuart
      );
      setDisplay(next);
      if (progress < 1 && !cancelled) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
        prevValue.current = value;
        startTimestamp.current = null;
      }
    }
    raf.current = requestAnimationFrame(animate);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf.current);
      startTimestamp.current = null;
    };
    // Only animate when value changes or becomes visible
    // eslint-disable-next-line
  }, [value, isVisible]);

  return (
    <span 
      ref={elementRef}
      className={`${className} transition-all duration-300`}
    >
      {display.toLocaleString()}
    </span>
  );
}
