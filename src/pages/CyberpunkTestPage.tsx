import React, { useEffect } from 'react';
import CyberpunkTest from '@/components/CyberpunkTest';

const CyberpunkTestPage: React.FC = () => {
  // Force dark mode for cyberpunk theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-cyber-darker relative overflow-hidden">
      {/* Circuit pattern background with overlay */}
      <div className="fixed inset-0 cyber-circuit-bg opacity-10 pointer-events-none z-0"></div>
      
      {/* Animated particle effects */}
      <div className="cyber-particles">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-cyber-blue/5 rounded-full filter blur-3xl animate-pulse-opacity"></div>
        <div className="absolute bottom-40 right-1/3 w-40 h-40 bg-cyber-purple/5 rounded-full filter blur-3xl animate-pulse-opacity" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-cyber-pink/5 rounded-full filter blur-3xl animate-pulse-opacity" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <CyberpunkTest />
      </div>
    </div>
  );
};

export default CyberpunkTestPage;