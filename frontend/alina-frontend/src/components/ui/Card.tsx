'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional card title */
  title?: string;
  /** Optional card description/subtitle */
  description?: string;
  /** Optional header action (e.g., a button or link) */
  headerAction?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Hover effect */
  hoverable?: boolean;
}

export function Card({
  className,
  title,
  description,
  headerAction,
  footer,
  hoverable = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card text-card-foreground shadow-sm',
        hoverable && 'transition-shadow hover:shadow-md',
        className
      )}
      {...props}
    >
      {(title || description || headerAction) && (
        <div className="flex items-start justify-between gap-4 p-6 pb-4">
          <div className="flex-1 space-y-1">
            {title && (
              <h3 className="text-xl font-semibold leading-none tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </div>
      )}

      <div className="p-6 pt-0">{children}</div>

      {footer && (
        <div className="border-t border-border bg-muted/10 px-6 py-4 rounded-b-2xl">
          {footer}
        </div>
      )}
    </div>
  );
}

// Card subcomponents for more flexible composition
export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center border-t border-border bg-muted/10 px-6 py-4 rounded-b-2xl',
        className
      )}
      {...props}
    />
  );
}
