/**
 * ARIA (Accessible Rich Internet Applications) Helpers
 * Utilities for creating accessible components with proper ARIA attributes
 */

/**
 * Generate unique ID for ARIA relationships
 */
export function generateAriaId(prefix: string = 'aria'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * ARIA live region announcer
 * Announces dynamic content changes to screen readers
 */
export class AriaLiveAnnouncer {
  private static instance: AriaLiveAnnouncer;
  private liveRegion: HTMLElement | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.createLiveRegion();
    }
  }

  static getInstance(): AriaLiveAnnouncer {
    if (!AriaLiveAnnouncer.instance) {
      AriaLiveAnnouncer.instance = new AriaLiveAnnouncer();
    }
    return AriaLiveAnnouncer.instance;
  }

  private createLiveRegion(): void {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.setAttribute('role', 'status');
    this.liveRegion.className = 'sr-only'; // Screen reader only
    document.body.appendChild(this.liveRegion);
  }

  /**
   * Announce message to screen readers
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.liveRegion) return;

    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = '';
      }
    }, 1000);
  }
}

/**
 * Get ARIA attributes for form inputs
 */
export function getFormAriaProps(
  id: string,
  options: {
    label?: string;
    required?: boolean;
    error?: string;
    description?: string;
  }
): Record<string, string | boolean> {
  const props: Record<string, string | boolean> = {
    id,
  };

  if (options.required) {
    props['aria-required'] = true;
  }

  if (options.error) {
    props['aria-invalid'] = true;
    props['aria-errormessage'] = `${id}-error`;
  }

  if (options.description) {
    props['aria-describedby'] = `${id}-description`;
  }

  return props;
}

/**
 * Get ARIA attributes for buttons
 */
export function getButtonAriaProps(options: {
  label?: string;
  pressed?: boolean;
  expanded?: boolean;
  controls?: string;
  disabled?: boolean;
  loading?: boolean;
}): Record<string, string | boolean> {
  const props: Record<string, string | boolean> = {};

  if (options.label) {
    props['aria-label'] = options.label;
  }

  if (typeof options.pressed === 'boolean') {
    props['aria-pressed'] = options.pressed;
  }

  if (typeof options.expanded === 'boolean') {
    props['aria-expanded'] = options.expanded;
  }

  if (options.controls) {
    props['aria-controls'] = options.controls;
  }

  if (options.disabled) {
    props['aria-disabled'] = true;
  }

  if (options.loading) {
    props['aria-busy'] = true;
  }

  return props;
}

/**
 * Get ARIA attributes for dialogs/modals
 */
export function getDialogAriaProps(options: {
  titleId: string;
  descriptionId?: string;
  modal?: boolean;
}): Record<string, string | boolean> {
  return {
    role: options.modal ? 'dialog' : 'alertdialog',
    'aria-labelledby': options.titleId,
    ...(options.descriptionId && { 'aria-describedby': options.descriptionId }),
    'aria-modal': options.modal ?? true,
  };
}

/**
 * Get ARIA attributes for navigation menus
 */
export function getMenuAriaProps(options: {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  currentIndex?: number;
}): Record<string, string | boolean | number> {
  const props: Record<string, string | boolean | number> = {
    role: 'menu',
  };

  if (options.label) {
    props['aria-label'] = options.label;
  }

  if (options.orientation) {
    props['aria-orientation'] = options.orientation;
  }

  if (typeof options.currentIndex === 'number') {
    props['aria-activedescendant'] = `menu-item-${options.currentIndex}`;
  }

  return props;
}

/**
 * Get ARIA attributes for tabs
 */
export function getTabsAriaProps(options: {
  tabId: string;
  panelId: string;
  selected: boolean;
  index: number;
}): {
  tab: Record<string, string | boolean | number>;
  panel: Record<string, string | boolean>;
} {
  return {
    tab: {
      id: options.tabId,
      role: 'tab',
      'aria-selected': options.selected,
      'aria-controls': options.panelId,
      tabIndex: options.selected ? 0 : -1,
    } as Record<string, string | boolean | number>,
    panel: {
      id: options.panelId,
      role: 'tabpanel',
      'aria-labelledby': options.tabId,
      hidden: !options.selected,
    },
  };
}

/**
 * Get ARIA attributes for progress indicators
 */
export function getProgressAriaProps(options: {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  indeterminate?: boolean;
}): Record<string, string | number | undefined> {
  const props: Record<string, string | number | undefined> = {
    role: 'progressbar',
  };

  if (options.label) {
    props['aria-label'] = options.label;
  }

  if (!options.indeterminate) {
    props['aria-valuenow'] = options.value ?? 0;
    props['aria-valuemin'] = options.min ?? 0;
    props['aria-valuemax'] = options.max ?? 100;
  }

  return props;
}

/**
 * Get ARIA attributes for alerts/toasts
 */
export function getAlertAriaProps(options: {
  type?: 'info' | 'success' | 'warning' | 'error';
  live?: 'polite' | 'assertive';
}): Record<string, string> {
  return {
    role: 'alert',
    'aria-live': options.live ?? (options.type === 'error' ? 'assertive' : 'polite'),
    'aria-atomic': 'true',
  };
}

/**
 * Get ARIA attributes for tooltips
 */
export function getTooltipAriaProps(tooltipId: string): {
  trigger: Record<string, string>;
  tooltip: Record<string, string>;
} {
  return {
    trigger: {
      'aria-describedby': tooltipId,
    },
    tooltip: {
      id: tooltipId,
      role: 'tooltip',
    },
  };
}

/**
 * Get ARIA attributes for accordions
 */
export function getAccordionAriaProps(options: {
  buttonId: string;
  panelId: string;
  expanded: boolean;
}): {
  button: Record<string, string | boolean>;
  panel: Record<string, string | boolean>;
} {
  return {
    button: {
      id: options.buttonId,
      'aria-expanded': options.expanded,
      'aria-controls': options.panelId,
    },
    panel: {
      id: options.panelId,
      role: 'region',
      'aria-labelledby': options.buttonId,
      hidden: !options.expanded,
    },
  };
}

/**
 * Get ARIA attributes for combobox/autocomplete
 */
export function getComboboxAriaProps(options: {
  inputId: string;
  listboxId: string;
  expanded: boolean;
  activeDescendant?: string;
}): {
  input: Record<string, string | boolean>;
  listbox: Record<string, string>;
} {
  return {
    input: {
      id: options.inputId,
      role: 'combobox',
      'aria-expanded': options.expanded,
      'aria-controls': options.listboxId,
      'aria-autocomplete': 'list',
      ...(options.activeDescendant && {
        'aria-activedescendant': options.activeDescendant,
      }),
    },
    listbox: {
      id: options.listboxId,
      role: 'listbox',
    },
  };
}

/**
 * Announce to screen readers
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcer = AriaLiveAnnouncer.getInstance();
  announcer.announce(message, priority);
}
