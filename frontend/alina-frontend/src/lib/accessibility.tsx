/**
 * Accessibility Utilities
 * 
 * Helper functions and hooks for implementing accessibility features
 * across the application.
 */

import { useEffect, RefObject } from 'react';

/**
 * Skip to Content Link Component
 * Allows keyboard users to skip navigation and jump directly to main content
 */
export const SkipToContent = () => {
  const handleSkip = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:font-semibold focus:shadow-xl"
    >
      Skip to main content
    </a>
  );
};

/**
 * Focus Management Hook
 * Manages focus for modals, drawers, and other overlays
 */
export const useFocusTrap = (
  containerRef: RefObject<HTMLElement>,
  isActive: boolean
) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element on mount
    firstElement?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab (backwards)
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab (forwards)
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive, containerRef]);
};

/**
 * Keyboard Navigation Hook
 * Adds arrow key navigation for lists and grids
 */
export const useArrowNavigation = (
  containerRef: RefObject<HTMLElement>,
  options: {
    axis?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean;
    selector?: string;
  } = {}
) => {
  const {
    axis = 'both',
    loop = true,
    selector = '[role="button"], button, a, [tabindex="0"]',
  } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const handleArrowKeys = (e: KeyboardEvent) => {
      const items = Array.from(
        container.querySelectorAll<HTMLElement>(selector)
      );
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);

      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      if ((axis === 'vertical' || axis === 'both') && e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = currentIndex + 1;
      } else if (
        (axis === 'vertical' || axis === 'both') &&
        e.key === 'ArrowUp'
      ) {
        e.preventDefault();
        nextIndex = currentIndex - 1;
      } else if (
        (axis === 'horizontal' || axis === 'both') &&
        e.key === 'ArrowRight'
      ) {
        e.preventDefault();
        nextIndex = currentIndex + 1;
      } else if (
        (axis === 'horizontal' || axis === 'both') &&
        e.key === 'ArrowLeft'
      ) {
        e.preventDefault();
        nextIndex = currentIndex - 1;
      } else {
        return;
      }

      // Handle looping
      if (loop) {
        if (nextIndex >= items.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = items.length - 1;
      } else {
        nextIndex = Math.max(0, Math.min(items.length - 1, nextIndex));
      }

      items[nextIndex]?.focus();
    };

    container.addEventListener('keydown', handleArrowKeys);

    return () => {
      container.removeEventListener('keydown', handleArrowKeys);
    };
  }, [containerRef, axis, loop, selector]);
};

/**
 * Announce to Screen Readers
 * Uses ARIA live regions to announce dynamic content changes
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Generate unique ID for form labels
 */
let idCounter = 0;
export const useUniqueId = (prefix = 'id') => {
  const [id] = React.useState(() => `${prefix}-${++idCounter}`);
  return id;
};

/**
 * ARIA Labels Helper
 * Provides consistent ARIA labels for common UI patterns
 */
export const ariaLabels = {
  // Navigation
  closeDialog: 'Close dialog',
  closeModal: 'Close modal',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  nextPage: 'Next page',
  previousPage: 'Previous page',
  
  // Form
  required: 'Required field',
  optional: 'Optional field',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  
  // Loading
  loading: 'Loading',
  loadingContent: 'Loading content',
  
  // Status
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Information',
  
  // Actions
  edit: 'Edit',
  delete: 'Delete',
  save: 'Save',
  cancel: 'Cancel',
  confirm: 'Confirm',
  
  // Media
  playVideo: 'Play video',
  pauseVideo: 'Pause video',
  muteAudio: 'Mute audio',
  unmuteAudio: 'Unmute audio',
};

/**
 * Screen Reader Only Text Component
 * Visually hidden but accessible to screen readers
 */
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <span className="sr-only">{children}</span>;
};

/**
 * Visually Hidden Component (with focus visibility)
 * Hidden visually but visible when focused (for skip links)
 */
export const VisuallyHidden: React.FC<{
  children: React.ReactNode;
  focusable?: boolean;
}> = ({ children, focusable = false }) => {
  return (
    <span className={focusable ? 'sr-only focus:not-sr-only' : 'sr-only'}>
      {children}
    </span>
  );
};

import React from 'react';
