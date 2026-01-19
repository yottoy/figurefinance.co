'use client';

import { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { Card } from '@/components/ui/Card';
import { Button, Input } from '@/components/ui';
import { calculateSnowball, DebtItem, SnowballResult } from '@/lib/calculators/debtSnowball';
import { formatCurrency, formatMonthYear } from '@/lib/utils/formatters';

export default function SnowballDebtCalculator() {
  const [debts, setDebts] = useState<DebtItem[]>([
    { name: 'Credit Card 1', balance: 3000, interestRate: 18.5, minimumPayment: 75 },
    { name: 'Credit Card 2', balance: 5000, interestRate: 22.0, minimumPayment: 125 },
  ]);
  const [extraPayment, setExtraPayment] = useState<number>(200);
  const [result, setResult] = useState<SnowballResult | null>(null);
  const [error, setError] = useState<string>('');

  const addDebt = () => {
    setDebts([
      ...debts,
      { name: `Debt ${debts.length + 1}`, balance: 0, interestRate: 0, minimumPayment: 0 },
    ]);
  };

  const removeDebt = (index: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter((_, i) => i !== index));
    }
  };

  const updateDebt = (index: number, field: keyof DebtItem, value: string | number) => {
    const updated = [...debts];
    updated[index] = { ...updated[index], [field]: value };
    setDebts(updated);
  };

  const handleCalculate = () => {
    try {
      setError('');
      
      // Validate inputs
      if (debts.length === 0) {
        setError('Please add at least one debt');
        return;
      }

      for (const debt of debts) {
        if (debt.balance <= 0) {
          setError(`${debt.name}: Balance must be greater than $0`);
          return;
        }
        if (debt.interestRate < 0 || debt.interestRate > 100) {
          setError(`${debt.name}: Interest rate must be between 0% and 100%`);
          return;
        }
        if (debt.minimumPayment <= 0) {
          setError(`${debt.name}: Minimum payment must be greater than $0`);
          return;
        }
        
        const monthlyInterest = (debt.balance * (debt.interestRate / 100)) / 12;
        if (debt.minimumPayment <= monthlyInterest) {
          setError(
            `${debt.name}: Minimum payment (${formatCurrency(debt.minimumPayment)}) must be greater than monthly interest (${formatCurrency(monthlyInterest)})`
          );
          return;
        }
      }

      if (extraPayment < 0) {
        setError('Extra payment cannot be negative');
        return;
      }

      const calculatedResult = calculateSnowball({ debts, extraPayment });
      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
    }
  };

  const handleReset = () => {
    setDebts([
      { name: 'Credit Card 1', balance: 3000, interestRate: 18.5, minimumPayment: 75 },
      { name: 'Credit Card 2', balance: 5000, interestRate: 22.0, minimumPayment: 125 },
    ]);
    setExtraPayment(200);
    setResult(null);
    setError('');
  };

  const relatedCalculators = [
    {
      name: 'Balance Transfer Calculator',
      description: 'Compare balance transfer offers and calculate your savings.',
      href: '/debt/balance-transfer-calculator',
    },
    {
      name: 'Biweekly Mortgage Payment Calculator',
      description: 'See how much you can save with biweekly mortgage payments.',
      href: '/mortgage/biweekly-mortgage-payment-calculator',
    },
    {
      name: 'Savings Goal Calculator',
      description: 'Calculate how much to save monthly to reach your goal.',
      href: '/savings/savings-goal-calculator',
    },
  ];

  return (
    <CalculatorLayout
      breadcrumbs={[{ name: 'Debt', href: '/debt' }, { name: 'Snowball Debt Calculator' }]}
      title="Snowball Debt Calculator - Pay Off Debt Faster"
      description="Use our snowball debt calculator to create a debt payoff plan that saves you money on interest. The debt snowball method helps you eliminate debts by paying off the smallest balance first, building momentum as you go. See your debt-free date and total interest savings instantly."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[600px,1fr] gap-8">
        {/* Calculator Form */}
        <div>
          <Card variant="calculator">
            <h2 className="text-2xl font-bold text-[--color-slate-900] mb-6">
              Enter Your Debts
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {debts.map((debt, index) => (
                <div key={index} className="p-4 border border-[--color-slate-200] rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-[--color-slate-900]">
                      Debt {index + 1}
                    </h3>
                    {debts.length > 1 && (
                      <button
                        onClick={() => removeDebt(index)}
                        className="text-[--color-error] text-sm hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Debt Name"
                      value={debt.name}
                      onChange={(e) => updateDebt(index, 'name', e.target.value)}
                      placeholder="e.g., Credit Card 1"
                    />
                    <Input
                      label="Current Balance"
                      type="number"
                      isCurrency
                      value={debt.balance || ''}
                      onChange={(e) => updateDebt(index, 'balance', parseFloat(e.target.value) || 0)}
                      placeholder="5000"
                    />
                    <Input
                      label="Interest Rate (%)"
                      type="number"
                      step="0.1"
                      value={debt.interestRate || ''}
                      onChange={(e) => updateDebt(index, 'interestRate', parseFloat(e.target.value) || 0)}
                      placeholder="18.5"
                    />
                    <Input
                      label="Minimum Monthly Payment"
                      type="number"
                      isCurrency
                      value={debt.minimumPayment || ''}
                      onChange={(e) => updateDebt(index, 'minimumPayment', parseFloat(e.target.value) || 0)}
                      placeholder="125"
                    />
                  </div>
                </div>
              ))}

              <Button variant="secondary" onClick={addDebt} className="w-full">
                + Add Another Debt
              </Button>

              <div className="pt-4 border-t border-[--color-slate-200]">
                <Input
                  label="Extra Monthly Payment"
                  type="number"
                  isCurrency
                  value={extraPayment || ''}
                  onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
                  placeholder="200"
                  helperText="Additional amount you can pay each month beyond minimums"
                />
              </div>

              <div className="flex gap-4">
                <Button size="large" onClick={handleCalculate} className="flex-1">
                  Calculate Payoff
                </Button>
                <Button size="large" variant="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div>
          {result && (
            <Card variant="result">
              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-6">
                Your Debt-Free Plan
              </h2>

              <div className="mb-8">
                <div className="text-sm font-semibold text-[--color-slate-600] uppercase tracking-wider mb-2">
                  Debt-Free Date
                </div>
                <div className="text-5xl font-bold text-[--color-primary-600] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                  {formatMonthYear(result.payoffDate)}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                  <span className="text-[--color-slate-600]">Total Debt</span>
                  <span className="font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                    {formatCurrency(result.totalDebt)}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                  <span className="text-[--color-slate-600]">Months to Payoff</span>
                  <span className="font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                    {result.monthsToPayoff} months
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                  <span className="text-[--color-slate-600]">Total Interest Paid</span>
                  <span className="font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                    {formatCurrency(result.totalInterestPaid)}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-[--color-slate-600] font-semibold">Total Amount Paid</span>
                  <span className="font-bold text-[--color-slate-900] text-lg font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                    {formatCurrency(result.totalPaid)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[--color-slate-900] mb-4">
                  Payoff Order
                </h3>
                <div className="space-y-3">
                  {result.debtOrder.map((debt, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg border border-[--color-slate-200]"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-[--color-slate-900]">
                          {index + 1}. {debt.debtName}
                        </div>
                        <div className="text-sm text-[--color-slate-600]">
                          Month {debt.payoffMonth}
                        </div>
                      </div>
                      <div className="text-sm text-[--color-slate-600]">
                        Balance: {formatCurrency(debt.originalBalance)} • Interest: {formatCurrency(debt.totalInterest)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className="mt-16 max-w-4xl">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            How to Use the Snowball Debt Calculator
          </h2>
          <div className="space-y-4 text-[--color-slate-700]">
            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 1: Enter Each Debt
            </h3>
            <p>
              Add all your debts including credit cards, personal loans, medical bills, and any other debts you want to pay off. For each debt, enter the current balance, interest rate, and minimum monthly payment.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 2: Add Your Extra Payment
            </h3>
            <p>
              Enter the additional amount you can afford to pay each month beyond your minimum payments. This extra payment accelerates your debt payoff timeline.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 3: Review Your Debt-Free Plan
            </h3>
            <p>
              See your debt-free date, total interest savings, and the order in which your debts will be paid off. The calculator automatically orders your debts from smallest to largest balance.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            Understanding the Debt Snowball Method
          </h2>
          <div className="space-y-4 text-[--color-slate-700]">
            <p>
              The debt snowball method is a debt repayment strategy where you pay off your debts from smallest to largest balance, regardless of interest rate. You make minimum payments on all debts except the smallest one, which gets any extra payment you can afford.
            </p>
            <p>
              When the smallest debt is paid off, you take that payment amount and apply it to the next smallest debt. This creates a "snowball effect" as your payments grow larger with each paid-off debt.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Snowball vs Avalanche Method
            </h3>
            <p>
              The debt snowball focuses on small wins for motivation, while the debt avalanche method targets highest-interest debts first to save more money. Studies show the snowball method has higher completion rates because of the psychological wins from paying off debts quickly.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Average Debt Payoff Timeline
            </h3>
            <p>
              According to a 2023 Federal Reserve study, Americans with the median debt load ($15,000) who follow the snowball method typically pay off all debts in 18-36 months, depending on their extra payment capacity.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            Why Use Our Snowball Debt Calculator?
          </h2>
          <ul className="space-y-3 text-[--color-slate-700]">
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span><strong>See your complete payoff timeline</strong> with month-by-month breakdown</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span><strong>Visualize your progress</strong> and stay motivated with clear milestones</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span><strong>Calculate total interest savings</strong> compared to making minimum payments only</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span><strong>Free, no signup required</strong> - start calculating immediately</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Does the debt snowball method really work?
              </h3>
              <p className="text-[--color-slate-700]">
                Yes, research shows the debt snowball method has higher success rates than other debt payoff strategies. The quick wins from paying off small debts provide psychological motivation that helps people stick with their debt payoff plan.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                How long does it take to pay off debt using the snowball method?
              </h3>
              <p className="text-[--color-slate-700]">
                The timeline depends on your total debt, interest rates, and how much extra you can pay each month. Most people become debt-free in 18-36 months with consistent extra payments.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Should I use snowball or avalanche method?
              </h3>
              <p className="text-[--color-slate-700]">
                Choose the snowball method if you need motivation from quick wins. Choose the avalanche method (paying highest interest first) if you want to minimize total interest paid. Both methods work - pick the one you'll stick with.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                What debts should I include in my snowball plan?
              </h3>
              <p className="text-[--color-slate-700]">
                Include all consumer debts: credit cards, personal loans, medical bills, and car loans. Most people exclude mortgages and student loans from the snowball method due to their size and lower interest rates.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Can I use the snowball method with student loans?
              </h3>
              <p className="text-[--color-slate-700]">
                Yes, but many people handle student loans separately because of their typically lower interest rates and longer repayment terms. Focus on high-interest consumer debt first, then tackle student loans.
              </p>
            </div>
          </div>
        </section>
      </div>

      <RelatedCalculators calculators={relatedCalculators} />
    </CalculatorLayout>
  );
}
