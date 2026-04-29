import { useEffect, useState } from 'react';

/**
 * A soft violet glow that follows the cursor. Only enabled on devices that
 * support hover (skipped on touch devices to avoid jank).
 */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="fixed pointer-events-none -z-[5]"
      style={{
        left: pos.x,
        top: pos.y,
        width: 600,
        height: 600,
        marginLeft: -300,
        marginTop: -300,
        background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, rgba(236,72,153,0.06) 30%, transparent 60%)',
        filter: 'blur(40px)',
        transition: 'left 0.35s cubic-bezier(0.22, 1, 0.36, 1), top 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'left, top',
      }}
    />
  );
}
