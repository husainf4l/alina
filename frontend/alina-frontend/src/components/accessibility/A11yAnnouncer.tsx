/**
 * Accessibility Announcer Component
 * Screen reader live region for dynamic announcements
 */

'use client';

import { useEffect, useRef } from 'react';

interface A11yAnnouncerProps {
  message?: string;
  priority?: 'polite' | 'assertive';
  clearDelay?: number;
}

export function A11yAnnouncer({
  message,
  priority = 'polite',
  clearDelay = 1000,
}: A11yAnnouncerProps) {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message && regionRef.current) {
      regionRef.current.textContent = message;

      const timer = setTimeout(() => {
        if (regionRef.current) {
          regionRef.current.textContent = '';
        }
      }, clearDelay);

      return () => clearTimeout(timer);
    }
  }, [message, clearDelay]);

  return (
    <div
      ref={regionRef}
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    />
  );
}

/**
 * Global announcer component
 * Place once in root layout
 */
export function GlobalA11yAnnouncer() {
  return (
    <div
      id="a11y-announcer"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
}
