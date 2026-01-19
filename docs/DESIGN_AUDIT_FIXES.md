# FigureFinance Design Audit - Critical Fixes

## Issues Found

### 1. Generic Feature Cards - DELETE ENTIRELY
**Remove:** "Instant Results", "100% Free", "Privacy First" cards
**Why:** Generic marketing speak that wastes space

### 2. Hero Section - SIMPLIFY
**Change from:**
```
H1: Free Financial Calculators
P: Fast, accurate, no signup required. Make informed financial decisions...
Button: Browse Calculators
```

**Change to:**
```
H1: Financial Calculators
P: Fast, accurate tools for debt payoff, mortgages, and savings goals.
```
Remove the button.

### 3. Bottom CTA Section - DELETE
**Remove:** "Ready to take control of your finances?" section entirely

### 4. Card Borders - NEUTRALIZE
**Change:** Colored borders to neutral gray (#E2E8F0)
**Keep:** Subtle hover effects only

### 5. Typography - FIX SPACING
```css
h1 { letter-spacing: -0.02em; line-height: 1.1; }
h2 { letter-spacing: -0.01em; line-height: 1.2; }
p { line-height: 1.7; }
```

## Complete Homepage HTML

```html
<header class="site-header">
  <nav class="container">
    <a href="/" class="logo">FigureFinance</a>
    <div class="nav-links">
      <a href="/debt">Debt</a>
      <a href="/mortgage">Mortgage</a>
      <a href="/savings">Savings</a>
      <a href="/about">About</a>
    </div>
  </nav>
</header>

<main>
  <section class="hero">
    <div class="container">
      <h1>Financial Calculators</h1>
      <p>Fast, accurate tools for debt payoff, mortgages, and savings goals.</p>
    </div>
  </section>

  <section class="calculator-section">
    <div class="container">
      <div class="section-header">
        <div>
          <h2>Debt Calculators</h2>
          <p class="section-description">Tools to help you pay off debt faster and save on interest</p>
        </div>
        <a href="/debt" class="view-all">View all →</a>
      </div>
      
      <div class="calculator-grid">
        <a href="/debt/snowball-debt-calculator" class="calculator-card">
          <h3>Snowball Debt Calculator</h3>
          <p>Create a debt payoff plan using the snowball method</p>
          <span class="card-link">Calculate →</span>
        </a>
        <a href="/debt/balance-transfer-calculator" class="calculator-card">
          <h3>Balance Transfer Calculator</h3>
          <p>Calculate if a balance transfer will save you money</p>
          <span class="card-link">Calculate →</span>
        </a>
      </div>
    </div>
  </section>

  <section class="calculator-section">
    <div class="container">
      <div class="section-header">
        <div>
          <h2>Mortgage Calculators</h2>
          <p class="section-description">Calculate mortgage payments and payoff strategies</p>
        </div>
        <a href="/mortgage" class="view-all">View all →</a>
      </div>
      
      <div class="calculator-grid">
        <a href="/mortgage/biweekly-mortgage-payment-calculator" class="calculator-card">
          <h3>Biweekly Mortgage Payment Calculator</h3>
          <p>See savings from biweekly mortgage payments</p>
          <span class="card-link">Calculate →</span>
        </a>
        <a href="/mortgage/early-mortgage-payoff-calculator" class="calculator-card">
          <h3>Early Mortgage Payoff Calculator</h3>
          <p>Calculate savings from extra principal payments</p>
          <span class="card-link">Calculate →</span>
        </a>
      </div>
    </div>
  </section>

  <section class="calculator-section">
    <div class="container">
      <div class="section-header">
        <div>
          <h2>Savings Calculators</h2>
          <p class="section-description">Plan your savings and reach your financial goals</p>
        </div>
        <a href="/savings" class="view-all">View all →</a>
      </div>
      
      <div class="calculator-grid">
        <a href="/savings/savings-goal-calculator" class="calculator-card">
          <h3>Savings Goal Calculator</h3>
          <p>Calculate how much to save to reach your goal</p>
          <span class="card-link">Calculate →</span>
        </a>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-section">
        <h3>FigureFinance</h3>
        <p>Free financial calculators</p>
      </div>
      <div class="footer-section">
        <h4>Debt Calculators</h4>
        <ul>
          <li><a href="/debt/snowball-debt-calculator">Snowball Debt Calculator</a></li>
          <li><a href="/debt/balance-transfer-calculator">Balance Transfer Calculator</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Mortgage Calculators</h4>
        <ul>
          <li><a href="/mortgage/biweekly-mortgage-payment-calculator">Biweekly Mortgage Calculator</a></li>
          <li><a href="/mortgage/early-mortgage-payoff-calculator">Early Payoff Calculator</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Savings Calculators</h4>
        <ul>
          <li><a href="/savings/savings-goal-calculator">Savings Goal Calculator</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 FigureFinance. All rights reserved.</p>
      <div class="footer-links">
        <a href="/about">About</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Use</a>
      </div>
    </div>
  </div>
</footer>
```

## Complete CSS

```css
:root {
  --font-display: 'Cabinet Grotesk', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  
  --color-primary-500: #6366F1;
  --color-primary-600: #4F46E5;
  
  --color-slate-50: #F8FAFC;
  --color-slate-200: #E2E8F0;
  --color-slate-300: #CBD5E1;
  --color-slate-600: #475569;
  --color-slate-900: #0F172A;
  
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-slate-900);
}

h1 {
  font-family: var(--font-display);
  font-size: 60px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 30px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

h3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
}

p { color: var(--color-slate-600); }

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.site-header {
  background: white;
  border-bottom: 1px solid var(--color-slate-200);
  position: sticky;
  top: 0;
  z-index: 100;
}

.site-header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.logo {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-slate-900);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: var(--space-8);
}

.nav-links a {
  font-weight: 500;
  color: var(--color-slate-600);
  text-decoration: none;
}

.hero {
  background: var(--color-slate-50);
  padding: var(--space-20) 0;
  text-align: center;
}

.hero .container { max-width: 800px; }
.hero h1 { margin-bottom: var(--space-4); }
.hero p { font-size: 18px; }

.calculator-section {
  padding: var(--space-16) 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--space-8);
}

.section-header h2 { margin-bottom: var(--space-2); }

.view-all {
  font-weight: 500;
  color: var(--color-primary-600);
  text-decoration: none;
}

.calculator-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
}

.calculator-card {
  background: white;
  border: 1px solid var(--color-slate-200);
  border-radius: 12px;
  padding: var(--space-8);
  transition: all 0.2s ease;
  text-decoration: none;
  display: block;
}

.calculator-card:hover {
  border-color: var(--color-slate-300);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transform: translateY(-2px);
}

.calculator-card h3 {
  margin-bottom: var(--space-2);
  color: var(--color-slate-900);
}

.calculator-card p {
  margin-bottom: var(--space-4);
}

.card-link {
  font-weight: 500;
  color: var(--color-primary-600);
}

.site-footer {
  background: var(--color-slate-50);
  border-top: 1px solid var(--color-slate-200);
  padding: var(--space-16) 0 var(--space-8);
  margin-top: var(--space-20);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-12);
  margin-bottom: var(--space-12);
}

.footer-section ul { list-style: none; }
.footer-section a { 
  font-size: 14px;
  color: var(--color-slate-600);
  text-decoration: none;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-slate-200);
}

.footer-links {
  display: flex;
  gap: var(--space-6);
}

@media (max-width: 1024px) {
  .calculator-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  h1 { font-size: 40px; }
  h2 { font-size: 24px; }
  .hero { padding: var(--space-12) 0; }
  .calculator-section { padding: var(--space-12) 0; }
  .footer-grid { grid-template-columns: 1fr; }
}
```

## Implementation Checklist

- [ ] Delete feature cards section
- [ ] Delete bottom CTA section  
- [ ] Update hero H1 and description
- [ ] Remove hero button
- [ ] Change card borders to #E2E8F0
- [ ] Fix typography spacing
- [ ] Verify 8pt grid spacing
