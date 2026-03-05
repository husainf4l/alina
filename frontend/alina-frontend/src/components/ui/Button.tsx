'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles - always applied
  'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        outline:
          'border-2 border-input bg-transparent hover:bg-accent hover:text-accent-foreground hover:border-primary',
        ghost:
          'hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        link:
          'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-7 px-2 text-xs gap-1',
        sm: 'h-8 px-3 text-[13px] gap-1.5',
        default: 'h-9 px-4 text-sm gap-2',
        lg: 'h-10 px-5 text-sm gap-2',
        xl: 'h-11 px-6 text-base gap-2',
        icon: 'h-9 w-9 p-0',
      },
      shape: {
        default: 'rounded-md',
        pill: 'rounded-full',
        square: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      isLoading = false,
      icon,
      iconPosition = 'left',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isIconOnly = size === 'icon' && !children;

    return (
      <button
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-label={isIconOnly ? props['aria-label'] || 'Button' : undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {!isIconOnly && <span className="ml-2">Loading...</span>}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Icon Button variant for convenience
export const IconButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'size' | 'children'> & { icon: React.ReactNode }
>(({ icon, ...props }, ref) => {
  return (
    <Button ref={ref} size="icon" {...props}>
      {icon}
    </Button>
  );
});

IconButton.displayName = 'IconButton';
