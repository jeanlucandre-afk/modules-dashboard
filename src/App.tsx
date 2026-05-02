import { useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { CursorGlow } from './components/CursorGlow';
import { Landing } from './components/Landing';
import { Dashboard } from './components/dashboard/Dashboard';

type View = 'landing' | 'dashboard';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [transitioning, setTransitioning] = useState(false);

  const enterDashboard = () => {
    setTransitioning(true);
    setTimeout(() => {
      setView('dashboard');
      setTransitioning(false);
    }, 600);
  };

  const exitToLanding = () => {
    setTransitioning(true);
    setTimeout(() => {
      setView('landing');
      setTransitioning(false);
    }, 600);
  };

  return (
    <div className="relative min-h-[100dvh] w-full">
      <AmbientBackground />
      <CursorGlow />

      {/* Page transition wash */}
      <div
        aria-hidden
        className={`fixed inset-0 z-[100] pointer-events-none transition-all duration-700 ${
          transitioning ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at center, rgba(167,139,250,0.4) 0%, rgba(8,8,20,0.95) 60%)',
          backdropFilter: transitioning ? 'blur(20px)' : 'blur(0px)',
        }}
      />

      <div
        className={`transition-all duration-500 ${
          transitioning ? 'opacity-0 scale-[0.98] blur-md' : ''
        }`}
      >
        {view === 'landing' ? (
          <Landing onEnter={enterDashboard} />
        ) : (
          <Dashboard onSignOut={exitToLanding} />
        )}
      </div>
    </div>
  );
}
