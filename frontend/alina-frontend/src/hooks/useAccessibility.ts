/**
 * Accessibility React Hooks
 * Custom hooks for implementing accessible components
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FocusTrap } from '@/lib/accessibility/keyboard-navigation';
import { announce } from '@/lib/accessibility/aria-helpers';
import { auditAccessibility, logA11yAudit } from '@/lib/accessibility/accessibility-audit';

/**
 * Hook for managing focus trap in modals/dialogs
 */
export function useFocusTrap(active: boolean = false) {
  const containerRef = useRef<HTMLElement>(null);
  const focusTrapRef = useRef<FocusTrap | null>(null);

  useEffect(() => {
    if (active && containerRef.current) {
      focusTrapRef.current = new FocusTrap(containerRef.current);
      focusTrapRef.current.activate();

      return () => {
        focusTrapRef.current?.deactivate();
      };
    }
  }, [active]);

  return containerRef;
}

/**
 * Hook for announcing messages to screen readers
 */
export function useA11yAnnouncer() {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite');

  const announceMessage = useCallback((msg: string, level: 'polite' | 'assertive' = 'polite') => {
    setMessage(msg);
    setPriority(level);
    announce(msg, level);

    // Clear after announcement
    setTimeout(() => setMessage(''), 1000);
  }, []);

  return { message, priority, announceMessage };
}

/**
 * Hook for keyboard navigation in lists
 */
export function useKeyboardListNavigation(
  itemCount: number,
  options: {
    orientation?: 'horizontal' | 'vertical';
    loop?: boolean;
    onSelect?: (index: number) => void;
  } = {}
) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { orientation = 'vertical', loop = true, onSelect } = options;

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const upKeys = orientation === 'vertical' ? ['ArrowUp'] : ['ArrowLeft'];
      const downKeys = orientation === 'vertical' ? ['ArrowDown'] : ['ArrowRight'];

      if (upKeys.includes(event.key)) {
        event.preventDefault();
        setFocusedIndex((prev) => {
          const newIndex = prev - 1;
          return newIndex < 0 ? (loop ? itemCount - 1 : 0) : newIndex;
        });
      } else if (downKeys.includes(event.key)) {
        event.preventDefault();
        setFocusedIndex((prev) => {
          const newIndex = prev + 1;
          return newIndex >= itemCount ? (loop ? 0 : itemCount - 1) : newIndex;
        });
      } else if (event.key === 'Home') {
        event.preventDefault();
        setFocusedIndex(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        setFocusedIndex(itemCount - 1);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect?.(focusedIndex);
      }
    },
    [focusedIndex, itemCount, loop, onSelect, orientation]
  );

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
    getItemProps: (index: number) => ({
      tabIndex: index === focusedIndex ? 0 : -1,
      'data-focused': index === focusedIndex,
      onFocus: () => setFocusedIndex(index),
    }),
  };
}

/**
 * Hook for managing roving tabindex
 */
export function useRovingTabIndex(itemCount: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getItemTabIndex = useCallback(
    (index: number) => (index === currentIndex ? 0 : -1),
    [currentIndex]
  );

  const setFocusedItem = useCallback((index: number) => {
    if (index >= 0 && index < itemCount) {
      setCurrentIndex(index);
    }
  }, [itemCount]);

  return {
    currentIndex,
    getItemTabIndex,
    setFocusedItem,
  };
}

/**
 * Hook for detecting click outside
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback]);

  return ref;
}

/**
 * Hook for managing focus on mount
 */
export function useAutoFocus<T extends HTMLElement = HTMLElement>(
  shouldFocus: boolean = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (shouldFocus && ref.current) {
      ref.current.focus();
    }
  }, [shouldFocus]);

  return ref;
}

/**
 * Hook for accessibility audit (development only)
 */
export function useA11yAudit(enabled: boolean = process.env.NODE_ENV === 'development') {
  useEffect(() => {
    if (!enabled) return;

    const runAudit = () => {
      const result = auditAccessibility();
      logA11yAudit(result);
    };

    // Run audit after page loads
    const timer = setTimeout(runAudit, 2000);

    return () => clearTimeout(timer);
  }, [enabled]);
}

/**
 * Hook for detecting reduced motion preference
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for keyboard-only focus indicators
 */
export function useKeyboardFocus() {
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);

  useEffect(() => {
    let isUsingKeyboard = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        isUsingKeyboard = true;
        setIsKeyboardFocus(true);
      }
    };

    const handleMouseDown = () => {
      isUsingKeyboard = false;
      setIsKeyboardFocus(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isKeyboardFocus;
}
