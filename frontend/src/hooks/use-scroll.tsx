import { useCallback, useEffect, useState } from 'react';

export default function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.scrollY > threshold;
  });

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => setScrolled(window.scrollY > threshold);

    const id =
      typeof window.requestAnimationFrame === 'function'
        ? window.requestAnimationFrame(update)
        : window.setTimeout(update, 0);

    return () => {
      if (typeof window.cancelAnimationFrame === 'function' && typeof id === 'number') {
        window.cancelAnimationFrame(id as number);
      } else {
        clearTimeout(id as number);
      }
    };
  }, [threshold]);

  return scrolled;
}