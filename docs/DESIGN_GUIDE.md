# Design Guide - Financial Calculator Website

## Brand Identity

**Brand Positioning:** Professional financial tools that prioritize clarity, trust, and ease of use over flashy features.

**Design Principles:**
- Typography-first design
- Generous whitespace
- Subtle, purposeful interactions
- Ruthless consistency
- Mobile-first approach

---

## Typography System

### Fonts

**Display Font (H1 only):**
- **Font:** Cabinet Grotesk (or Clash Display as fallback)
- **Usage:** Hero sections, main page titles only
- **Weight:** 600 (Semibold) for H1

**Body Font (Everything else):**
- **Font:** Inter
- **Usage:** H2-H6, paragraphs, UI elements, buttons, labels
- **Weights:** 400 (regular), 500 (medium), 600 (semibold)

**Monospace Font (Numbers/Data):**
- **Font:** JetBrains Mono
- **Usage:** Calculator results, currency values, percentages, data tables
- **Enable:** `font-variant-numeric: tabular-nums` for alignment

### Type Scale

```css
/* Base: 16px */
--text-xs: 0.75rem;    /* 12px - labels, helper text */
--text-sm: 0.875rem;   /* 14px - secondary text */
--text-base: 1rem;     /* 16px - body text */
--text-lg: 1.125rem;   /* 18px - large body */
--text-xl: 1.25rem;    /* 20px - H4 */
--text-2xl: 1.5rem;    /* 24px - H3 */
--text-3xl: 1.875rem;  /* 30px - H2 */
--text-4xl: 2.25rem;   /* 36px - H2 large */
--text-5xl: 3rem;      /* 48px - H1 internal pages */
--text-6xl: 3.75rem;   /* 60px - H1 hero */

/* Mobile: Reduce by 15-20% */
@media (max-width: 640px) {
  --text-6xl: 3rem;    /* 48px */
  --text-5xl: 2.5rem;  /* 40px */
  --text-4xl: 2rem;    /* 32px */
  --text-3xl: 1.5rem;  /* 24px */
}
```

### Typography Rules

**Line Heights:**
- Headings (H1-H2): 1.2
- Headings (H3-H6): 1.3
- Body text: 1.7
- Small text: 1.5

**Letter Spacing:**
- Large headings (48px+): -0.02em
- Medium headings (24-36px): -0.01em
- Body text: normal (0em)
- Labels/badges: 0.05em

**Paragraph Width:**
- Maximum: 65ch (~800px)
- Forms: 600px max

---

## Color System

### Primary Palette

```css
/* Primary - Deep Indigo (professional, trustworthy) */
--color-primary-50: #EEF2FF;
--color-primary-100: #E0E7FF;
--color-primary-200: #C7D2FE;
--color-primary-300: #A5B4FC;
--color-primary-400: #818CF8;
--color-primary-500: #6366F1;  /* Main brand color */
--color-primary-600: #4F46E5;  /* Hover states */
--color-primary-700: #4338CA;
--color-primary-800: #3730A3;
--color-primary-900: #312E81;

/* Neutrals - Slate */
--color-slate-50: #F8FAFC;
--color-slate-100: #F1F5F9;
--color-slate-200: #E2E8F0;
--color-slate-300: #CBD5E1;
--color-slate-400: #94A3B8;
--color-slate-500: #64748B;
--color-slate-600: #475569;
--color-slate-700: #334155;
--color-slate-800: #1E293B;
--color-slate-900: #0F172A;

/* Semantic Colors */
--color-success: #10B981;    /* Green - positive results */
--color-warning: #F59E0B;    /* Amber - caution */
--color-error: #EF4444;      /* Red - errors */
--color-info: #3B82F6;       /* Blue - information */
```

### Color Usage

**Text Colors:**
```css
.text-primary { color: var(--color-slate-900); }
.text-secondary { color: var(--color-slate-600); }
.text-tertiary { color: var(--color-slate-500); }
.text-disabled { color: var(--color-slate-400); }
```

**Backgrounds:**
```css
.bg-primary { background: white; }
.bg-secondary { background: var(--color-slate-50); }
.bg-tertiary { background: var(--color-slate-100); }
```

**Interactive Elements:**
- Primary buttons: `bg-primary-500`, white text
- Secondary buttons: white bg, `border-slate-300`
- Links: `text-primary-600`
- Hover: Darken by one shade
- Focus: `border-primary-500` with subtle shadow

---

## Spacing System (8pt Grid)

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

### Spacing Applications

**Component Padding:**
- Buttons: 12px × 24px (`space-3` × `space-6`)
- Cards: 32px (`space-8`)
- Form inputs: 16px × 20px (`space-4` × `space-5`)
- Sections: 64-96px (`space-16` to `space-24`)

**Gaps:**
- Between form fields: 24px (`space-6`)
- Between paragraphs: 16px (`space-4`)
- Between sections: 64-80px (`space-16` or `space-20`)
- List items: 12px (`space-3`)

**Mobile Adjustments:**
- Reduce section padding by 30-40%
- Reduce gaps by 25%

---

## Layout System

### Container Widths

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) { .container { max-width: 640px; } }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1200px; } }
```

### Grid System

**Calculator Grids (Related Tools):**
```css
.grid-calculators {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid-calculators { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid-calculators { grid-template-columns: repeat(3, 1fr); }
}
```

**Calculator Page Layout:**
```css
.calculator-layout {
  display: grid;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .calculator-layout {
    grid-template-columns: 600px 1fr;
  }
}
```

### Breakpoints

```css
/* Mobile-first */
/* Default: <640px (mobile) */
@media (min-width: 640px)  { /* Large mobile/tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

---

## Component Specifications

### Buttons

```css
.button {
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.15s ease;
  cursor: pointer;
}

/* Primary Button */
.button-primary {
  background: var(--color-primary-500);
  color: white;
  border: none;
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(99, 102, 241, 0.2);
}

.button-primary:hover {
  background: var(--color-primary-600);
  transform: translateY(-1px);
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 2px 6px rgba(99, 102, 241, 0.3);
}

.button-primary:active {
  transform: translateY(0);
}

/* Secondary Button */
.button-secondary {
  background: white;
  color: var(--color-slate-700);
  border: 1px solid var(--color-slate-300);
}

.button-secondary:hover {
  background: var(--color-slate-50);
  border-color: var(--color-slate-400);
}

/* Large Button (Calculate, Submit) */
.button-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}
```

### Form Inputs

```css
.input {
  font-size: 1rem;
  font-family: inherit;
  color: var(--color-slate-900);
  padding: 1rem 1.25rem;
  background: white;
  border: 2px solid var(--color-slate-200);
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  width: 100%;
}

.input:hover {
  border-color: var(--color-slate-300);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input::placeholder {
  color: var(--color-slate-400);
}

/* Currency Input */
.input-currency {
  font-family: 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
}

/* Label */
.label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-slate-700);
  margin-bottom: 0.5rem;
}

/* Helper Text */
.helper-text {
  font-size: 0.875rem;
  color: var(--color-slate-500);
  margin-top: 0.5rem;
}

/* Error State */
.input-error {
  border-color: var(--color-error);
}

.error-message {
  font-size: 0.875rem;
  color: var(--color-error);
  margin-top: 0.5rem;
}
```

### Cards

```css
.card {
  padding: 2rem;
  background: white;
  border: 1px solid var(--color-slate-200);
  border-radius: 1rem;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.card:hover {
  border-color: var(--color-slate-300);
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.07),
    0 2px 4px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

/* Calculator Card (Non-Hoverable) */
.card-calculator {
  padding: 2.5rem;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 2px 4px rgba(0, 0, 0, 0.03);
}

/* Result Card */
.card-result {
  background: var(--color-slate-50);
  border-color: var(--color-slate-300);
}
```

### Results Display

```css
/* Primary Result */
.result-primary {
  font-size: 3rem;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  color: var(--color-primary-600);
  font-variant-numeric: tabular-nums;
}

/* Result Label */
.result-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-slate-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

/* Result Breakdown */
.result-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-slate-200);
}

.result-item-label {
  color: var(--color-slate-600);
}

.result-item-value {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  color: var(--color-slate-900);
  font-variant-numeric: tabular-nums;
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.375rem;
}

.badge-primary {
  background: var(--color-primary-100);
  color: var(--color-primary-800);
}

.badge-success {
  background: #D1FAE5;
  color: #065F46;
}

.badge-info {
  background: #DBEAFE;
  color: #1E3A8A;
}
```

### Navigation

```css
.nav {
  background: white;
  border-bottom: 1px solid var(--color-slate-200);
}

.nav-link {
  color: var(--color-slate-600);
  font-weight: 500;
  transition: color 0.15s ease;
}

.nav-link:hover {
  color: var(--color-primary-600);
}

.nav-link-active {
  color: var(--color-primary-600);
  font-weight: 600;
}
```

---

## Motion & Interaction

### Transitions

```css
/* Fast - Buttons, links */
transition: all 0.15s ease;

/* Medium - Cards, inputs */
transition: all 0.2s ease;

/* Slow - Modals, drawers */
transition: all 0.3s ease;
```

### Hover Effects

**Lift Effect (Cards):**
```css
transform: translateY(-2px);
```

**Scale Effect (Buttons):**
```css
transform: scale(1.02);
```

**Glow Effect (Focus):**
```css
box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
```

### Loading States

**Skeleton Screen:**
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-slate-200) 0%,
    var(--color-slate-100) 50%,
    var(--color-slate-200) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0.5rem;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Spinner (When Needed):**
```css
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-slate-200);
  border-top-color: var(--color-primary-500);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Page Templates

### Calculator Page

```
[HEADER/NAV]

[BREADCRUMBS]
Home > Category > Calculator Name

[HERO SECTION - Full width, slate-50 background]
  H1: [Calculator Name]
  P: [1-2 sentence description]

[MAIN CONTENT - 2-column on desktop]
  [LEFT COLUMN - Calculator Form]
    Card with:
    - Input fields
    - Calculate button
    - Reset button
  
  [RIGHT COLUMN - Results (or below on mobile)]
    Card with:
    - Primary result (large, monospace)
    - Breakdown table
    - Chart/visualization
    - Save/Print buttons

[CONTENT SECTIONS - Full width]
  Section: How to Use
  Section: Understanding [Concept]
  Section: FAQ
  Section: Related Calculators (grid of cards)

[FOOTER]
```

### Category Hub Page

```
[HEADER/NAV]

[BREADCRUMBS]
Home > Category

[HERO SECTION]
  H1: [Category Name] Calculators
  P: [Category description]

[CALCULATOR GRID - 3 columns desktop, 2 tablet, 1 mobile]
  [Calculator Card 1]
    Icon
    H3: Calculator Name
    P: Brief description
    Link: Calculate now →
  
  [Calculator Card 2]
  [Calculator Card 3]
  ...

[FOOTER]
```

### Homepage

```
[HEADER/NAV]

[HERO SECTION]
  H1: Free Financial Calculators
  P: Fast, accurate, no signup required
  CTA: Browse all calculators

[CATEGORY SECTIONS]
  Section: Debt Calculators (grid of 3-4 cards)
  Section: Mortgage Calculators (grid of 3-4 cards)
  Section: Investment Calculators (grid of 3-4 cards)
  Section: Tax Calculators (grid of 3-4 cards)

[FOOTER]
```

---

## Responsive Design

### Mobile Optimizations

**Typography:**
- H1: 48px → 36px
- H2: 36px → 28px
- Body: Keep at 16px minimum

**Spacing:**
- Section padding: 64px → 40px
- Card padding: 32px → 24px
- Gaps: 32px → 20px

**Layout:**
- Stack 2-column layouts
- Full-width calculator forms
- Results below form (not side-by-side)
- Reduce grid to 1 column

**Touch Targets:**
- All buttons ≥44×44px
- Increase input padding on mobile
- Add more space between clickable elements

---

## Accessibility

### Color Contrast
- All text meets WCAG AA (4.5:1 minimum)
- Large text meets 3:1 minimum
- Test with WebAIM Contrast Checker

### Focus States
```css
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Form Accessibility
- Label every input
- Required fields marked with asterisk
- Error messages next to fields
- Help text with `aria-describedby`
- Logical tab order

---

## Anti-Patterns to Avoid

### Typography
- ❌ More than 2 font families
- ❌ Pure black text (#000)
- ❌ Paragraph width >75 characters
- ❌ Line-height <1.5 for body text

### Color
- ❌ Using color alone to convey information
- ❌ Low contrast text (<4.5:1)
- ❌ Too many primary colors (>3)

### Spacing
- ❌ Random padding values (23px, 17px)
- ❌ Inconsistent gaps
- ❌ No whitespace between sections

### Components
- ❌ Default browser inputs without styling
- ❌ No hover/focus states
- ❌ Buttons without adequate padding

---

## Implementation Checklist

### Design Tokens
- [ ] Define CSS custom properties for colors
- [ ] Set up typography scale
- [ ] Create spacing system
- [ ] Define border-radius values (0.5rem, 0.75rem, 1rem)
- [ ] Set up shadow system

### Components
- [ ] Button (primary, secondary, large)
- [ ] Input (text, number, select)
- [ ] Card (default, hover, result)
- [ ] Badge
- [ ] Navigation
- [ ] Footer

### Layout
- [ ] Container system
- [ ] Grid system (responsive)
- [ ] Calculator page layout
- [ ] Category hub layout
- [ ] Homepage layout

### Polish
- [ ] Hover states on all interactive elements
- [ ] Focus states for keyboard navigation
- [ ] Loading states (skeleton screens)
- [ ] Error states
- [ ] Mobile responsive
- [ ] Accessibility audit

---

## Design References

Study these sites for inspiration:
- **Stripe:** Typography, spacing, polish
- **Linear:** Visual design, subtle interactions
- **Raycast:** Micro-interactions, spacing
- **Resend:** Simplicity, clarity

---

## Final Reminders

**Be Professional:**
- Clean, modern design
- Not corporate or boring
- Trustworthy and polished

**Be Consistent:**
- Use spacing scale religiously
- Same border-radius across components
- Same hover/focus patterns

**Be Minimal:**
- Generous whitespace
- One visual idea per section
- Remove before adding

**Test Ruthlessly:**
- Real mobile devices
- Different browsers
- Keyboard navigation
- Screen readers
