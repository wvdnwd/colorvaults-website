'use client';
import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: React.ElementType;
}

/**
 * Wraps children in a div with the `.reveal` class.
 * Adds `.visible` once the element scrolls into view.
 * Uses IntersectionObserver (threshold 0.12).
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : '';

  // Always render a div wrapper so ref works reliably
  return (
    <div ref={ref} className={`reveal ${delayClass}`.trim()}>
      <Tag className={className || undefined}>
        {children}
      </Tag>
    </div>
  );
}
