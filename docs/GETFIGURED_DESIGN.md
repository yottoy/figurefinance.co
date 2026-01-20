# GetFigured.co Design Pattern

## Key Differences from Current Design

1. **Cards have visible borders** - Makes them clearly clickable
2. **Cards show only titles** - No descriptions, cleaner
3. **3-column grid** - More compact, scannable
4. **Icons for categories** - Visual differentiation
5. **Dark footer** - Strong contrast
6. **One CTA in hero** - Clear action

## Updated CSS

```css
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  
  --gray-50: #FAFAFA;
  --gray-100: #F4F4F5;
  --gray-200: #E4E4E7;
  --gray-300: #D4D4D8;
  --gray-600: #52525B;
  --gray-900: #18181B;
  
  --indigo-600: #4F46E5;
}

body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  color: var(--gray-900);
}

/* Typography */
h1 {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 24px;
}

h3 {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
}

/* Header */
.site-header {
  border-bottom: 1px solid var(--gray-200);
  background: white;
}

.site-header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.logo {
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-900);
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  font-size: 15px;
  font-weight: 500;
  color: var(--gray-600);
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--gray-900);
}

/* Hero */
.hero {
  padding: 80px 0;
  text-align: center;
}

.hero h1 {
  margin-bottom: 16px;
}

.hero p {
  font-size: 18px;
  color: var(--gray-600);
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.button-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--gray-900);
  color: white;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s;
  text-decoration: none;
}

.button-cta:hover {
  background: var(--gray-600);
  transform: translateY(-1px);
}

/* Sections */
.calculator-section {
  padding: 64px 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.section-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

/* Grid - 3 columns like getfigured */
.calculator-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Cards - Bordered boxes, title only */
.calculator-card {
  padding: 20px;
  background: white;
  border: 1.5px solid var(--gray-200);
  border-radius: 8px;
  transition: all 0.2s;
  text-decoration: none;
  display: block;
}

.calculator-card:hover {
  border-color: var(--gray-900);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.calculator-card h3 {
  color: var(--gray-900);
}

/* Footer - Dark like getfigured */
.site-footer {
  background: #1a1a1a;
  color: white;
  padding: 64px 0 32px;
  margin-top: 96px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 64px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  margin-bottom: 48px;
}

.footer-section h3 {
  font-size: 16px;
  color: white;
  margin-bottom: 12px;
}

.footer-section h4 {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.5);
  margin-bottom: 16px;
}

.footer-section p {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  margin-bottom: 8px;
}

.footer-section a {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  transition: color 0.2s;
}

.footer-section a:hover {
  color: white;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  padding-top: 32px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.footer-bottom p {
  font-size: 14px;
  color: rgba(255,255,255,0.4);
}

/* Mobile */
@media (max-width: 1024px) {
  .calculator-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  h1 { font-size: 36px; }
  h2 { font-size: 20px; }
  
  .calculator-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

## Category Icons

Add simple icons to each section:
- 💳 Debt Calculators
- 🏠 Mortgage Calculators  
- 💰 Savings Calculators

Or use Lucide React icons if available.

## Updated Card HTML

```html
<!-- Simpler - title only, no description -->
<a href="/debt/snowball-debt-calculator" class="calculator-card">
  <h3>Snowball Debt Calculator</h3>
</a>
```

## Key Changes

1. **Borders always visible** - 1.5px solid border, not transparent
2. **3-column grid** - More compact (2 col on tablet, 1 on mobile)
3. **Title-only cards** - Removed descriptions for cleaner look
4. **Dark footer** - #1a1a1a background like getfigured
5. **CTA button in hero** - "Browse Calculators" or "View All Calculators"
6. **Icons for sections** - Visual markers for each category
