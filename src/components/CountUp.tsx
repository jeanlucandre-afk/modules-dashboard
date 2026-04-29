import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** Final value to count to */
  to: number;
  /** Animation duration in ms */
  duration?: number;
  /** Suffix appended after the number (e.g. "%") */
  suffix?: string;
  /** Decimal places */
  decimals?: number;
  /** Delay before starting animation in ms */
  delay?: number;
}

/**
 * Counts up from 0 to `to` over `duration` ms with an ease-out curve.
 * Triggers when the element enters the viewport.
 */
export function CountUp({ to, duration = 1400, suffix = '', decimals = 0, delay = 0 }: CountUpProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            setTimeout(() => {
              const start = performance.now();
              const tick = (now: number) => {
                const t = Math.min(1, (now - start) / duration);
                // ease-out cubic
                const eased = 1 - Math.pow(1 - t, 3);
                setVal(to * eased);
                if (t < 1) requestAnimationFrame(tick);
                else setVal(to);
              };
              requestAnimationFrame(tick);
            }, delay);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}
