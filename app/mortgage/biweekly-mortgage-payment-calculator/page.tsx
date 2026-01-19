'use client';

import { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { Card } from '@/components/ui/Card';
import { Button, Input, Select } from '@/components/ui';
import {
  calculateBiweeklyMortgage,
  BiweeklyMortgageResult,
} from '@/lib/calculators/biweeklyMortgage';
import { formatCurrency } from '@/lib/utils/formatters';

export default function BiweeklyMortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [result, setResult] = useState<BiweeklyMortgageResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    try {
      setError('');

      if (loanAmount <= 0) {
        setError('Loan amount must be greater than $0');
        return;
      }

      if (interestRate < 0 || interestRate > 100) {
        setError('Interest rate must be between 0% and 100%');
        return;
      }

      if (loanTerm <= 0) {
        setError('Loan term must be greater than 0 years');
        return;
      }

      const calculatedResult = calculateBiweeklyMortgage({
        loanAmount,
        interestRate,
        loanTerm,
      });
      setResult(calculatedResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during calculation'
      );
    }
  };

  const handleReset = () => {
    setLoanAmount(300000);
    setInterestRate(6.5);
    setLoanTerm(30);
    setResult(null);
    setError('');
  };

  const relatedCalculators = [
    {
      name: 'Early Mortgage Payoff Calculator',
      description: 'Calculate how much you can save with extra mortgage payments.',
      href: '/mortgage/early-mortgage-payoff-calculator',
    },
    {
      name: 'Snowball Debt Calculator',
      description: 'Create a debt payoff plan using the snowball method.',
      href: '/debt/snowball-debt-calculator',
    },
    {
      name: 'Savings Goal Calculator',
      description: 'Calculate how much to save monthly to reach your goal.',
      href: '/savings/savings-goal-calculator',
    },
  ];

  return (
    <CalculatorLayout
      breadcrumbs={[
        { name: 'Mortgage', href: '/mortgage' },
        { name: 'Biweekly Mortgage Payment Calculator' },
      ]}
      title="Biweekly Mortgage Payment Calculator"
      description="Calculate how much you'll save with biweekly mortgage payments. Our calculator shows the interest savings and time saved when you make half your monthly payment every two weeks instead of one full payment monthly."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[600px,1fr] gap-8">
        {/* Calculator Form */}
        <div>
          <Card variant="calculator">
            <h2 className="text-2xl font-bold text-[--color-slate-900] mb-6">
              Enter Loan Details
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <Input
                label="Loan Amount"
                type="number"
                isCurrency
                value={loanAmount || ''}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                placeholder="300000"
              />

              <Input
                label="Interest Rate (%)"
                type="number"
                step="0.1"
                value={interestRate || ''}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                placeholder="6.5"
              />

              <Select
                label="Loan Term"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                options={[
                  { value: 15, label: '15 years' },
                  { value: 20, label: '20 years' },
                  { value: 30, label: '30 years' },
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
                    Total Savings
                  </div>
                  <div className="text-5xl font-bold text-[--color-success] font-[family-name:var(--font-jetbrains-mono)] tabular-nums mb-4">
                    {formatCurrency(result.interestSaved)}
                  </div>
                  <div className="text-lg text-[--color-slate-700]">
                    Pay off your mortgage{' '}
                    <span className="font-bold text-[--color-success]">
                      {result.timeSavedYears} years {result.timeSavedMonths % 12} months
                    </span>{' '}
                    earlier
                  </div>
                </div>
              </Card>

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly Payment */}
                <Card>
                  <h3 className="text-lg font-bold text-[--color-slate-900] mb-4">
                    Monthly Payments
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-[--color-slate-600] mb-1">
                        Payment Amount
                      </div>
                      <div className="text-2xl font-bold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                        {formatCurrency(result.monthlyPayment)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[--color-slate-600] mb-1">
                        Payoff Time
                      </div>
                      <div className="text-xl font-semibold text-[--color-slate-900]">
                        {Math.floor(result.monthlyPayoffMonths / 12)} years{' '}
                        {result.monthlyPayoffMonths % 12} months
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[--color-slate-600] mb-1">
                        Total Interest
                      </div>
                      <div className="text-xl font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                        {formatCurrency(result.monthlyTotalInterest)}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Biweekly Payment */}
                <Card className="border-2 border-[--color-primary-500]">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-[--color-slate-900]">
                      Biweekly Payments
                    </h3>
                    <span className="text-xs font-semibold text-[--color-primary-600] bg-[--color-primary-100] px-2 py-1 rounded">
                      RECOMMENDED
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-[--color-slate-600] mb-1">
                        Payment Amount
                      </div>
                      <div className="text-2xl font-bold text-[--color-primary-600] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                        {formatCurrency(result.biweeklyPayment)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[--color-slate-600] mb-1">
                        Payoff Time
                      </div>
                      <div className="text-xl font-semibold text-[--color-slate-900]">
                        {Math.floor(result.biweeklyPayoffMonths / 12)} years{' '}
                        {result.biweeklyPayoffMonths % 12} months
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[--color-slate-600] mb-1">
                        Total Interest
                      </div>
                      <div className="text-xl font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                        {formatCurrency(result.biweeklyTotalInterest)}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className="mt-16 max-w-4xl">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            How to Use the Biweekly Mortgage Payment Calculator
          </h2>
          <div className="space-y-4 text-[--color-slate-700]">
            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 1: Enter Your Loan Amount and Interest Rate
            </h3>
            <p>
              Enter your current mortgage balance or the loan amount if you're planning a new mortgage. Then add your interest rate. You can find this on your mortgage statement or loan documents.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 2: Select Your Loan Term
            </h3>
            <p>
              Choose your loan term - typically 15 or 30 years. If you already have a mortgage, use the remaining term, not the original term.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 3: Compare Monthly vs Biweekly Payments
            </h3>
            <p>
              Review the side-by-side comparison to see exactly how much you'll save in interest and how much sooner you'll pay off your mortgage with biweekly payments.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            Understanding Biweekly Mortgage Payments
          </h2>
          <div className="space-y-4 text-[--color-slate-700]">
            <p>
              With biweekly mortgage payments, you pay half of your monthly payment every two weeks instead of making one full payment per month. This schedule results in 26 half-payments per year, which equals 13 full monthly payments instead of 12.
            </p>
            <p>
              That extra payment goes directly toward your principal balance, reducing the amount of interest you pay over the life of the loan and helping you pay off your mortgage years earlier.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              How Much Can You Save?
            </h3>
            <p>
              Homeowners who switch to biweekly payments typically save $30,000-$60,000 in interest on a 30-year mortgage and pay off their loan 4-6 years early. The exact savings depend on your loan amount, interest rate, and how early you start making biweekly payments.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Setting Up Biweekly Payments
            </h3>
            <p>
              Contact your mortgage lender to set up biweekly payments. Some lenders offer this for free, while others charge a setup fee. Alternatively, you can manually make an extra payment each year to achieve similar results.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            Benefits of Biweekly Payments
          </h2>
          <ul className="space-y-3 text-[--color-slate-700]">
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span>
                <strong>Pay off your mortgage faster</strong> - Typically 4-6 years early on a 30-year mortgage
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span>
                <strong>Save thousands in interest</strong> - Most homeowners save $30,000-$60,000
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span>
                <strong>Build equity quicker</strong> - More of each payment goes toward principal
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span>
                <strong>Align with your paycheck</strong> - Easy to budget if you're paid biweekly
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
                How much can I save with biweekly mortgage payments?
              </h3>
              <p className="text-[--color-slate-700]">
                On a $300,000 30-year mortgage at 6.5% interest, biweekly payments typically save around $50,000 in interest and pay off the loan about 5 years early. Your exact savings depend on your loan amount and interest rate.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Will my lender accept biweekly payments?
              </h3>
              <p className="text-[--color-slate-700]">
                Most lenders accept biweekly payments, but policies vary. Contact your lender to set it up. If they don't offer automatic biweekly payments, you can achieve the same result by making one extra monthly payment per year.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Is there a fee for biweekly payments?
              </h3>
              <p className="text-[--color-slate-700]">
                Some lenders charge a setup fee for automatic biweekly payment programs, typically $200-$400. However, many lenders offer it for free. Ask your lender about their policy before enrolling.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Can I make biweekly payments on any mortgage?
              </h3>
              <p className="text-[--color-slate-700]">
                Yes, biweekly payments work with most mortgages including conventional, FHA, and VA loans. Check your loan documents for any prepayment penalties, though these are rare on modern mortgages.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                What's the difference between biweekly and bi-monthly payments?
              </h3>
              <p className="text-[--color-slate-700]">
                Biweekly means every two weeks (26 payments per year), while bi-monthly means twice per month (24 payments per year). Only biweekly payments result in making 13 monthly payments per year, which is what creates the interest savings.
              </p>
            </div>
          </div>
        </section>
      </div>

      <RelatedCalculators calculators={relatedCalculators} />
    </CalculatorLayout>
  );
}
