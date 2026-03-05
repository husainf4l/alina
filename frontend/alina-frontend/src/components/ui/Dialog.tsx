'use client';

import React, { useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const dialogVariants = cva(
  'fixed bg-background border border-border shadow-2xl z-50',
  {
    variants: {
      variant: {
        default: 'rounded-2xl',
        drawer: 'rounded-t-2xl',
      },
      size: {
        sm: 'max-w-sm',
        default: 'max-w-md',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-7xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface DialogProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogVariants> {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  showClose?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}

export function Dialog({
  open = false,
  onClose,
  title,
  description,
  footer,
  showClose = true,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  className,
  variant,
  size,
  children,
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle Escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    firstFocusable?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    };

    dialog.addEventListener('keydown', handleTab as any);
    return () => dialog.removeEventListener('keydown', handleTab as any);
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={closeOnOutsideClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'dialog-title' : undefined}
          aria-describedby={description ? 'dialog-description' : undefined}
          className={cn(
            dialogVariants({ variant, size }),
            'w-full overflow-hidden',
            className
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {/* Header */}
          {(title || description || showClose) && (
            <div className="flex items-start justify-between gap-4 border-b border-border p-6 pb-4">
              <div className="flex-1 space-y-1">
                {title && (
                  <h2
                    id="dialog-title"
                    className="text-xl font-semibold leading-none tracking-tight"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="dialog-description"
                    className="text-sm text-muted-foreground"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showClose && (
                <button
                  onClick={onClose}
                  className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Close dialog"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/10 p-6 pt-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Simplified Modal API (subset of Dialog)
export interface ModalProps extends DialogProps {}

export function Modal(props: ModalProps) {
  return <Dialog {...props} />;
}
