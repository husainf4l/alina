'use client';

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tabsVariants = cva('', {
  variants: {
    variant: {
      underline: 'border-b border-border',
      pills: 'p-1 bg-muted rounded-lg inline-flex',
      contained: 'border border-border rounded-lg overflow-hidden',
      simple: '',
    },
  },
  defaultVariants: {
    variant: 'underline',
  },
});

const tabVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        underline:
          'border-b-2 border-transparent px-4 py-2 hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground',
        pills:
          'rounded-md px-3 py-1.5 hover:bg-background/50 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground',
        contained:
          'flex-1 border-r border-border last:border-r-0 px-4 py-2 hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
        simple:
          'px-4 py-2 text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:font-semibold',
      },
    },
    defaultVariants: {
      variant: 'underline',
    },
  }
);

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant,
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue || ''
  );
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <div className={cn(tabsVariants({ variant }), className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as any, {
            variant,
            activeValue: value,
            onValueChange: handleValueChange,
          });
        }
        return child;
      })}
    </div>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof tabsVariants>['variant'];
  activeValue?: string;
  onValueChange?: (value: string) => void;
}

export function TabsList({
  className,
  variant,
  activeValue,
  onValueChange,
  children,
  ...props
}: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn('flex items-center', className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as any, {
            variant,
            activeValue,
            onValueChange,
          });
        }
        return child;
      })}
    </div>
  );
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  variant?: VariantProps<typeof tabVariants>['variant'];
  activeValue?: string;
  onValueChange?: (value: string) => void;
}

export function TabsTrigger({
  className,
  value,
  variant,
  activeValue,
  onValueChange,
  children,
  ...props
}: TabsTriggerProps) {
  const isActive = value === activeValue;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(tabVariants({ variant }), className)}
      onClick={() => onValueChange?.(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  activeValue?: string;
}

export function TabsContent({
  className,
  value,
  activeValue,
  children,
  ...props
}: TabsContentProps) {
  const isActive = value === activeValue;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(
        'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
