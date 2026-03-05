'use client';

import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = '', 
  count = 1,
  variant = 'rectangular'
}) => {
  const baseStyles = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]';
  
  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-3xl h-64',
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
          style={{
            animation: 'shimmer 2s infinite',
          }}
        />
      ))}
    </>
  );
};

export const GigCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100">
      <LoadingSkeleton variant="rectangular" className="h-52 rounded-none" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <LoadingSkeleton variant="circular" className="w-10 h-10" />
          <LoadingSkeleton variant="text" className="w-32" />
        </div>
        <LoadingSkeleton variant="text" className="w-full h-6" />
        <LoadingSkeleton variant="text" className="w-3/4 h-4" />
        <div className="flex items-center justify-between pt-4">
          <LoadingSkeleton variant="text" className="w-20" />
          <LoadingSkeleton variant="text" className="w-24 h-8" />
        </div>
      </div>
    </div>
  );
};

export const ProfileCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100">
      <div className="flex items-start gap-6">
        <LoadingSkeleton variant="circular" className="w-24 h-24" />
        <div className="flex-1 space-y-3">
          <LoadingSkeleton variant="text" className="w-48 h-6" />
          <LoadingSkeleton variant="text" className="w-32 h-4" />
          <LoadingSkeleton variant="text" className="w-full" />
          <LoadingSkeleton variant="text" className="w-2/3" />
        </div>
      </div>
    </div>
  );
};

export const DashboardStatSkeleton: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <LoadingSkeleton variant="text" className="w-24" />
          <LoadingSkeleton variant="text" className="w-32 h-8" />
        </div>
        <LoadingSkeleton variant="circular" className="w-16 h-16" />
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 4 }) => {
  return (
    <tr className="border-b border-gray-100">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-6 py-4">
          <LoadingSkeleton variant="text" className="w-full" />
        </td>
      ))}
    </tr>
  );
};
