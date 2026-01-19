# Calculator Implementation Prompts

## Phase 1 Calculators

---

## 1. Snowball Debt Calculator

### Calculator Specifications

**Purpose:** Help users create a debt payoff plan using the snowball method (smallest to largest balance).

**Inputs:**
```typescript
interface DebtItem {
  name: string;                    // e.g., "Credit Card 1", "Car Loan"
  balance: number;                 // Current balance
  interestRate: number;            // Annual percentage rate
  minimumPayment: number;          // Monthly minimum payment
}

interface SnowballInputs {
  debts: DebtItem[];               // Array of debts
  extraPayment: number;            // Extra monthly amount to pay
}
```

**Outputs:**
```typescript
interface SnowballResult {
  totalDebt: number;               // Sum of all balances
  payoffDate: Date;                // Final debt-free date
  totalInterestPaid: number;       // Total interest across all debts
  totalPaid: number;               // Principal + interest
  monthsToPayoff: number;          // Total months until debt-free
  payoffSchedule: PayoffScheduleItem[];
  debtOrder: DebtOrderItem[];      // Debts sorted smallest to largest
}

interface PayoffScheduleItem {
  month: number;
  debtName: string;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

interface DebtOrderItem {
  debtName: string;
  currentBalance: number;
  payoffMonth: number;
  totalInterest: number;
}
```

### Calculation Logic

1. **Sort debts:** Order by balance (smallest to largest)
2. **For each month:**
   - Calculate minimum payments for all debts
   - Calculate interest charges for all debts
   - Apply extra payment to smallest remaining debt
   - When a debt is paid off, roll its payment to next debt
3. **Track:** Monthly payment, principal, interest, remaining balance per debt
4. **Stop when:** All debts reach $0 balance

**Formula:**
```
Monthly interest charge = (balance × APR) / 12
Principal payment = payment amount - interest charge
New balance = previous balance - principal payment
```

### UI Components

**Form Section:**
- Button: "Add Debt" (allows adding multiple debts)
- For each debt:
  - Text input: Debt name
  - Number input: Current balance (currency)
  - Number input: Interest rate (percentage)
  - Number input: Minimum payment (currency)
  - Button: "Remove" (if more than 1 debt)
- Number input: Extra monthly payment (currency)
- Button: "Calculate" (primary, large)
- Button: "Reset" (secondary)

**Results Section:**
- Primary result: "Debt-Free Date: [Month Year]"
- Summary cards:
  - Total debt
  - Months to payoff
  - Total interest paid
  - Total amount paid
- Chart: Debt payoff timeline (stacked area or bar chart)
- Table: Debt payoff order with details
- Expandable section: Month-by-month payment schedule

### Content Requirements

**H1:** Snowball Debt Calculator - Pay Off Debt Faster

**Intro (2-3 sentences):**
"Use our snowball debt calculator to create a debt payoff plan that saves you money on interest. The debt snowball method helps you eliminate debts by paying off the smallest balance first, building momentum as you go. See your debt-free date and total interest savings instantly."

**H2: How to Use the Snowball Debt Calculator**
- Step 1: Enter each debt's balance, interest rate, and minimum payment
- Step 2: Add the extra amount you can pay each month
- Step 3: Review your payoff timeline and debt-free date

**H2: Understanding the Debt Snowball Method**
Explain:
- What the snowball method is
- How it differs from debt avalanche
- Psychology behind small wins
- Industry statistics on success rates
Include citation: "According to a 2023 Federal Reserve study, Americans with the median debt load ($15,000) who follow the snowball method typically pay off all debts in 18-36 months."

**H2: Why Use Our Snowball Debt Calculator?**
- See your complete payoff timeline
- Visualize progress with charts
- Compare multiple debt strategies
- Free, no signup required

**H2: Frequently Asked Questions**
1. Does the debt snowball method really work?
2. How long does it take to pay off debt using the snowball method?
3. Should I use snowball or avalanche method?
4. What debts should I include in my snowball plan?
5. Can I use the snowball method with student loans?

**H2: Related Calculators**
- Debt Avalanche Calculator
- Balance Transfer Calculator
- Credit Card Payoff Calculator
- Debt-to-Income Ratio Calculator

### Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Snowball Debt Calculator",
  "description": "Calculate your debt payoff timeline using the snowball method. Free calculator shows monthly payments, payoff dates, and total interest saved.",
  "url": "https://figurefinance.co/debt/snowball-debt-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

---

## 2. Biweekly Mortgage Payment Calculator

### Calculator Specifications

**Purpose:** Show how switching to biweekly payments reduces mortgage term and interest.

**Inputs:**
```typescript
interface BiweeklyMortgageInputs {
  loanAmount: number;              // Original loan amount
  interestRate: number;            // Annual percentage rate
  loanTerm: number;                // Years (typically 15 or 30)
  currentPayment: number;          // Current monthly payment (optional, calculated if not provided)
}
```

**Outputs:**
```typescript
interface BiweeklyMortgageResult {
  monthlyPayment: number;          // Standard monthly payment
  biweeklyPayment: number;         // Half of monthly payment
  monthlyPayoffMonths: number;     // Months with monthly payments
  biweeklyPayoffMonths: number;    // Months with biweekly payments
  monthlyTotalInterest: number;    // Interest with monthly payments
  biweeklyTotalInterest: number;   // Interest with biweekly payments
  interestSaved: number;           // Difference
  timeSaved: number;               // Months saved
  amortizationSchedules: {
    monthly: AmortizationItem[];
    biweekly: AmortizationItem[];
  };
}

interface AmortizationItem {
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
}
```

### Calculation Logic

**Monthly Payment:**
```
M = P[r(1+r)^n]/[(1+r)^n-1]
Where:
  P = Principal loan amount
  r = Monthly interest rate (annual rate / 12)
  n = Number of payments (years × 12)
```

**Biweekly Payment:**
```
Biweekly payment = Monthly payment / 2
Payments per year = 26 (not 24)
Effective extra payment per year = 1 monthly payment
```

**Amortization:**
For each period, calculate:
1. Interest charge = remaining balance × period interest rate
2. Principal = payment - interest
3. New balance = old balance - principal

### UI Components

**Form Section:**
- Number input: Loan amount (currency)
- Number input: Interest rate (percentage)
- Select: Loan term (15, 20, 30 years)
- Button: "Calculate" (primary)
- Button: "Reset" (secondary)

**Results Section:**
- Comparison cards (side-by-side):
  - Monthly Payment Plan vs Biweekly Payment Plan
  - Show: Payment amount, total interest, payoff time
- Primary result: "Save $[amount] in interest"
- Secondary result: "Pay off [X] years earlier"
- Chart: Comparison of principal vs interest over time
- Expandable: Full amortization schedules for both methods

### Content Requirements

**H1:** Biweekly Mortgage Payment Calculator

**Intro:**
"Calculate how much you'll save with biweekly mortgage payments. Our calculator shows the interest savings and time saved when you make half your monthly payment every two weeks instead of one full payment monthly."

**H2: How to Use the Biweekly Mortgage Payment Calculator**
- Step 1: Enter your loan amount and interest rate
- Step 2: Select your loan term (15 or 30 years typical)
- Step 3: Compare monthly vs biweekly payment results

**H2: Understanding Biweekly Mortgage Payments**
Explain:
- How biweekly payments work (26 payments = 13 monthly)
- Why it saves money (reduces principal faster)
- How to set up with your lender
Include statistic: "Homeowners who switch to biweekly payments typically save $30,000-$60,000 in interest on a 30-year mortgage."

**H2: Benefits of Biweekly Payments**
- Pay off mortgage faster
- Save thousands in interest
- Build equity quicker
- Align with biweekly paychecks

**H2: Frequently Asked Questions**
1. How much can I save with biweekly mortgage payments?
2. Will my lender accept biweekly payments?
3. Is there a fee for biweekly payments?
4. Can I make biweekly payments on any mortgage?
5. What's the difference between biweekly and bi-monthly payments?

**H2: Related Calculators**
- Early Mortgage Payoff Calculator
- Mortgage Payoff Calculator
- Mortgage Refinance Calculator

---

## 3. Early Mortgage Payoff Calculator

### Calculator Specifications

**Purpose:** Calculate savings from making extra principal payments.

**Inputs:**
```typescript
interface EarlyPayoffInputs {
  currentBalance: number;          // Remaining loan balance
  interestRate: number;            // Annual percentage rate
  remainingYears: number;          // Years left on loan
  extraPayment: number;            // Additional monthly payment
  extraPaymentType: 'monthly' | 'yearly' | 'one-time';
}
```

**Outputs:**
```typescript
interface EarlyPayoffResult {
  originalPayment: number;         // Current monthly payment
  newPayment: number;              // With extra payment
  originalPayoffDate: Date;
  newPayoffDate: Date;
  originalTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
  timeSaved: number;               // Months
  amortizationSchedule: AmortizationItem[];
}
```

### Calculation Logic

1. Calculate original monthly payment using amortization formula
2. Apply extra payment to principal each period
3. Recalculate interest on reduced balance
4. Track when balance reaches $0
5. Compare to original payoff timeline

### UI Components

**Form Section:**
- Number input: Current loan balance (currency)
- Number input: Interest rate (percentage)
- Number input: Remaining years
- Number input: Extra payment amount (currency)
- Radio/Select: Extra payment frequency (monthly, yearly, one-time)
- Button: "Calculate"

**Results Section:**
- Before/After comparison cards
- Primary result: "Save $[amount] in interest"
- Secondary result: "Pay off [X] years, [Y] months earlier"
- Chart: Payoff timeline comparison
- Table: Payment breakdown showing extra payments applied

### Content Requirements

**H1:** Early Mortgage Payoff Calculator - See Your Savings

**Intro:**
"Calculate how much you can save by making extra mortgage payments. See your new payoff date, interest savings, and payment schedule when you add extra principal payments monthly, yearly, or as a one-time payment."

**H2: How to Use the Early Mortgage Payoff Calculator**
**H2: How Extra Payments Save You Money**
**H2: Strategies for Paying Off Your Mortgage Early**
**H2: Frequently Asked Questions**
**H2: Related Calculators**

---

## 4. Balance Transfer Calculator

### Calculator Specifications

**Purpose:** Compare balance transfer credit card offers and calculate savings.

**Inputs:**
```typescript
interface BalanceTransferInputs {
  currentBalance: number;          // Balance to transfer
  currentAPR: number;              // Current card APR
  transferAPR: number;             // Promotional APR (often 0%)
  transferFee: number;             // Percentage fee (typically 3-5%)
  promoLength: number;             // Months of promotional rate
  postPromoAPR: number;            // APR after promo ends
  monthlyPayment: number;          // Planned monthly payment
}
```

**Outputs:**
```typescript
interface BalanceTransferResult {
  transferFeeAmount: number;
  currentInterest: number;         // Interest with current card
  transferInterest: number;        // Interest with transfer
  totalSavings: number;            // After accounting for fee
  payoffMonths: number;
  willPayoffDuringPromo: boolean;
  postPromoBalance: number;        // Balance when promo ends
  paymentSchedule: PaymentScheduleItem[];
}
```

### Calculation Logic

1. Calculate transfer fee: balance × fee percentage
2. Track interest with current card
3. Track interest with transfer card (0% during promo, then higher rate)
4. Apply monthly payments to principal
5. Compare total interest paid
6. Determine if balance is paid before promo ends

### UI Components

**Form Section:**
- Number input: Balance to transfer
- Number input: Current APR
- Number input: Transfer card APR (promotional)
- Number input: Transfer fee (percentage)
- Number input: Promotional period (months)
- Number input: APR after promo
- Number input: Monthly payment amount
- Button: "Compare"

**Results Section:**
- Transfer fee breakdown
- Savings calculation (with/without transfer)
- Warning if balance won't be paid during promo
- Payment schedule showing promo end date
- Recommendation based on savings

### Content Requirements

**H1:** Balance Transfer Calculator - Find the Best Deal

**Intro:**
"Compare balance transfer offers and calculate your savings. Our calculator factors in transfer fees, promotional periods, and post-promotional rates to show if a balance transfer will save you money."

**H2: How to Use the Balance Transfer Calculator**
**H2: Understanding Balance Transfers**
**H2: When Balance Transfers Make Sense**
**H2: Frequently Asked Questions**
**H2: Related Calculators**

---

## 5. Savings Goal Calculator

### Calculator Specifications

**Purpose:** Calculate monthly savings needed to reach a financial goal.

**Inputs:**
```typescript
interface SavingsGoalInputs {
  goalAmount: number;              // Target amount to save
  currentSavings: number;          // Starting balance
  timeframe: number;               // Months to reach goal
  interestRate: number;            // Annual return rate
  contributionFrequency: 'monthly' | 'biweekly' | 'weekly';
}
```

**Outputs:**
```typescript
interface SavingsGoalResult {
  requiredContribution: number;    // Per payment period
  totalContributions: number;      // Sum of all contributions
  totalInterest: number;           // Interest earned
  finalAmount: number;             // Should equal goal
  contributionSchedule: ContributionItem[];
  milestones: Milestone[];         // 25%, 50%, 75%, 100%
}

interface ContributionItem {
  period: number;
  contribution: number;
  interest: number;
  balance: number;
}

interface Milestone {
  percentage: number;
  month: number;
  amount: number;
}
```

### Calculation Logic

Use future value of annuity formula:
```
FV = P × [((1 + r)^n - 1) / r] + PV(1 + r)^n

Solve for P (periodic payment):
P = (FV - PV(1 + r)^n) / [((1 + r)^n - 1) / r]

Where:
  FV = Future value (goal amount)
  PV = Present value (current savings)
  P = Periodic payment (what we're solving for)
  r = Period interest rate
  n = Number of periods
```

### UI Components

**Form Section:**
- Number input: Savings goal (currency)
- Number input: Current savings (currency)
- Number input: Time to reach goal (months or years)
- Number input: Expected interest rate (percentage)
- Select: Contribution frequency
- Button: "Calculate Goal"

**Results Section:**
- Primary result: "Save $[amount] per [period]"
- Progress chart showing growth over time
- Milestone markers (25%, 50%, 75%, 100%)
- Breakdown: contributions vs interest earned
- Tips based on goal timeline

### Content Requirements

**H1:** Savings Goal Calculator - Plan Your Savings

**Intro:**
"Calculate how much to save each month to reach your financial goal. Our calculator accounts for your current savings, expected returns, and timeline to show the exact amount you need to contribute."

**H2: How to Use the Savings Goal Calculator**
**H2: Setting Realistic Savings Goals**
**H2: Maximizing Your Savings**
**H2: Frequently Asked Questions**
**H2: Related Calculators**

---

## Implementation Guidelines for All Calculators

### Form Validation

**Required validations:**
- All number inputs must be positive (except where negative allowed)
- Interest rates between 0-100%
- Balance/amounts minimum $1
- Time periods minimum 1 month/year
- Clear error messages next to fields

**Example error messages:**
```
✅ "Please enter a loan amount greater than $0"
✅ "Interest rate must be between 0% and 100%"
❌ "Invalid input"
❌ "Error"
```

### Number Formatting

**Currency:**
- Display: $1,234.56 (with commas, 2 decimals)
- Input: Allow with or without $ and commas
- Use Intl.NumberFormat for formatting

**Percentages:**
- Display: 4.5% (1 decimal)
- Input: Accept as number without % symbol
- Convert to decimal for calculations (4.5% = 0.045)

**Dates:**
- Display: "January 2027" or "Jan 2027"
- Use readable format, not YYYY-MM-DD

### Chart Requirements

**All charts must:**
- Be responsive (scale with container)
- Use brand colors from design guide
- Have clear labels and legends
- Show tooltips on hover with exact values
- Be accessible (proper ARIA labels)

**Recommended library:** Recharts or Chart.js

### Mobile Considerations

**Form layout:**
- Stack all inputs vertically on mobile
- Larger touch targets (min 44×44px)
- Number inputs show numeric keyboard on mobile
- Buttons full-width on mobile

**Results layout:**
- Results appear below form (not side-by-side)
- Charts scale down or simplify on mobile
- Tables become cards on narrow screens

### Error Handling

**Handle these scenarios:**
- Division by zero (impossible interest rate scenarios)
- Payment less than monthly interest
- Negative balances
- Extremely long payoff periods (>100 years)
- NaN or Infinity results

**Error messages:**
Display user-friendly message, suggest correction:
```
"The monthly payment is too low to pay off this loan. 
Please increase your payment to at least $[minimum]."
```

### Analytics Tracking

Track these events for every calculator:
```typescript
// On calculate button click
gtag('event', 'calculator_used', {
  calculator_name: 'snowball-debt',
  has_results: true
});

// On form completion
gtag('event', 'form_complete', {
  calculator_name: 'snowball-debt',
  num_inputs: numberOfInputs
});

// On error
gtag('event', 'calculator_error', {
  calculator_name: 'snowball-debt',
  error_type: 'validation_error'
});
```

---

## Testing Checklist

For each calculator:

**Functionality:**
- [ ] All inputs accept valid numbers
- [ ] Form validation works correctly
- [ ] Calculate button produces accurate results
- [ ] Reset button clears all fields
- [ ] Results update when inputs change
- [ ] Charts render correctly
- [ ] Mobile layout works

**Calculations:**
- [ ] Verify against manual calculations
- [ ] Test with edge cases (very large/small numbers)
- [ ] Compare to competitor calculators
- [ ] Test boundary conditions (0%, 100% interest)

**SEO:**
- [ ] Title tag includes primary keyword
- [ ] Meta description includes primary keyword
- [ ] H1 uses primary keyword
- [ ] Schema markup present and valid
- [ ] Internal links to 3-5 related calculators
- [ ] Breadcrumbs work correctly

**Performance:**
- [ ] PageSpeed score >90
- [ ] Mobile-friendly test passes
- [ ] No console errors
- [ ] Images optimized
- [ ] JavaScript bundle size reasonable

**Accessibility:**
- [ ] All inputs have labels
- [ ] Error messages associated with fields
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
