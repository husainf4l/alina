/**
 * Focus Management Utilities
 * Tools for managing focus in accessible web applications
 */

/**
 * Focus manager for tracking and restoring focus
 */
export class FocusManager {
  private focusHistory: HTMLElement[] = [];
  private maxHistoryLength: number = 10;

  /**
   * Save current focus
   */
  saveFocus(): void {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      this.focusHistory.push(activeElement);
      if (this.focusHistory.length > this.maxHistoryLength) {
        this.focusHistory.shift();
      }
    }
  }

  /**
   * Restore previous focus
   */
  restoreFocus(): boolean {
    const previousFocus = this.focusHistory.pop();
    if (previousFocus && document.body.contains(previousFocus)) {
      previousFocus.focus();
      return true;
    }
    return false;
  }

  /**
   * Clear focus history
   */
  clearHistory(): void {
    this.focusHistory = [];
  }
}

/**
 * Global focus manager instance
 */
export const focusManager = new FocusManager();

/**
 * Move focus to element
 */
export function moveFocusTo(
  element: HTMLElement | string,
  options: {
    preventScroll?: boolean;
    select?: boolean;
  } = {}
): boolean {
  const el = typeof element === 'string' ? document.getElementById(element) : element;

  if (!el) return false;

  el.focus({ preventScroll: options.preventScroll });

  // Select text if it's an input
  if (options.select && el instanceof HTMLInputElement) {
    el.select();
  }

  return true;
}

/**
 * Get first focusable element in container
 */
export function getFirstFocusable(container: HTMLElement): HTMLElement | null {
  const focusableElements = getFocusableElements(container);
  return focusableElements[0] || null;
}

/**
 * Get last focusable element in container
 */
export function getLastFocusable(container: HTMLElement): HTMLElement | null {
  const focusableElements = getFocusableElements(container);
  return focusableElements[focusableElements.length - 1] || null;
}

/**
 * Get all focusable elements in container
 */
export function getFocusableElements(container: HTMLElement = document.body): HTMLElement[] {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]:not([contenteditable="false"])',
  ].join(', ');

  const elements = Array.from(container.querySelectorAll<HTMLElement>(selectors));

  return elements.filter((el) => {
    // Filter out disabled and invisible elements
    if (el.hasAttribute('disabled') || el.getAttribute('aria-hidden') === 'true') {
      return false;
    }

    // Check if element is visible
    const style = window.getComputedStyle(el);
    if (
      style.display === 'none' ||
      style.visibility === 'hidden' ||
      parseFloat(style.opacity) === 0
    ) {
      return false;
    }

    // Check if element or parent has display: none
    let parent = el.parentElement;
    while (parent) {
      const parentStyle = window.getComputedStyle(parent);
      if (parentStyle.display === 'none' || parentStyle.visibility === 'hidden') {
        return false;
      }
      parent = parent.parentElement;
    }

    return true;
  });
}

/**
 * Check if element is currently focused
 */
export function isFocused(element: HTMLElement): boolean {
  return document.activeElement === element;
}

/**
 * Check if focus is within container
 */
export function isFocusWithin(container: HTMLElement): boolean {
  return container.contains(document.activeElement);
}

/**
 * Focus first invalid form field
 */
export function focusFirstInvalidField(form: HTMLFormElement): boolean {
  const invalidField = form.querySelector<HTMLElement>('[aria-invalid="true"], :invalid');
  if (invalidField) {
    moveFocusTo(invalidField, { preventScroll: false });
    return true;
  }
  return false;
}

/**
 * Create a focus guard (invisible focusable element)
 */
export function createFocusGuard(): HTMLElement {
  const guard = document.createElement('div');
  guard.tabIndex = 0;
  guard.style.position = 'fixed';
  guard.style.width = '1px';
  guard.style.height = '1px';
  guard.style.padding = '0';
  guard.style.margin = '-1px';
  guard.style.overflow = 'hidden';
  guard.style.clip = 'rect(0, 0, 0, 0)';
  guard.style.whiteSpace = 'nowrap';
  guard.style.border = '0';
  guard.setAttribute('aria-hidden', 'true');
  return guard;
}

/**
 * Lock body scroll when modal is open
 */
export function lockBodyScroll(): () => void {
  if (typeof window === 'undefined') return () => {};

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  const originalOverflow = document.body.style.overflow;
  const originalPaddingRight = document.body.style.paddingRight;

  document.body.style.overflow = 'hidden';
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  // Return unlock function
  return () => {
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  };
}

/**
 * Focus next tabbable element
 */
export function focusNext(currentElement?: HTMLElement): void {
  const current = currentElement || (document.activeElement as HTMLElement);
  const focusable = getFocusableElements();
  const currentIndex = focusable.indexOf(current);

  if (currentIndex >= 0 && currentIndex < focusable.length - 1) {
    focusable[currentIndex + 1]?.focus();
  }
}

/**
 * Focus previous tabbable element
 */
export function focusPrevious(currentElement?: HTMLElement): void {
  const current = currentElement || (document.activeElement as HTMLElement);
  const focusable = getFocusableElements();
  const currentIndex = focusable.indexOf(current);

  if (currentIndex > 0) {
    focusable[currentIndex - 1]?.focus();
  }
}

/**
 * Observe focus changes
 */
export function observeFocus(
  callback: (element: Element | null) => void
): () => void {
  const handleFocusIn = (e: FocusEvent) => {
    callback(e.target as Element);
  };

  const handleFocusOut = () => {
    callback(null);
  };

  document.addEventListener('focusin', handleFocusIn);
  document.addEventListener('focusout', handleFocusOut);

  return () => {
    document.removeEventListener('focusin', handleFocusIn);
    document.removeEventListener('focusout', handleFocusOut);
  };
}
