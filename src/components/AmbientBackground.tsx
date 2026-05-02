/**
 * Ambient floating gradient blobs — three drifting orbs that softly pulse.
 * Pure CSS, fixed-position, behind everything else.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="blob"
        style={{
          width: 520,
          height: 520,
          top: -120,
          left: -80,
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          animationDelay: '0s',
        }}
      />
      <div
        className="blob"
        style={{
          width: 460,
          height: 460,
          bottom: -120,
          right: -100,
          background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
          animationDelay: '4s',
        }}
      />
      <div
        className="blob"
        style={{
          width: 380,
          height: 380,
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)',
          opacity: 0.25,
          animationDelay: '8s',
        }}
      />
      {/* Subtle grain over everything */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(167,139,250,0.06) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(236,72,153,0.04) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
