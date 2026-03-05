'use client';

import { useEffect, useState } from 'react';
import { performanceMark, performanceMeasure, rateMetric, WEB_VITALS_THRESHOLDS } from '@/lib/performance/web-vitals';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Performance Dashboard Component
 * Displays real-time performance metrics (Development only)
 */
export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Collect performance metrics
    const collectMetrics = () => {
      if (!window.performance) return;

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      const newMetrics: PerformanceMetric[] = [];

      // DNS Lookup
      if (navigation) {
        const dnsTime = navigation.domainLookupEnd - navigation.domainLookupStart;
        newMetrics.push({
          name: 'DNS Lookup',
          value: Math.round(dnsTime),
          rating: dnsTime < 50 ? 'good' : dnsTime < 100 ? 'needs-improvement' : 'poor',
        });

        // TCP Connection
        const tcpTime = navigation.connectEnd - navigation.connectStart;
        newMetrics.push({
          name: 'TCP Connection',
          value: Math.round(tcpTime),
          rating: tcpTime < 100 ? 'good' : tcpTime < 200 ? 'needs-improvement' : 'poor',
        });

        // TTFB
        const ttfb = navigation.responseStart - navigation.requestStart;
        newMetrics.push({
          name: 'TTFB',
          value: Math.round(ttfb),
          rating: rateMetric('TTFB', ttfb),
        });

        // DOM Content Loaded
        const dcl = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        newMetrics.push({
          name: 'DOM Content Loaded',
          value: Math.round(dcl),
          rating: dcl < 1000 ? 'good' : dcl < 2000 ? 'needs-improvement' : 'poor',
        });

        // Page Load
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        newMetrics.push({
          name: 'Page Load',
          value: Math.round(loadTime),
          rating: loadTime < 2000 ? 'good' : loadTime < 4000 ? 'needs-improvement' : 'poor',
        });
      }

      // Paint Timings
      const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        newMetrics.push({
          name: 'FCP',
          value: Math.round(fcp.startTime),
          rating: rateMetric('FCP', fcp.startTime),
        });
      }

      setMetrics(newMetrics);
    };

    // Collect after page load
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    return () => window.removeEventListener('load', collectMetrics);
  }, []);

  // Keyboard shortcut to toggle dashboard (Ctrl/Cmd + Shift + P)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-mono shadow-lg hover:bg-gray-800 z-50"
        title="Performance Dashboard (Ctrl/Cmd + Shift + P)"
      >
        ⚡ Perf
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-200 rounded-xl shadow-2xl p-4 w-96 max-h-[500px] overflow-auto z-50 font-mono text-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm">⚡ Performance Metrics</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2">
        {metrics.map((metric) => (
          <div key={metric.name} className="flex items-center justify-between">
            <span className="text-gray-700">{metric.name}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{metric.value}ms</span>
              <span
                className={`
                  w-2 h-2 rounded-full
                  ${metric.rating === 'good' ? 'bg-green-500' : ''}
                  ${metric.rating === 'needs-improvement' ? 'bg-yellow-500' : ''}
                  ${metric.rating === 'poor' ? 'bg-red-500' : ''}
                `}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="text-gray-500 text-[10px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Good</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span>Needs Improvement</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span>Poor</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 text-[10px] text-gray-500">
        Press <kbd className="px-1 bg-gray-100 rounded">Ctrl/Cmd</kbd> + 
        <kbd className="px-1 bg-gray-100 rounded mx-1">Shift</kbd> + 
        <kbd className="px-1 bg-gray-100 rounded">P</kbd> to toggle
      </div>
    </div>
  );
}
