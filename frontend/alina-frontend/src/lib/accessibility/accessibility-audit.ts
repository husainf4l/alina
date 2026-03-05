/**
 * Accessibility Audit Utilities
 * Tools for auditing and testing accessibility compliance
 */

import { auditPageContrasts } from './color-contrast';

export interface A11yIssue {
  severity: 'critical' | 'serious' | 'moderate' | 'minor';
  category: string;
  description: string;
  element?: HTMLElement;
  wcagCriteria?: string;
  recommendation?: string;
}

export interface A11yAuditResult {
  score: number;
  passed: boolean;
  issues: A11yIssue[];
  warnings: string[];
  recommendations: string[];
  timestamp: Date;
}

/**
 * Run comprehensive accessibility audit
 */
export function auditAccessibility(): A11yAuditResult {
  const issues: A11yIssue[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  if (typeof window === 'undefined') {
    return {
      score: 0,
      passed: false,
      issues,
      warnings,
      recommendations,
      timestamp: new Date(),
    };
  }

  // 1. Check page structure
  checkPageStructure(issues, warnings);

  // 2. Check landmark regions
  checkLandmarks(issues, warnings);

  // 3. Check headings hierarchy
  checkHeadings(issues, warnings);

  // 4. Check images
  checkImages(issues, warnings);

  // 5. Check links
  checkLinks(issues, warnings);

  // 6. Check forms
  checkForms(issues, warnings);

  // 7. Check buttons
  checkButtons(issues, warnings);

  // 8. Check ARIA attributes
  checkAriaAttributes(issues, warnings);

  // 9. Check keyboard accessibility
  checkKeyboardAccessibility(issues, warnings);

  // 10. Check color contrast
  checkColorContrast(issues, warnings);

  // 11. Check focus indicators
  checkFocusIndicators(issues, warnings);

  // Generate recommendations
  generateRecommendations(recommendations);

  // Calculate score
  const criticalCount = issues.filter((i) => i.severity === 'critical').length;
  const seriousCount = issues.filter((i) => i.severity === 'serious').length;
  const moderateCount = issues.filter((i) => i.severity === 'moderate').length;
  const minorCount = issues.filter((i) => i.severity === 'minor').length;

  const score = Math.max(
    0,
    100 - (criticalCount * 20 + seriousCount * 10 + moderateCount * 5 + minorCount * 2)
  );

  const passed = criticalCount === 0 && seriousCount === 0 && score >= 80;

  return {
    score,
    passed,
    issues,
    warnings,
    recommendations,
    timestamp: new Date(),
  };
}

function checkPageStructure(issues: A11yIssue[], warnings: string[]): void {
  // Check for lang attribute
  if (!document.documentElement.hasAttribute('lang')) {
    issues.push({
      severity: 'serious',
      category: 'Page Structure',
      description: 'Missing lang attribute on <html> element',
      wcagCriteria: '3.1.1 Language of Page (Level A)',
      recommendation: 'Add lang attribute: <html lang="en">',
    });
  }

  // Check for page title
  if (!document.title || document.title.trim() === '') {
    issues.push({
      severity: 'serious',
      category: 'Page Structure',
      description: 'Missing or empty page title',
      wcagCriteria: '2.4.2 Page Titled (Level A)',
      recommendation: 'Provide a descriptive page title',
    });
  }

  // Check for viewport meta tag
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (!viewportMeta) {
    warnings.push('Missing viewport meta tag for responsive design');
  }
}

function checkLandmarks(issues: A11yIssue[], warnings: string[]): void {
  const main = document.querySelector('main, [role="main"]');
  if (!main) {
    issues.push({
      severity: 'serious',
      category: 'Landmarks',
      description: 'Missing <main> landmark or role="main"',
      wcagCriteria: '1.3.1 Info and Relationships (Level A)',
      recommendation: 'Add <main> element or role="main" to identify main content',
    });
  }

  const nav = document.querySelector('nav, [role="navigation"]');
  if (!nav) {
    warnings.push('No <nav> or role="navigation" found - consider adding for better navigation');
  }
}

function checkHeadings(issues: A11yIssue[], warnings: string[]): void {
  const h1Elements = document.querySelectorAll('h1');

  // Check for H1
  if (h1Elements.length === 0) {
    issues.push({
      severity: 'serious',
      category: 'Headings',
      description: 'No <h1> heading found on page',
      wcagCriteria: '1.3.1 Info and Relationships (Level A)',
      recommendation: 'Add a single <h1> that describes the main content',
    });
  } else if (h1Elements.length > 1) {
    warnings.push(`Multiple H1 headings found (${h1Elements.length}) - should have only one`);
  }

  // Check heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let previousLevel = 0;

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]);

    if (level - previousLevel > 1) {
      issues.push({
        severity: 'moderate',
        category: 'Headings',
        description: `Heading level skipped: ${heading.tagName} after H${previousLevel}`,
        element: heading as HTMLElement,
        wcagCriteria: '1.3.1 Info and Relationships (Level A)',
        recommendation: 'Maintain proper heading hierarchy (no skipping levels)',
      });
    }

    previousLevel = level;
  });
}

function checkImages(issues: A11yIssue[], warnings: string[]): void {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    // Check for alt attribute
    if (!img.hasAttribute('alt')) {
      issues.push({
        severity: 'critical',
        category: 'Images',
        description: `Image missing alt attribute: ${img.src}`,
        element: img,
        wcagCriteria: '1.1.1 Non-text Content (Level A)',
        recommendation: 'Add alt attribute (use alt="" for decorative images)',
      });
    }

    // Check for empty src
    if (!img.src) {
      issues.push({
        severity: 'moderate',
        category: 'Images',
        description: 'Image with empty src attribute',
        element: img,
      });
    }
  });
}

function checkLinks(issues: A11yIssue[], warnings: string[]): void {
  const links = document.querySelectorAll('a[href]');

  links.forEach((link) => {
    const text = link.textContent?.trim() || '';
    const ariaLabel = link.getAttribute('aria-label');
    const ariaLabelledBy = link.getAttribute('aria-labelledby');

    // Check for empty links
    if (!text && !ariaLabel && !ariaLabelledBy) {
      issues.push({
        severity: 'critical',
        category: 'Links',
        description: 'Link with no accessible text',
        element: link as HTMLElement,
        wcagCriteria: '2.4.4 Link Purpose (Level A)',
        recommendation: 'Provide link text or aria-label',
      });
    }

    // Check for generic link text
    const genericTexts = ['click here', 'read more', 'here', 'more', 'link'];
    if (genericTexts.includes(text.toLowerCase())) {
      warnings.push(`Link with generic text: "${text}" - consider more descriptive text`);
    }

    // Check for href="#"
    const href = (link as HTMLAnchorElement).getAttribute('href');
    if (href === '#' || href === 'javascript:void(0)') {
      warnings.push('Link with href="#" or javascript:void(0) - use <button> instead');
    }
  });
}

function checkForms(issues: A11yIssue[], warnings: string[]): void {
  const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea, select');

  inputs.forEach((input) => {
    const id = input.id;
    const label = id ? document.querySelector(`label[for="${id}"]`) : null;
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    const placeholder = input.getAttribute('placeholder');

    // Check for label
    if (!label && !ariaLabel && !ariaLabelledBy) {
      issues.push({
        severity: 'critical',
        category: 'Forms',
        description: `Form input missing label: ${input.getAttribute('name') || input.id || 'unnamed'}`,
        element: input as HTMLElement,
        wcagCriteria: '1.3.1 Info and Relationships (Level A), 3.3.2 Labels or Instructions (Level A)',
        recommendation: 'Add <label> element or aria-label attribute',
      });
    }

    // Warn about placeholder-only labels
    if (placeholder && !label && !ariaLabel) {
      warnings.push('Using placeholder without label - placeholders should not replace labels');
    }
  });
}

function checkButtons(issues: A11yIssue[], warnings: string[]): void {
  const buttons = document.querySelectorAll('button, [role="button"]');

  buttons.forEach((button) => {
    const text = button.textContent?.trim() || '';
    const ariaLabel = button.getAttribute('aria-label');

    // Check for empty buttons
    if (!text && !ariaLabel) {
      issues.push({
        severity: 'critical',
        category: 'Buttons',
        description: 'Button with no accessible text',
        element: button as HTMLElement,
        wcagCriteria: '4.1.2 Name, Role, Value (Level A)',
        recommendation: 'Provide button text or aria-label',
      });
    }
  });
}

function checkAriaAttributes(issues: A11yIssue[], warnings: string[]): void {
  const elementsWithAria = document.querySelectorAll('[aria-labelledby], [aria-describedby]');

  elementsWithAria.forEach((element) => {
    const labelledby = element.getAttribute('aria-labelledby');
    const describedby = element.getAttribute('aria-describedby');

    // Check if referenced ids exist
    if (labelledby) {
      labelledby.split(' ').forEach((id) => {
        if (!document.getElementById(id)) {
          issues.push({
            severity: 'serious',
            category: 'ARIA',
            description: `aria-labelledby references non-existent id: ${id}`,
            element: element as HTMLElement,
            wcagCriteria: '4.1.2 Name, Role, Value (Level A)',
          });
        }
      });
    }

    if (describedby) {
      describedby.split(' ').forEach((id) => {
        if (!document.getElementById(id)) {
          issues.push({
            severity: 'moderate',
            category: 'ARIA',
            description: `aria-describedby references non-existent id: ${id}`,
            element: element as HTMLElement,
          });
        }
      });
    }
  });
}

function checkKeyboardAccessibility(issues: A11yIssue[], warnings: string[]): void {
  // Check for onclick on non-interactive elements
  const clickableNonButtons = document.querySelectorAll('div[onclick], span[onclick]');

  clickableNonButtons.forEach((element) => {
    const role = element.getAttribute('role');
    const tabindex = element.getAttribute('tabindex');

    if (role !== 'button' || tabindex !== '0') {
      warnings.push(
        'onclick handler on non-button element - ensure it has role="button" and tabindex="0"'
      );
    }
  });
}

function checkColorContrast(issues: A11yIssue[], warnings: string[]): void {
  const contrastIssues = auditPageContrasts();

  contrastIssues.slice(0, 10).forEach((issue) => {
    issues.push({
      severity: 'moderate',
      category: 'Color Contrast',
      description: `Insufficient color contrast: ${issue.ratio.toFixed(2)}:1 (minimum 4.5:1)`,
      element: issue.element,
      wcagCriteria: '1.4.3 Contrast (Minimum) (Level AA)',
      recommendation: `Increase contrast between ${issue.foreground} and ${issue.background}`,
    });
  });

  if (contrastIssues.length > 10) {
    warnings.push(`${contrastIssues.length - 10} more contrast issues found`);
  }
}

function checkFocusIndicators(issues: A11yIssue[], warnings: string[]): void {
  // This is a simplified check - in production, you'd want to actually test focus styles
  const styleSheets = Array.from(document.styleSheets);

  let hasFocusStyles = false;
  try {
    styleSheets.forEach((sheet) => {
      if (sheet.cssRules) {
        Array.from(sheet.cssRules).forEach((rule) => {
          if (rule instanceof CSSStyleRule && rule.selectorText?.includes(':focus')) {
            hasFocusStyles = true;
          }
        });
      }
    });
  } catch (e) {
    // CORS may prevent reading stylesheets
  }

  if (!hasFocusStyles) {
    warnings.push('No :focus styles detected - ensure interactive elements have visible focus indicators');
  }
}

function generateRecommendations(recommendations: string[]): void {
  recommendations.push('Test with keyboard navigation (Tab, Enter, Space, Arrow keys)');
  recommendations.push('Test with screen reader (NVDA, JAWS, VoiceOver)');
  recommendations.push('Ensure all functionality is available via keyboard');
  recommendations.push('Maintain consistent navigation across pages');
  recommendations.push('Provide skip links for keyboard users');
  recommendations.push('Use semantic HTML elements when possible');
  recommendations.push('Test with browser zoom at 200%');
  recommendations.push('Ensure error messages are clearly associated with inputs');
}

/**
 * Log accessibility audit results
 */
export function logA11yAudit(result: A11yAuditResult): void {
  if (process.env.NODE_ENV !== 'development') return;

  console.group('♿ Accessibility Audit Report');
  console.log(`Score: ${result.score}/100 - ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Timestamp: ${result.timestamp.toLocaleString()}`);

  if (result.issues.length > 0) {
    console.group('Issues:');
    result.issues.forEach((issue) => {
      const icon =
        issue.severity === 'critical'
          ? '🔴'
          : issue.severity === 'serious'
          ? '🟠'
          : issue.severity === 'moderate'
          ? '🟡'
          : '🔵';
      console.log(`${icon} [${issue.severity.toUpperCase()}] ${issue.category}: ${issue.description}`);
      if (issue.wcagCriteria) console.log(`   WCAG: ${issue.wcagCriteria}`);
      if (issue.recommendation) console.log(`   Fix: ${issue.recommendation}`);
      if (issue.element) console.log('   Element:', issue.element);
    });
    console.groupEnd();
  }

  if (result.warnings.length > 0) {
    console.group('Warnings:');
    result.warnings.forEach((warning) => console.warn(warning));
    console.groupEnd();
  }

  if (result.recommendations.length > 0) {
    console.group('Recommendations:');
    result.recommendations.forEach((rec) => console.log(`💡 ${rec}`));
    console.groupEnd();
  }

  console.groupEnd();
}
