'use client';

import { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { Card } from '@/components/ui/Card';
import { Button, Input, Select } from '@/components/ui';
import {
  calculateEarlyPayoff,
  EarlyPayoffResult,
} from '@/lib/calculators/earlyMortgagePayoff';
import { formatCurrency, formatMonthYear } from '@/lib/utils/formatters';

export default function EarlyMortgagePayoffCalculator() {
  const [currentBalance, setCurrentBalance] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [remainingYears, setRemainingYears] = useState<number>(25);
  const [extraPayment, setExtraPayment] = useState<number>(300);
  const [extraPaymentType, setExtraPaymentType] = useState<'monthly' | 'yearly' | 'one-time'>('monthly');
  const [result, setResult] = useState<EarlyPayoffResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    try {
      setError('');

      if (currentBalance <= 0) {
        setError('Current balance must be greater than $0');
        return;
      }

      if (interestRate < 0 || interestRate > 100) {
        setError('Interest rate must be between 0% and 100%');
        return;
      }

      if (remainingYears <= 0) {
        setError('Remaining years must be greater than 0');
        return;
      }

      if (extraPayment < 0) {
        setError('Extra payment cannot be negative');
        return;
      }

      const calculatedResult = calculateEarlyPayoff({
        currentBalance,
        interestRate,
        remainingYears,
        extraPayment,
        extraPaymentType,
      });
      setResult(calculatedResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during calculation'
      );
    }
  };

  const handleReset = () => {
    setCurrentBalance(250000);
    setInterestRate(6.5);
    setRemainingYears(25);
    setExtraPayment(300);
    setExtraPaymentType('monthly');
    setResult(null);
    setError('');
  };

  const relatedCalculators = [
    {
      name: 'Biweekly Mortgage Payment Calculator',
      description: 'See how much you can save with biweekly mortgage payments.',
      href: '/mortgage/biweekly-mortgage-payment-calculator',
    },
    {
      name: 'Snowball Debt Calculator',
      description: 'Create a debt payoff plan using the snowball method.',
      href: '/debt/snowball-debt-calculator',
    },
    {
      name: 'Balance Transfer Calculator',
      description: 'Compare balance transfer offers and calculate savings.',
      href: '/debt/balance-transfer-calculator',
    },
  ];

  return (
    <CalculatorLayout
      breadcrumbs={[
        { name: 'Mortgage', href: '/mortgage' },
        { name: 'Early Mortgage Payoff Calculator' },
      ]}
      title="Early Mortgage Payoff Calculator - See Your Savings"
      description="Calculate how much you can save by making extra mortgage payments. See your new payoff date, interest savings, and payment schedule when you add extra principal payments monthly, yearly, or as a one-time payment."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[600px,1fr] gap-8">
        {/* Calculator Form */}
        <div>
          <Card variant="calculator">
            <h2 className="text-2xl font-bold text-[--color-slate-900] mb-6">
              Enter Mortgage Details
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <Input
                label="Current Loan Balance"
                type="number"
                isCurrency
                value={currentBalance || ''}
                onChange={(e) => setCurrentBalance(parseFloat(e.target.value) || 0)}
                placeholder="250000"
              />

              <Input
                label="Interest Rate (%)"
                type="number"
                step="0.1"
                value={interestRate || ''}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                placeholder="6.5"
              />

              <Input
                label="Remaining Years"
                type="number"
                value={remainingYears || ''}
                onChange={(e) => setRemainingYears(parseFloat(e.target.value) || 0)}
                placeholder="25"
                helperText="How many years are left on your mortgage"
              />

              <Input
                label="Extra Payment Amount"
                type="number"
                isCurrency
                value={extraPayment || ''}
                onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
                placeholder="300"
              />

              <Select
                label="Extra Payment Frequency"
                value={extraPaymentType}
                onChange={(e) => setExtraPaymentType(e.target.value as 'monthly' | 'yearly' | 'one-time')}
                options={[
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'yearly', label: 'Once per year' },
                  { value: 'one-time', label: 'One-time payment' },
                ]}
              />

              <div className="flex gap-4">
                <Button size="large" onClick={handleCalculate} className="flex-1">
                  Calculate Savings
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
            <div className="space-y-6">
              {/* Savings Highlight */}
              <Card variant="result">
                <div className="text-center">
                  <div className="text-sm font-semibold text-[--color-slate-600] uppercase tracking-wider mb-2">
                    Total Interest Saved
                  </div>
                  <div className="text-5xl font-bold text-[--color-success] font-[family-name:var(--font-jetbrains-mono)] tabular-nums mb-4">
                    {formatCurrency(result.interestSaved)}
                  </div>
                  <div className="text-lg text-[--color-slate-700]">
                    Pay off your mortgage{' '}
                    <span className="font-bold text-[--color-success]">
                      {Math.floor(result.timeSavedMonths / 12)} years {result.timeSavedMonths % 12} months
                    </span>{' '}
                    earlier
                  </div>
                </div>
              </Card>

              {/* Comparison */}
              <Card>
                <h3 className="text-xl font-bold text-[--color-slate-900] mb-6">
                  Before vs After Comparison
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-[--color-slate-50] rounded-lg">
                    <div>
                      <div className="text-sm text-[--color-slate-600] mb-1">
                        Original Payment
                      </div>
                      <div className="text-xl font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                        {formatCurrency(result.originalPayment)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[--color-slate-600] mb-1">
                        New Payment
                      </div>
                      <div className="text-xl font-semibold text-[--color-primary-600] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                        {formatCurrency(result.newPayment)}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                    <span className="text-[--color-slate-600]">Original Payoff Date</span>
                    <span className="font-semibold text-[--color-slate-900]">
                      {formatMonthYear(result.originalPayoffDate)}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                    <span className="text-[--color-slate-600]">New Payoff Date</span>
                    <span className="font-semibold text-[--color-primary-600]">
                      {formatMonthYear(result.newPayoffDate)}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                    <span className="text-[--color-slate-600]">Original Total Interest</span>
                    <span className="font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                      {formatCurrency(result.originalTotalInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                    <span className="text-[--color-slate-600]">New Total Interest</span>
                    <span className="font-semibold text-[--color-primary-600] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                      {formatCurrency(result.newTotalInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 bg-[--color-success]/10 rounded-lg px-4">
                    <span className="text-[--color-slate-900] font-semibold">Interest Saved</span>
                    <span className="font-bold text-[--color-success] text-lg font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                      {formatCurrency(result.interestSaved)}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className="mt-16 max-w-4xl">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            How to Use the Early Mortgage Payoff Calculator
          </h2>
          <div className="space-y-4 text-[--color-slate-700]">
            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 1: Enter Your Current Mortgage Details
            </h3>
            <p>
              Start by entering your current loan balance, interest rate, and the number of years remaining on your mortgage. You can find these details on your monthly mortgage statement.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 2: Add Your Extra Payment Amount
            </h3>
            <p>
              Enter how much extra you want to pay toward your mortgage principal. Even an additional $100-300 per month can save tens of thousands in interest over the life of your loan.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 3: Choose Your Payment Frequency
            </h3>
            <p>
              Select whether you'll make extra payments monthly, once per year, or as a one-time payment. Monthly extra payments have the biggest impact because they reduce your principal balance consistently throughout the year.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            How Extra Payments Save You Money
          </h2>
          <div className="space-y-4 text-[--color-slate-700]">
            <p>
              When you make extra principal payments on your mortgage, you reduce the balance that accrues interest each month. This has a compound effect over time, significantly reducing the total interest you'll pay and shortening your loan term.
            </p>
            <p>
              For example, on a $250,000 mortgage at 6.5% interest with 25 years remaining, adding just $300 per month in extra payments could save you over $60,000 in interest and pay off your mortgage about 8 years earlier.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Where to Find Extra Money for Mortgage Payments
            </h3>
            <p>
              Consider using tax refunds, work bonuses, or side income for extra mortgage payments. Even applying half of an annual bonus or redirecting a eliminated expense (like a paid-off car loan) can make a significant difference.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            Strategies for Paying Off Your Mortgage Early
          </h2>
          <ul className="space-y-3 text-[--color-slate-700]">
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">1.</span>
              <span>
                <strong>Make one extra payment per year</strong> - Apply a 13th payment annually to save thousands in interest
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">2.</span>
              <span>
                <strong>Round up your payments</strong> - If your payment is $1,847, round up to $2,000
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">3.</span>
              <span>
                <strong>Apply windfalls to principal</strong> - Use bonuses, tax refunds, or inheritance
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">4.</span>
              <span>
                <strong>Refinance to a shorter term</strong> - If rates are lower, refinance from 30 to 15 years
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">5.</span>
              <span>
                <strong>Set up automatic extra payments</strong> - Make it automatic so you don't have to think about it
              </span>
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
                Should I pay off my mortgage early or invest the money?
              </h3>
              <p className="text-[--color-slate-700]">
                It depends on your interest rate and investment returns. If your mortgage rate is 6% and you can earn 8% investing, investing may be better. However, paying off your mortgage provides guaranteed returns and peace of mind.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Will my lender charge a prepayment penalty?
              </h3>
              <p className="text-[--color-slate-700]">
                Most modern mortgages don't have prepayment penalties, but it's important to check your loan documents. Prepayment penalties are more common on refinanced loans from certain lenders.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Can I still claim the mortgage interest deduction?
              </h3>
              <p className="text-[--color-slate-700]">
                Yes, you can still deduct mortgage interest on your taxes even if you're making extra principal payments. However, as you pay down your balance, your annual interest paid (and therefore your deduction) will decrease.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                How do I make sure my extra payment goes toward principal?
              </h3>
              <p className="text-[--color-slate-700]">
                When making extra payments, specify that the additional amount should be applied to principal only. Most lenders have a field for this in their online payment system, or you can include a note with your check.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                What if I can't afford extra payments every month?
              </h3>
              <p className="text-[--color-slate-700]">
                Making extra payments only when you can afford it still helps. Even one extra payment per year or applying bonuses and tax refunds to your principal will reduce your total interest paid.
              </p>
            </div>
          </div>
        </section>
      </div>

      <RelatedCalculators calculators={relatedCalculators} />
    </CalculatorLayout>
  );
}
