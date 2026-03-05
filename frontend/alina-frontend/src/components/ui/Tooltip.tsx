'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 200,
  className = '',
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + 8;
        break;
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible]);

  // Update position on scroll or resize
  useEffect(() => {
    if (!isVisible) return;

    const handleUpdate = () => updatePosition();
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [isVisible]);

  const positionClasses = {
    top: 'mb-2',
    bottom: 'mt-2',
    left: 'mr-2',
    right: 'ml-2',
  };

  const arrowClasses = {
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700',
    bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700',
    left: 'right-[-4px] top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700',
    right: 'left-[-4px] top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700',
  };

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>

      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`
            fixed
            z-50
            px-3
            py-2
            text-sm
            font-medium
            text-white
            bg-gray-900
            dark:bg-gray-700
            rounded-lg
            shadow-lg
            max-w-xs
            ${positionClasses[position]}
            ${className}
          `}
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
        >
          {content}
          
          {/* Arrow */}
          <div
            className={`
              absolute
              w-0
              h-0
              border-4
              border-transparent
              ${arrowClasses[position]}
            `}
          />
        </div>
      )}
    </>
  );
};

// Simple tooltip for common use cases
export const SimpleTooltip: React.FC<{
  text: string;
  children: React.ReactElement;
  position?: TooltipProps['position'];
}> = ({ text, children, position = 'top' }) => {
  return (
    <Tooltip content={text} position={position}>
      {children}
    </Tooltip>
  );
};
