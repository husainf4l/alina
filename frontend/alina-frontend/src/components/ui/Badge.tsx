'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        success:
          'bg-success text-success-foreground hover:bg-success/80',
        warning:
          'bg-warning text-warning-foreground hover:bg-warning/80',
        info:
          'bg-info text-info-foreground hover:bg-info/80',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px] gap-1',
        default: 'px-2.5 py-0.5 text-xs gap-1',
        lg: 'px-3 py-1 text-sm gap-1.5',
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

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant,
  size,
  shape,
  dot = false,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, shape }), className)}
      {...props}
    >
      {dot && (
        <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  );
}

// Status Badge Pattern (for journal states, order states, etc.)
export interface StatusBadgeProps extends Omit<BadgeProps, 'dot' | 'variant'> {
  status: 'draft' | 'posted' | 'canceled' | 'active' | 'pending' | 'completed';
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const statusConfig = {
    draft: {
      variant: 'secondary' as const,
      label: 'Draft',
    },
    posted: {
      variant: 'info' as const,
      label: 'Posted',
      icon: (
        <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    canceled: {
      variant: 'destructive' as const,
      label: 'Canceled',
    },
    active: {
      variant: 'success' as const,
      label: 'Active',
    },
    pending: {
      variant: 'warning' as const,
      label: 'Pending',
    },
    completed: {
      variant: 'success' as const,
      label: 'Completed',
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      dot
      {...('icon' in config ? { icon: config.icon } : {})}
      className={cn('ring-1 ring-inset ring-current/20', className)}
      shape="pill"
      {...props}
    >
      {config.label}
    </Badge>
  );
}
