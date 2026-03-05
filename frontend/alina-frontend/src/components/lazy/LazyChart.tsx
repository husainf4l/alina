'use client';

import dynamic from 'next/dynamic';

// Lazy load Chart component to reduce initial bundle size
const Chart = dynamic(() => import('@/components/ui/Chart').then(mod => ({ default: mod.Chart })), {
  loading: () => (
    <div className="w-full h-64 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
      <div className="text-gray-400">Loading chart...</div>
    </div>
  ),
  ssr: false, // Charts don't need SSR
});

export default Chart;
