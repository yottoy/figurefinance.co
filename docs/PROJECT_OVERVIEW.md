# Financial Calculator Website - Project Overview

## Project Mission

Build a portfolio of high-quality financial calculators targeting low-competition keywords (KD <35) to capture organic search traffic and monetize through display ads and affiliate partnerships.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form
- **Charts:** Chart.js / Recharts
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4
- **Deployment:** GitHub → Vercel (automated)

## CLI Tools Available

You have access to:
- `gh` - GitHub CLI for repo management, commits, pushes
- `vercel` - Vercel CLI for deployment management

Use these tools to:
- Initialize git repo and push to GitHub
- Deploy to Vercel
- Manage environment variables
- No manual GitHub UI interaction needed

## Core Strategy

### SEO Goals (Internal - Not for Site Content)
- Target keywords with KD <35, volume >500/month
- Rank in top 5 positions within 3-6 months
- Capture 40,000-60,000 monthly organic visits by month 6
- Monetize via display ads ($2-4 CPC average)

### User Value Proposition (For Site Content)
Users need **fast, accurate, free financial calculators** that:
- Work instantly without signup
- Provide clear, actionable results
- Include educational context to understand calculations
- Offer visual representations (charts, schedules)
- Are accessible on mobile devices

**CRITICAL:** All user-facing content must focus exclusively on user benefits and solving their problems. Never mention SEO goals, traffic targets, or monetization strategy in site content.

## Build Phases

### Phase 1: Foundation (Calculators 1-5)
1. Snowball debt calculator
2. Biweekly mortgage payment calculator
3. Early mortgage payoff calculator
4. Balance transfer calculator
5. Savings goal calculator

**Technical deliverables:**
- Base Next.js project structure
- Shared calculator component architecture
- Typography and spacing system
- Color palette implementation
- SEO infrastructure (sitemap, robots.txt, schema markup)
- Responsive navigation
- Footer with internal links

### Phase 2: Scale (Calculators 6-10)
6. Debt snowball calculator (alternative to #1)
7. Mortgage payoff calculator
8. HELOC calculator
9. Dividend calculator
10. Self employment tax calculator

**Technical deliverables:**
- Category hub pages (/debt/, /mortgage/, /investment/, /tax/)
- Internal linking system between related calculators
- Chart visualizations for results
- Print/export functionality

### Phase 3: Authority (Calculators 11-15)
11. CD calculator
12. Capital gains tax calculator
13. Closing cost calculator
14. Cash out refinance calculator
15. IRR calculator

**Technical deliverables:**
- Advanced visualizations (amortization schedules, comparison tables)
- Save/share results functionality
- Email results feature
- Performance optimization

## Site Architecture

```
/
├── / (homepage)
├── /debt/
│   ├── snowball-debt-calculator
│   ├── debt-snowball-calculator
│   ├── balance-transfer-calculator
│   └── early-mortgage-payoff-calculator
├── /mortgage/
│   ├── biweekly-mortgage-payment-calculator
│   ├── mortgage-payoff-calculator
│   ├── heloc-calculator
│   └── cash-out-refinance-calculator
├── /investment/
│   ├── dividend-calculator
│   ├── cd-calculator
│   └── irr-calculator
├── /tax/
│   ├── self-employment-tax-calculator
│   ├── capital-gains-tax-calculator
│   └── closing-cost-calculator
├── /savings/
│   └── savings-goal-calculator
├── /about
├── /privacy
└── /terms
```

## Component Architecture

### Shared Components

**CalculatorLayout.tsx**
- Wraps all calculator pages
- Handles breadcrumbs
- Manages related calculators section
- Implements schema markup

**CalculatorForm.tsx**
- Reusable form wrapper
- Handles React Hook Form integration
- Consistent error states
- Loading states

**ResultsDisplay.tsx**
- Standardized results presentation
- Chart integration
- Print/share functionality
- Visual hierarchy

**Input.tsx, Select.tsx, Checkbox.tsx**
- Branded form components
- Consistent styling
- Error handling
- Accessibility features

### Calculator-Specific Components

Each calculator gets its own directory:
```
/app/debt/snowball-debt-calculator/
├── page.tsx (main component)
├── SnowballForm.tsx (form inputs)
├── SnowballResults.tsx (results display)
├── SnowballChart.tsx (visualization)
└── metadata.ts (SEO metadata)
```

## Data Models

### Common Input Types
```typescript
// Debt calculators
interface DebtInput {
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

// Mortgage calculators
interface MortgageInput {
  loanAmount: number;
  interestRate: number;
  loanTerm: number; // years
  propertyTax?: number;
  insurance?: number;
  pmi?: number;
}

// Investment calculators
interface InvestmentInput {
  principal: number;
  contribution: number;
  contributionFrequency: 'monthly' | 'quarterly' | 'annually';
  returnRate: number;
  years: number;
}

// Tax calculators
interface TaxInput {
  income: number;
  filingStatus: 'single' | 'married-joint' | 'married-separate' | 'hoh';
  deductions: number;
  state?: string;
}
```

### Common Output Types
```typescript
interface CalculatorResult {
  primaryResult: number; // Main answer
  breakdown: ResultBreakdown[];
  visualData: ChartDataPoint[];
  summary: string;
  recommendations?: string[];
}

interface ResultBreakdown {
  label: string;
  value: number | string;
  description?: string;
}

interface ChartDataPoint {
  label: string;
  value: number;
  [key: string]: any; // Additional chart-specific data
}
```

## SEO Implementation

### Meta Tags Template
Every calculator page must include:
```typescript
export const metadata: Metadata = {
  title: '[Primary Keyword] | [Benefit] - FigureFinance',
  description: '[150-160 char description with primary keyword, benefit, and "free" if applicable]',
  alternates: {
    canonical: 'https://domain.com/category/calculator-name'
  },
  openGraph: {
    title: '[Primary Keyword] | [Benefit]',
    description: '[Description]',
    url: 'https://domain.com/category/calculator-name',
    type: 'website'
  }
}
```

### Schema Markup
Implement on every calculator page:
```typescript
const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "[Calculator Name]",
  "description": "[Description]",
  "url": "[Full URL]",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### Content Structure Template
```
H1: [Primary Keyword + Benefit]
[2-3 sentence intro with primary keyword]

[CALCULATOR INTERFACE]

H2: How to Use [Calculator Name]
  H3: Step 1: [Action]
  H3: Step 2: [Action]
  H3: Step 3: [Action]

H2: Understanding [Key Concept]
  [3-4 paragraphs explaining the concept]
  [Include industry benchmarks with sources]

H2: Why Use Our [Calculator Name]?
  - Benefit 1
  - Benefit 2
  - Benefit 3

H2: Frequently Asked Questions
  H3: [Question 1 with secondary keyword]?
  H3: [Question 2 from Google PAA]?
  H3: [Question 3-5]

H2: Related Calculators
  [Grid of 3-6 related calculator cards]
```

### Internal Linking Rules
- Every calculator links to 3-5 related calculators
- Every calculator links to its category hub page
- Category hub pages link to all calculators in that category
- Homepage links to all category hub pages
- Use descriptive anchor text with keywords

## Performance Requirements

### Core Web Vitals Targets
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

### Optimization Tactics
- Use Next.js Image component for all images
- Lazy load below-the-fold content
- Minimize JavaScript bundles
- Static generation for all calculator pages
- Preload critical fonts
- Implement code splitting per route

### Mobile Optimization
- Mobile-first responsive design
- Touch targets ≥44×44px
- Readable font sizes (≥16px base)
- No horizontal scrolling
- Fast load on 3G (target <5s)

## Analytics & Tracking

### Google Analytics 4 Events
Track these events on every calculator:
```typescript
// Calculator usage
gtag('event', 'calculator_used', {
  calculator_name: 'snowball-debt',
  result_value: primaryResult
});

// Form completion
gtag('event', 'form_complete', {
  calculator_name: 'snowball-debt',
  inputs_provided: numberOfInputs
});

// CTA clicks
gtag('event', 'cta_click', {
  button_text: 'Save Results',
  calculator_name: 'snowball-debt'
});
```

### Search Console Integration
- Submit sitemap.xml weekly
- Monitor indexing status
- Track query performance
- Fix coverage errors

## Content Guidelines

### Voice & Tone
- **Professional but approachable** - Not corporate or stuffy
- **Clear and direct** - Avoid jargon, use 8th-9th grade reading level
- **Helpful and educational** - Explain concepts, don't just calculate
- **Trustworthy** - Cite sources for statistics and benchmarks

### Writing Rules
- Use "you" and "your" (not "users" or "one")
- Active voice preferred
- Short paragraphs (2-4 sentences)
- Bullet points for scannability
- Include examples with real numbers
- Add "Last updated: [date]" to every calculator

### What to Avoid
- Marketing speak or hype
- Promises of financial success
- Comparisons to competitors
- Disclaimers about "not financial advice" (implied by nature of tool)
- Excessive use of bold, italics, or ALL CAPS

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- Color contrast ≥4.5:1 for text
- Keyboard navigation for all interactive elements
- Visible focus states
- Alt text for all images
- Semantic HTML (nav, main, article, section)
- Proper heading hierarchy
- ARIA labels where semantic HTML insufficient

### Form Accessibility
- Label every input field
- Associate error messages with inputs
- Mark required fields
- Provide help text for complex inputs
- Ensure tab order is logical

## Testing Requirements

### Browser Testing
- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest version)

### Device Testing
- iPhone (Safari)
- Android phone (Chrome)
- iPad (Safari)
- Desktop (1920×1080, 1366×768)

### Calculation Accuracy
- Test with known edge cases
- Verify against competitor calculators
- Test with extreme values (0, negative, very large)
- Validate formulas against financial formulas documentation

## Deployment Workflow

### Git Workflow
```bash
# Initialize repo
git init
gh repo create financial-calculators --private
git add .
git commit -m "Initial commit"
git push -u origin main

# Feature branches
git checkout -b feature/snowball-calculator
# ... make changes
git add .
git commit -m "Add snowball debt calculator"
git push origin feature/snowball-calculator
gh pr create --fill
gh pr merge
```

### Vercel Deployment
```bash
# Link to Vercel
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add GA_MEASUREMENT_ID
```

### Environment Variables Needed
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://figurefinance.co
```

## Success Criteria (Internal Metrics)

### Phase 1 Success (Month 1)
- 5 calculators live
- All pages indexed in Google
- PageSpeed score >90
- Mobile-friendly test passing
- Zero accessibility errors

### Phase 2 Success (Month 3)
- 10 calculators live
- 500-1,500 monthly organic visits
- Average position <20 for target keywords
- Internal linking structure complete

### Phase 3 Success (Month 6)
- 15 calculators live
- 5,000-10,000 monthly organic visits
- 5+ keywords ranking in top 10
- Featured snippet for 1+ calculator

## File Structure

```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── debt/
│   │   ├── page.tsx (hub)
│   │   └── [calculator-name]/
│   │       ├── page.tsx
│   │       ├── components/
│   │       └── metadata.ts
│   ├── mortgage/
│   ├── investment/
│   ├── tax/
│   ├── savings/
│   ├── about/
│   ├── privacy/
│   └── terms/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── calculator/
│   │   ├── CalculatorLayout.tsx
│   │   ├── CalculatorForm.tsx
│   │   ├── ResultsDisplay.tsx
│   │   └── RelatedCalculators.tsx
│   ├── ui/
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   └── charts/
│       ├── LineChart.tsx
│       ├── BarChart.tsx
│       └── PieChart.tsx
├── lib/
│   ├── calculators/
│   │   ├── debtSnowball.ts
│   │   ├── mortgagePayoff.ts
│   │   └── [other calculator logic].ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── analytics.ts
│   └── constants/
│       ├── metadata.ts
│       └── schema.ts
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## Brand Identity

### Domain Name
Choose a domain that:
- Is memorable and pronounceable
- Relates to finance/calculators
- Is available as .com
- Is short (8-15 characters ideal)

**Suggested options:**
- CalcFinance.com
- QuickFinCalc.com
- SmartCalcs.com
- FinanceTools.com

### Brand Name
Match domain or create variation:
- "FinanceCalc"
- "QuickFin"
- "SmartCalcs"

## Content Sources for Calculations

### Debt Snowball Method
- Source: Dave Ramsey's debt snowball methodology
- Formula: List debts smallest to largest, minimum payments on all except smallest, extra payments to smallest

### Mortgage Calculations
- Source: Standard amortization formulas
- Monthly payment = P[r(1+r)^n]/[(1+r)^n-1]
- Where P=principal, r=monthly interest rate, n=number of payments

### Tax Calculations
- Source: IRS tax brackets (update annually)
- Self-employment tax: 15.3% (12.4% Social Security + 2.9% Medicare)
- Capital gains: 0%, 15%, or 20% based on income brackets

### Investment Calculations
- Compound interest: A = P(1 + r/n)^(nt)
- IRR: Internal rate of return using NPV formula
- Dividend yield: Annual dividend per share / price per share

## Error Handling

### Input Validation
- Check for negative values where inappropriate
- Set reasonable min/max values
- Validate percentage inputs (0-100)
- Ensure required fields are filled
- Display clear error messages next to fields

### Calculation Errors
- Handle division by zero
- Catch NaN and Infinity results
- Display user-friendly error messages
- Provide fallback values when possible

### Error Message Examples
```
❌ "Please enter a positive number"
✅ "Please enter a loan amount greater than $0"

❌ "Invalid input"
✅ "Interest rate must be between 0% and 100%"

❌ "Error"
✅ "Monthly payment cannot be less than the interest charge"
```

## Legal Pages (Required)

### Privacy Policy
- Explain data collection (analytics only)
- No personal data stored
- Cookie usage (analytics)
- Third-party services (Google Analytics)

### Terms of Use
- Calculators for informational purposes only
- Results are estimates
- Not professional financial advice
- No warranty on accuracy
- User responsible for their decisions

### About Page
- Mission: Provide free, accurate financial calculators
- No signup required
- No data collection beyond analytics
- Built for clarity and ease of use

## Next Steps for Cursor

1. **Initialize Project**
   - Set up Next.js 14 with TypeScript
   - Configure Tailwind CSS
   - Set up git and push to GitHub
   - Connect to Vercel

2. **Create Design System**
   - Implement color palette from DESIGN_GUIDE.md
   - Set up typography system
   - Create base components (Button, Input, etc.)
   - Build layout components (Header, Footer)

3. **Build Phase 1 Calculators**
   - Start with snowball debt calculator
   - Create reusable calculator components
   - Implement SEO infrastructure
   - Add analytics tracking

4. **Deploy & Test**
   - Deploy to Vercel
   - Submit sitemap to Google
   - Test on mobile devices
   - Run accessibility audit

Focus on one phase at a time. Each calculator should be fully functional, SEO-optimized, and tested before moving to the next.
