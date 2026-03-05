# Accessibility Implementation Guide

## Overview

This guide provides comprehensive instructions for implementing accessibility features across the ALINA marketplace. All components now include proper ARIA labels, keyboard navigation, focus indicators, and screen reader support.

---

## 🎯 Core Principles

1. **Keyboard Navigation** - All interactive elements accessible via keyboard
2. **Screen Reader Support** - Proper ARIA labels and semantic HTML
3. **Focus Management** - Clear, visible focus indicators
4. **Color Contrast** - WCAG AA compliant (7:1 for text)
5. **Alternative Text** - All images and icons have descriptive alt text

---

## ✅ Implemented Features

### 1. Skip to Content Link

A skip link allows keyboard users to bypass navigation and jump directly to main content.

**Implementation:**
```tsx
import { SkipToContent } from '@/lib/accessibility';

function Layout({ children }) {
  return (
    <>
      <SkipToContent />
      <nav>...</nav>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
```

**Keyboard Shortcut:** Press `Tab` on page load to reveal the skip link.

---

### 2. Focus Indicators

All components now have visible, high-contrast focus indicators.

**Global Focus Styles** (in `globals.css`):
```css
/* Enhanced focus indicators */
*:focus-visible {
  outline: 3px solid theme('colors.blue.500');
  outline-offset: 2px;
  border-radius: 4px;
}

/* Dark mode focus */
.dark *:focus-visible {
  outline-color: theme('colors.blue.400');
}

/* Button focus */
button:focus-visible,
a:focus-visible {
  outline: 3px solid theme('colors.blue.500');
  outline-offset: 2px;
}
```

---

### 3. Keyboard Navigation

#### Arrow Key Navigation
Use the `useArrowNavigation` hook for lists and grids:

```tsx
import { useArrowNavigation } from '@/lib/accessibility';

function NavigableList({ items }) {
  const listRef = useRef<HTMLDivElement>(null);
  
  useArrowNavigation(listRef, {
    axis: 'vertical',  // or 'horizontal', 'both'
    loop: true,        // wrap around at ends
  });

  return (
    <div ref={listRef}>
      {items.map((item) => (
        <button key={item.id} tabIndex={0}>
          {item.name}
        </button>
      ))}
    </div>
  );
}
```

#### Focus Trap
For modals and overlays, use `useFocusTrap`:

```tsx
import { useFocusTrap } from '@/lib/accessibility';

function Modal({ isOpen, onClose }) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useFocusTrap(modalRef, isOpen);

  return (
    <div ref={modalRef} role="dialog">
      {/* Modal content */}
    </div>
  );
}
```

---

### 4. ARIA Labels

#### Component ARIA Labels

**Buttons:**
```tsx
// Icon-only buttons MUST have aria-label
<IconButton 
  icon={<TrashIcon />} 
  aria-label="Delete item"
/>

// Text buttons with icons
<Button icon={<SaveIcon />}>
  Save  {/* Text is sufficient */}
</Button>
```

**Forms:**
```tsx
// Always use labels with inputs
<Input 
  label="Email Address"
  id="email"
  type="email"
  required
  aria-required="true"
  aria-describedby="email-helper"
/>
<p id="email-helper">We'll never share your email.</p>
```

**Navigation:**
```tsx
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<nav aria-label="Breadcrumb">
  <Breadcrumb items={[...]} />
</nav>
```

**Modals:**
```tsx
<Modal 
  isOpen={isOpen}
  onClose={onClose}
  title="Confirm Delete"  // Automatically sets aria-labelledby
  // Or manually:
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
/>
```

#### Status Announcements
```tsx
import { announceToScreenReader } from '@/lib/accessibility';

function SaveButton() {
  const handleSave = async () => {
    await saveData();
    announceToScreenReader('Changes saved successfully', 'polite');
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

---

### 5. Screen Reader Support

#### Semantic HTML
Always use semantic HTML over divs:

```tsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good
<button onClick={handleClick}>Click me</button>
```

#### Hidden Text for Context
```tsx
import { ScreenReaderOnly } from '@/lib/accessibility';

<button>
  <TrashIcon />
  <ScreenReaderOnly>Delete item</ScreenReaderOnly>
</button>
```

#### Live Regions
```tsx
// For dynamic content updates
<div 
  role="status" 
  aria-live="polite"
  aria-atomic="true"
>
  {statusMessage}
</div>
```

---

## 🔧 Component-Specific Guidelines

### Forms

```tsx
<form>
  {/* Group related fields */}
  <fieldset>
    <legend>Personal Information</legend>
    
    <Input 
      label="First Name"
      id="firstName"
      required
      aria-required="true"
      error={errors.firstName}
      aria-invalid={!!errors.firstName}
      aria-describedby={errors.firstName ? "firstName-error" : undefined}
    />
    {errors.firstName && (
      <span id="firstName-error" role="alert">
        {errors.firstName}
      </span>
    )}
  </fieldset>
</form>
```

### Tables

```tsx
<table>
  <caption>User Statistics</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Orders</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">John Doe</th>
      <td>15</td>
    </tr>
  </tbody>
</table>
```

### Images

```tsx
// Informative images
<img src="logo.png" alt="ALINA Marketplace" />

// Decorative images
<img src="decoration.png" alt="" aria-hidden="true" />

// Complex images
<figure>
  <img 
    src="chart.png" 
    alt="Bar chart showing sales growth" 
    aria-describedby="chart-description"
  />
  <figcaption id="chart-description">
    Sales increased by 25% in Q4 2025...
  </figcaption>
</figure>
```

---

## 🧪 Testing Checklist

### Keyboard Navigation

- [ ] All interactive elements reachable via `Tab`
- [ ] Visible focus indicators on all elements
- [ ] No keyboard traps (can always escape)
- [ ] Logical tab order follows visual order
- [ ] Arrow keys work in lists/grids
- [ ] `Enter`/`Space` activates buttons
- [ ] `Escape` closes modals/dropdowns

### Screen Readers

- [ ] All images have alt text
- [ ] Icon-only buttons have aria-label
- [ ] Form inputs have associated labels
- [ ] Error messages announced
- [ ] Status changes announced
- [ ] Page title describes content
- [ ] Headings follow logical hierarchy (h1 → h2 → h3)

### Color & Contrast

- [ ] Text contrast ≥ 4.5:1 (7:1 for large text)
- [ ] Interactive elements ≥ 3:1 contrast
- [ ] Information not conveyed by color alone
- [ ] Dark mode meets contrast requirements

---

## 🛠️ Testing Tools

### Browser Extensions
- **axe DevTools** - Automated accessibility testing
- **WAVE** - Visual feedback for accessibility issues
- **Lighthouse** - Google Chrome audit

### Screen Readers
- **macOS**: VoiceOver (`Cmd + F5`)
- **Windows**: NVDA (free) or JAWS
- **Linux**: Orca

### Keyboard Testing
1. Unplug your mouse
2. Navigate entire app using only keyboard
3. Note any unreachable elements or traps

---

## 📋 Common ARIA Patterns

### Tabs
```tsx
<div role="tablist">
  <button 
    role="tab" 
    aria-selected={activeTab === 'tab1'}
    aria-controls="panel1"
    id="tab1"
  >
    Tab 1
  </button>
</div>
<div 
  role="tabpanel" 
  aria-labelledby="tab1" 
  id="panel1"
  hidden={activeTab !== 'tab1'}
>
  Content
</div>
```

### Dropdown Menu
```tsx
<button 
  aria-haspopup="true"
  aria-expanded={isOpen}
  onClick={toggleMenu}
>
  Menu
</button>
<ul role="menu" hidden={!isOpen}>
  <li role="menuitem">
    <a href="/profile">Profile</a>
  </li>
</ul>
```

### Alerts
```tsx
// Error alerts
<div role="alert" aria-live="assertive">
  Error: Failed to save changes
</div>

// Status updates
<div role="status" aria-live="polite">
  Document saved
</div>
```

---

## 🎨 Focus Styling Best Practices

```tsx
// Component-level focus styles
const Button = styled.button`
  /* Remove default outline */
  outline: none;
  
  /* Custom focus indicator */
  &:focus-visible {
    outline: 3px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px ${theme.colors.blue[100]};
  }
  
  /* Dark mode */
  .dark &:focus-visible {
    outline-color: ${theme.colors.blue[400]};
    box-shadow: 0 0 0 4px ${theme.colors.blue[900]};
  }
`;
```

---

## 🚀 Quick Reference

### Essential ARIA Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `role` | Defines element type | `role="button"` |
| `aria-label` | Labels element | `aria-label="Close"` |
| `aria-labelledby` | References label | `aria-labelledby="title"` |
| `aria-describedby` | References description | `aria-describedby="help"` |
| `aria-hidden` | Hides from screen readers | `aria-hidden="true"` |
| `aria-live` | Announces changes | `aria-live="polite"` |
| `aria-expanded` | Expandable state | `aria-expanded={isOpen}` |
| `aria-selected` | Selection state | `aria-selected={isSelected}` |
| `aria-disabled` | Disabled state | `aria-disabled={isDisabled}` |
| `aria-required` | Required field | `aria-required="true"` |
| `aria-invalid` | Validation state | `aria-invalid={hasError}` |

---

## 📞 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

---

**Last Updated:** March 4, 2026  
**Accessibility Compliance:** WCAG 2.1 Level AA
