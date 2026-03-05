import React from 'react';

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = false,
  striped = false,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantClasses = {
    default: 'bg-blue-600 dark:bg-blue-500',
    success: 'bg-green-600 dark:bg-green-500',
    warning: 'bg-yellow-600 dark:bg-yellow-500',
    danger: 'bg-red-600 dark:bg-red-500',
    info: 'bg-cyan-600 dark:bg-cyan-500',
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };

  const stripedPattern = striped
    ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:1rem_100%]'
    : '';

  const animatedClass = animated ? 'animate-progress' : '';

  return (
    <div className={className}>
      {(label || showLabel) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div
        className={`
          w-full
          bg-gray-200
          dark:bg-gray-700
          rounded-full
          overflow-hidden
          ${sizeClasses[size]}
        `}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`
            h-full
            transition-all
            duration-300
            ease-in-out
            rounded-full
            ${variantClasses[variant]}
            ${stripedPattern}
            ${animatedClass}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Circular Progress Component
export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showLabel = true,
  label,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const variantColors = {
    default: 'stroke-blue-600 dark:stroke-blue-500',
    success: 'stroke-green-600 dark:stroke-green-500',
    warning: 'stroke-yellow-600 dark:stroke-yellow-500',
    danger: 'stroke-red-600 dark:stroke-red-500',
    info: 'stroke-cyan-600 dark:stroke-cyan-500',
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${variantColors[variant]} transition-all duration-500 ease-in-out`}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(percentage)}%
          </span>
          {label && (
            <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Add animation keyframes to global CSS if needed
// @keyframes progress {
//   0% { background-position: 1rem 0; }
//   100% { background-position: 0 0; }
// }
