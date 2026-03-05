/**
 * Keyboard Navigation Utilities
 * Helpers for implementing accessible keyboard navigation
 */

export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

/**
 * Check if key matches
 */
export function isKey(event: KeyboardEvent, key: string | string[]): boolean {
  const keys = Array.isArray(key) ? key : [key];
  return keys.includes(event.key);
}

/**
 * Handle arrow key navigation in a list
 */
export function handleArrowNavigation(
  event: KeyboardEvent,
  currentIndex: number,
  itemCount: number,
  options: {
    orientation?: 'horizontal' | 'vertical';
    loop?: boolean;
    onNavigate?: (newIndex: number) => void;
  } = {}
): number {
  const { orientation = 'vertical', loop = true, onNavigate } = options;

  let newIndex = currentIndex;

  const upKeys = orientation === 'vertical' ? [KEYS.ARROW_UP] : [KEYS.ARROW_LEFT];
  const downKeys = orientation === 'vertical' ? [KEYS.ARROW_DOWN] : [KEYS.ARROW_RIGHT];

  if (isKey(event, upKeys)) {
    event.preventDefault();
    newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = loop ? itemCount - 1 : 0;
    }
  } else if (isKey(event, downKeys)) {
    event.preventDefault();
    newIndex = currentIndex + 1;
    if (newIndex >= itemCount) {
      newIndex = loop ? 0 : itemCount - 1;
    }
  } else if (isKey(event, KEYS.HOME)) {
    event.preventDefault();
    newIndex = 0;
  } else if (isKey(event, KEYS.END)) {
    event.preventDefault();
    newIndex = itemCount - 1;
  }

  if (newIndex !== currentIndex && onNavigate) {
    onNavigate(newIndex);
  }

  return newIndex;
}

/**
 * Trap focus within a container (for modals, dialogs)
 */
export class FocusTrap {
  private container: HTMLElement;
  private firstFocusable: HTMLElement | null = null;
  private lastFocusable: HTMLElement | null = null;
  private previousFocus: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.updateFocusableElements();
  }

  /**
   * Get all focusable elements in container
   */
  private getFocusableElements(): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const elements = Array.from(
      this.container.querySelectorAll<HTMLElement>(focusableSelectors)
    );

    return elements.filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    );
  }

  /**
   * Update focusable elements cache
   */
  private updateFocusableElements(): void {
    const focusable = this.getFocusableElements();
    this.firstFocusable = focusable[0] || null;
    this.lastFocusable = focusable[focusable.length - 1] || null;
  }

  /**
   * Handle tab key press
   */
  private handleTab = (event: KeyboardEvent): void => {
    if (!isKey(event, KEYS.TAB)) return;

    this.updateFocusableElements();

    if (!this.firstFocusable) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey) {
      // Shift + Tab: moving backwards
      if (document.activeElement === this.firstFocusable) {
        event.preventDefault();
        this.lastFocusable?.focus();
      }
    } else {
      // Tab: moving forwards
      if (document.activeElement === this.lastFocusable) {
        event.preventDefault();
        this.firstFocusable?.focus();
      }
    }
  };

  /**
   * Activate focus trap
   */
  activate(): void {
    this.previousFocus = document.activeElement as HTMLElement;
    this.container.addEventListener('keydown', this.handleTab);

    // Focus first element
    setTimeout(() => {
      this.updateFocusableElements();
      this.firstFocusable?.focus();
    }, 0);
  }

  /**
   * Deactivate focus trap
   */
  deactivate(): void {
    this.container.removeEventListener('keydown', this.handleTab);

    // Restore previous focus
    if (this.previousFocus && document.body.contains(this.previousFocus)) {
      this.previousFocus.focus();
    }
  }
}

/**
 * Skip to main content link handler
 */
export function setupSkipLink(): void {
  if (typeof window === 'undefined') return;

  const skipLink = document.getElementById('skip-to-main');
  const mainContent = document.getElementById('main-content');

  if (skipLink && mainContent) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/**
 * Roving tabindex manager for toolbars, menus, etc.
 */
export class RovingTabIndex {
  private items: HTMLElement[] = [];
  private currentIndex: number = 0;

  constructor(
    items: HTMLElement[],
    options: {
      orientation?: 'horizontal' | 'vertical';
      loop?: boolean;
    } = {}
  ) {
    this.items = items;
    this.updateTabIndices();

    // Add keyboard listeners
    items.forEach((item, index) => {
      item.addEventListener('keydown', (e) => this.handleKeyDown(e as KeyboardEvent, index));
      item.addEventListener('focus', () => this.setCurrentIndex(index));
    });
  }

  private updateTabIndices(): void {
    this.items.forEach((item, index) => {
      item.tabIndex = index === this.currentIndex ? 0 : -1;
    });
  }

  private setCurrentIndex(index: number): void {
    this.currentIndex = index;
    this.updateTabIndices();
  }

  private handleKeyDown(event: KeyboardEvent, currentIndex: number): void {
    const newIndex = handleArrowNavigation(event, currentIndex, this.items.length, {
      onNavigate: (idx) => {
        this.setCurrentIndex(idx);
        this.items[idx]?.focus();
      },
    });
  }

  /**
   * Update items
   */
  updateItems(items: HTMLElement[]): void {
    this.items = items;
    this.currentIndex = 0;
    this.updateTabIndices();
  }
}

/**
 * Handle Escape key to close modals/menus
 */
export function onEscape(callback: () => void): (event: KeyboardEvent) => void {
  return (event: KeyboardEvent) => {
    if (isKey(event, KEYS.ESCAPE)) {
      event.preventDefault();
      callback();
    }
  };
}

/**
 * Handle Enter/Space for accessible click on non-button elements
 */
export function onActivate(callback: (event: KeyboardEvent) => void): (event: KeyboardEvent) => void {
  return (event: KeyboardEvent) => {
    if (isKey(event, [KEYS.ENTER, KEYS.SPACE])) {
      event.preventDefault();
      callback(event);
    }
  };
}

/**
 * Detect if user is navigating with keyboard
 */
export function detectKeyboardNavigation(): void {
  if (typeof window === 'undefined') return;

  let isUsingKeyboard = false;

  // Detect Tab key
  window.addEventListener('keydown', (e) => {
    if (isKey(e, KEYS.TAB)) {
      isUsingKeyboard = true;
      document.body.classList.add('keyboard-navigation');
    }
  });

  // Detect mouse usage
  window.addEventListener('mousedown', () => {
    isUsingKeyboard = false;
    document.body.classList.remove('keyboard-navigation');
  });
}

/**
 * Focus visible polyfill for older browsers
 */
export function setupFocusVisible(): void {
  if (typeof window === 'undefined') return;

  // Check if :focus-visible is supported
  try {
    document.querySelector(':focus-visible');
  } catch {
    // Polyfill for browsers without :focus-visible
    detectKeyboardNavigation();
  }
}
