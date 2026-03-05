'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  // Base styles
  'w-full bg-transparent border border-input px-3 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 text-[13px] rounded-md',
        default: 'h-9 text-sm rounded-md',
        lg: 'h-10 text-sm rounded-md',
      },
      variant: {
        default: '',
        // Financial inputs get monospace tabular nums
        financial: 'font-mono tabular-nums text-right',
      },
      state: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive/20',
        success: 'border-success focus-visible:ring-success/20',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      variant,
      state,
      label,
      error,
      helperText,
      icon,
      rightIcon,
      isLoading = false,
      wrapperClassName,
      type,
      ...props
    },
    ref
  ) => {
    // Auto-apply financial variant for number inputs
    const finalVariant =
      type === 'number' && variant !== 'financial' ? 'financial' : variant;
    
    // Auto-set error state if error message exists
    const finalState = error ? 'error' : state;

    return (
      <div className={cn('w-full space-y-2', wrapperClassName)}>
        {label && (
          <label
            className="block text-sm font-medium text-foreground"
            htmlFor={props.id}
          >
            {label}
            {props.required && (
              <span className="text-destructive ml-1">*</span>
            )}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {icon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              inputVariants({ size, variant: finalVariant, state: finalState }),
              icon && 'pl-10',
              (rightIcon || isLoading) && 'pr-10',
              className
            )}
            ref={ref}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${props.id}-error`
                : helperText
                ? `${props.id}-description`
                : undefined
            }
            {...props}
          />

          {/* Right side icons */}
          {(rightIcon || isLoading) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              {isLoading && (
                <svg
                  className="h-4 w-4 animate-spin text-muted-foreground"
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
              )}

              {!isLoading && rightIcon && (
                <span className="text-muted-foreground">{rightIcon}</span>
              )}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${props.id}-error`}
            className="text-xs text-destructive flex items-center gap-1"
          >
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${props.id}-description`}
            className="text-xs text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea variant
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
    label?: string;
    error?: string;
    helperText?: string;
  }
>(({ className, label, error, helperText, ...props }, ref) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground" htmlFor={props.id}>
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus-visible:ring-destructive/20',
          className
        )}
        ref={ref}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />

      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
