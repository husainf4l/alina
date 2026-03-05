'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api/client';

export const ApiHealthMonitor: React.FC = () => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await apiClient.get('/health');
        setIsHealthy(response.status === 200);
        setLastCheck(new Date());
      } catch (error) {
        // Silently fail - health check is optional
        setIsHealthy(false);
        setLastCheck(new Date());
      }
    };

    // Check immediately
    checkHealth();

    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development' || isHealthy === null) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <div className={`
        flex items-center gap-2 px-4 py-2 rounded-full shadow-lg backdrop-blur-xl
        ${isHealthy 
          ? 'bg-green-500/90 text-white' 
          : 'bg-red-500/90 text-white'
        }
      `}>
        <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-white' : 'bg-white animate-pulse'}`} />
        <span className="text-xs font-medium">
          API {isHealthy ? 'Connected' : 'Disconnected'}
        </span>
        {lastCheck && (
          <span className="text-xs opacity-75">
            {lastCheck.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
};
