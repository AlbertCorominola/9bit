'use client';

import { useEffect, useState } from 'react';

export default function PortraitLock() {
  const [landscape, setLandscape] = useState(false);

  useEffect(() => {
    const check = () => {
      setLandscape(
        window.innerWidth < 900 &&
        window.matchMedia('(orientation: landscape)').matches
      );
    };
    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  if (!landscape) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center gap-6 px-8 text-center">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary-container rotate-90">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
      <p className="font-mono text-sm uppercase tracking-widest text-on-surface-variant">
        Gira el dispositiu
      </p>
    </div>
  );
}
