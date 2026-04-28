import { useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { Landing } from './components/Landing';
import { Dashboard } from './components/dashboard/Dashboard';

type View = 'landing' | 'dashboard';

export default function App() {
  const [view, setView] = useState<View>('landing');

  return (
    <div className="relative min-h-[100dvh] w-full">
      <AmbientBackground />
      {view === 'landing' ? (
        <Landing onEnter={() => setView('dashboard')} />
      ) : (
        <Dashboard onSignOut={() => setView('landing')} />
      )}
    </div>
  );
}
