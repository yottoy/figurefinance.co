# GetFigured Calculator Page Design

## Key Elements (What Makes It Perfect)

### 1. Two-Column Layout
- **Left:** Form inputs (white card)
- **Right:** Results (white card with prominent big number)
- Stacked on mobile

### 2. Results Display
```
┌─────────────────────────┐
│ Your Rates              │
│                         │
│ RECOMMENDED HOURLY RATE │
│     $120.00            │  ← HUGE (48px+)
│ Rounded to nearest $5   │  ← Small gray text
│                         │
│ ┌──────────┬──────────┐│
│ │Exact Rate│Daily Rate││  ← 2-column grid
│ │ $119.23  │ $953.85  ││
│ └──────────┴──────────┘│
│                         │
│ ┌──────────┬──────────┐│
│ │Weekly    │Monthly   ││
│ │$4,769.23 │$20,626.92││
│ └──────────┴──────────┘│
└─────────────────────────┘
```

### 3. Form Inputs
- Labels above inputs
- Helper text below inputs (gray, smaller)
- Unit suffixes (%, $, hours) in gray boxes
- "Reset to Defaults" button

### 4. Content Sections
- Step-by-step guide with H3 headings
- Pro Tip callouts (light blue background)
- Tables for benchmarks
- Comprehensive FAQs

## Complete CSS

```css
/* Calculator Page Layout */
.calculator-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
}

.calculator-hero {
  margin-bottom: 48px;
}

.calculator-hero h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
}

.calculator-hero p {
  font-size: 17px;
  color: var(--gray-600);
}

/* Two Column Layout */
.calculator-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 64px;
}

@media (max-width: 1024px) {
  .calculator-layout {
    grid-template-columns: 1fr;
  }
}

/* Form Card */
.form-card {
  background: white;
  border: 1.5px solid var(--gray-200);
  border-radius: 12px;
  padding: 32px;
}

.form-card h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix,
.input-suffix {
  position: absolute;
  font-size: 15px;
  color: var(--gray-500);
  pointer-events: none;
}

.input-prefix {
  left: 14px;
}

.input-suffix {
  right: 14px;
}

input[type="number"] {
  width: 100%;
  height: 44px;
  padding: 0 40px;
  font-size: 15px;
  font-weight: 500;
  border: 1.5px solid var(--gray-200);
  border-radius: 8px;
  background: white;
}

input[type="number"]:focus {
  outline: none;
  border-color: var(--gray-900);
}

.form-helper {
  font-size: 13px;
  color: var(--gray-500);
  margin-top: 6px;
}

.button-reset {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-600);
  background: white;
  border: 1.5px solid var(--gray-200);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.button-reset:hover {
  border-color: var(--gray-900);
  color: var(--gray-900);
}

/* Results Card */
.results-card {
  background: white;
  border: 1.5px solid var(--gray-200);
  border-radius: 12px;
  padding: 32px;
  position: sticky;
  top: 80px;
}

.results-card h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
}

/* Primary Result - BIG NUMBER */
.result-primary {
  background: var(--gray-50);
  border: 1.5px solid var(--gray-200);
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  margin-bottom: 24px;
}

.result-primary-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray-500);
  margin-bottom: 8px;
}

.result-primary-value {
  font-size: 56px;
  font-weight: 700;
  line-height: 1;
  color: var(--gray-900);
  font-family: var(--font-mono);
  margin-bottom: 8px;
}

.result-primary-note {
  font-size: 13px;
  color: var(--gray-500);
}

/* Secondary Results Grid */
.results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.result-item {
  background: var(--gray-50);
  border: 1.5px solid var(--gray-200);
  border-radius: 8px;
  padding: 16px;
}

.result-item-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray-500);
  margin-bottom: 8px;
}

.result-item-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--gray-900);
  font-family: var(--font-mono);
  margin-bottom: 4px;
}

.result-item-note {
  font-size: 12px;
  color: var(--gray-500);
}

/* Full Width Results */
.result-full {
  background: var(--gray-50);
  border: 1.5px solid var(--gray-200);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
}

/* Content Sections */
.content-section {
  max-width: 800px;
  margin-bottom: 48px;
}

.content-section h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
}

.content-section h3 {
  font-size: 20px;
  font-weight: 600;
  margin-top: 32px;
  margin-bottom: 12px;
}

.content-section h4 {
  font-size: 16px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 12px;
}

.content-section p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--gray-700);
  margin-bottom: 16px;
}

.content-section ul,
.content-section ol {
  margin-left: 24px;
  margin-bottom: 16px;
}

.content-section li {
  font-size: 16px;
  line-height: 1.7;
  color: var(--gray-700);
  margin-bottom: 8px;
}

/* Pro Tip Callout */
.pro-tip {
  background: #EFF6FF;
  border-left: 4px solid #3B82F6;
  padding: 16px 20px;
  margin: 24px 0;
}

.pro-tip-label {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #1E40AF;
  margin-bottom: 8px;
}

.pro-tip p {
  font-size: 15px;
  color: #1E3A8A;
  margin: 0;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
}

th {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray-600);
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid var(--gray-200);
}

td {
  font-size: 15px;
  color: var(--gray-700);
  padding: 12px;
  border-bottom: 1px solid var(--gray-100);
}

tr:last-child td {
  border-bottom: none;
}
```

## HTML Structure

```html
<main class="calculator-page">
  <!-- Hero -->
  <div class="calculator-hero">
    <h1>Consulting Rate Calculator</h1>
    <p>Calculate your consulting rate based on your desired annual income, billable hours, and business expenses.</p>
  </div>

  <!-- Calculator Layout -->
  <div class="calculator-layout">
    <!-- Left: Form -->
    <div class="form-card">
      <h2>Your Information</h2>
      
      <div class="form-group">
        <label class="form-label">Desired Annual Salary</label>
        <div class="input-wrapper">
          <span class="input-prefix">$</span>
          <input type="number" value="100000" />
        </div>
        <p class="form-helper">How much do you want to take home per year?</p>
      </div>

      <div class="form-group">
        <label class="form-label">Billable Hours per Year</label>
        <div class="input-wrapper">
          <input type="number" value="1560" />
          <span class="input-suffix">hours</span>
        </div>
        <p class="form-helper">Most consultants bill 1,500-1,800 hours per year</p>
      </div>

      <!-- More inputs -->

      <button class="button-reset">
        <svg><!-- reset icon --></svg>
        Reset to Defaults
      </button>
    </div>

    <!-- Right: Results -->
    <div class="results-card">
      <h2>Your Rates</h2>
      
      <!-- Primary Result -->
      <div class="result-primary">
        <div class="result-primary-label">Recommended Hourly Rate</div>
        <div class="result-primary-value">$120.00</div>
        <div class="result-primary-note">Rounded to nearest $5</div>
      </div>

      <!-- Secondary Results -->
      <div class="results-grid">
        <div class="result-item">
          <div class="result-item-label">Exact Hourly Rate</div>
          <div class="result-item-value">$119.23</div>
          <div class="result-item-note">Based on your inputs</div>
        </div>
        
        <div class="result-item">
          <div class="result-item-label">Daily Rate</div>
          <div class="result-item-value">$953.85</div>
          <div class="result-item-note">8 hours per day</div>
        </div>

        <div class="result-item">
          <div class="result-item-label">Weekly Rate</div>
          <div class="result-item-value">$4,769.23</div>
          <div class="result-item-note">40 hours per week</div>
        </div>

        <div class="result-item">
          <div class="result-item-label">Monthly Rate</div>
          <div class="result-item-value">$20,626.92</div>
          <div class="result-item-note">~173 hours per month</div>
        </div>
      </div>

      <!-- Full Width Results -->
      <div class="result-full">
        <div class="result-item-label">Annual Revenue Needed</div>
        <div class="result-item-value">$186,000.00</div>
        <div class="result-item-note">Total revenue to achieve your goals</div>
      </div>
    </div>
  </div>

  <!-- Content Sections -->
  <div class="content-section">
    <h2>How to Use the Consulting Rate Calculator</h2>
    
    <h3>Step 1: Enter Your Desired Annual Salary</h3>
    <p>Start by entering how much you want to earn per year...</p>

    <div class="pro-tip">
      <div class="pro-tip-label">Pro Tip</div>
      <p>New consultants should aim for 1,200-1,400 hours...</p>
    </div>

    <h3>Step 2: Set Your Billable Hours</h3>
    <p>Not all hours in a year are billable...</p>

    <!-- More sections -->
  </div>
</main>
```

## Key Differences from Current Site

1. **Results are sticky** - Stays visible as you scroll
2. **Big primary result** - 56px font size, impossible to miss
3. **Grid of secondary results** - 2x2 grid, compact
4. **Unit labels inside inputs** - $, %, hours in gray
5. **Helper text on everything** - Every input has context
6. **Pro tip callouts** - Light blue background boxes
7. **Comprehensive content** - Tables, benchmarks, FAQs
8. **Monospace for numbers** - JetBrains Mono for $ amounts
