'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton (CSS value) */
  width?: string | number;
  /** Height of the skeleton (CSS value) */
  height?: string | number;
  /** Variant shape */
  variant?: 'default' | 'circle' | 'text' | 'button' | 'card';
}

export function Skeleton({
  className,
  width,
  height,
  variant = 'default',
  style,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    default: 'rounded-md',
    circle: 'rounded-full',
    text: 'h-4 w-full rounded',
    button: 'h-9 w-24 rounded-md',
    card: 'h-32 w-full rounded-2xl',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        variantStyles[variant],
        className
      )}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

// Common skeleton patterns
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circle" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex gap-4 pb-2 border-b border-border">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="text" width={`${20 + i * 10}%`} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 py-3">
          {Array.from({ length: 4 }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant="text"
              width={`${20 + colIndex * 10}%`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
