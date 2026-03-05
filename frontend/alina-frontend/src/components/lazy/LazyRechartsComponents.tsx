'use client';

import dynamic from 'next/dynamic';

// Lazy load individual Recharts components to reduce bundle size
// Only loads when charts are actually rendered

export const LazyLineChart = dynamic(
  () => import('recharts').then((mod) => mod.LineChart),
  {
    loading: () => <div className="w-full h-64 bg-gray-100 animate-pulse rounded-xl" />,
    ssr: false,
  }
);

export const LazyLine = dynamic(
  () => import('recharts').then((mod) => mod.Line),
  { ssr: false }
);

export const LazyAreaChart = dynamic(
  () => import('recharts').then((mod) => mod.AreaChart),
  {
    loading: () => <div className="w-full h-64 bg-gray-100 animate-pulse rounded-xl" />,
    ssr: false,
  }
);

export const LazyArea = dynamic(
  () => import('recharts').then((mod) => mod.Area),
  { ssr: false }
);

export const LazyBarChart = dynamic(
  () => import('recharts').then((mod) => mod.BarChart),
  {
    loading: () => <div className="w-full h-64 bg-gray-100 animate-pulse rounded-xl" />,
    ssr: false,
  }
);

export const LazyBar = dynamic(
  () => import('recharts').then((mod) => mod.Bar),
  { ssr: false }
);

export const LazyPieChart = dynamic(
  () => import('recharts').then((mod) => mod.PieChart),
  {
    loading: () => <div className="w-full h-64 bg-gray-100 animate-pulse rounded-full" />,
    ssr: false,
  }
);

export const LazyPie = dynamic(
  () => import('recharts').then((mod) => mod.Pie),
  { ssr: false }
);

export const LazyXAxis = dynamic(
  () => import('recharts').then((mod) => mod.XAxis),
  { ssr: false }
);

export const LazyYAxis = dynamic(
  () => import('recharts').then((mod) => mod.YAxis),
  { ssr: false }
);

export const LazyCartesianGrid = dynamic(
  () => import('recharts').then((mod) => mod.CartesianGrid),
  { ssr: false }
);

export const LazyTooltip = dynamic(
  () => import('recharts').then((mod) => mod.Tooltip),
  { ssr: false }
);

export const LazyResponsiveContainer = dynamic(
  () => import('recharts').then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

export const LazyLegend = dynamic(
  () => import('recharts').then((mod) => mod.Legend),
  { ssr: false }
);

export const LazyCell = dynamic(
  () => import('recharts').then((mod) => mod.Cell),
  { ssr: false }
);
