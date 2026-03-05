'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tableVariants = cva('w-full caption-bottom', {
  variants: {
    variant: {
      default: 'border-collapse',
      striped: '',
      borderless: '',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const tableRowVariants = cva('border-b border-border transition-colors', {
  variants: {
    variant: {
      default: '',
      striped: 'even:bg-muted/30',
      borderless: 'border-none',
    },
    size: {
      sm: 'h-9',
      default: 'h-11',
      lg: 'h-13',
    },
    hoverable: {
      true: 'hover:bg-muted/50 cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    hoverable: false,
  },
});

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

export function Table({
  className,
  variant,
  size,
  ...props
}: TableProps) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn(tableVariants({ variant, size }), className)}
        {...props}
      />
    </div>
  );
}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      className={cn(
        'border-b border-border bg-muted/30',
        className
      )}
      {...props}
    />
  );
}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      className={cn(
        'border-t border-border bg-muted/30 font-semibold',
        className
      )}
      {...props}
    />
  );
}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {}

export function TableRow({
  className,
  variant,
  size,
  hoverable,
  ...props
}: TableRowProps) {
  return (
    <tr
      className={cn(tableRowVariants({ variant, size, hoverable }), className)}
      {...props}
    />
  );
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | false;
}

export function TableHead({
  className,
  sortable = false,
  sorted = false,
  children,
  ...props
}: TableHeadProps) {
  return (
    <th
      className={cn(
        'h-11 px-3 text-left align-middle font-bold text-xs uppercase tracking-widest text-muted-foreground [&:has([role=checkbox])]:pr-0',
        sortable && 'cursor-pointer select-none hover:text-foreground',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortable && (
          <span className="flex-shrink-0">
            {sorted === 'asc' && (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
            {sorted === 'desc' && (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            {!sorted && (
              <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            )}
          </span>
        )}
      </div>
    </th>
  );
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Applies monospace tabular nums for financial data */
  numeric?: boolean;
}

export function TableCell({
  className,
  numeric = false,
  ...props
}: TableCellProps) {
  return (
    <td
      className={cn(
        'px-3 align-middle [&:has([role=checkbox])]:pr-0',
        numeric && 'font-mono tabular-nums text-right',
        className
      )}
      {...props}
    />
  );
}

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}
