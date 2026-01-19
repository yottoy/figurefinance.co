'use client';

import { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { Card } from '@/components/ui/Card';
import { Button, Input, Select } from '@/components/ui';
import {
  calculateSavingsGoal,
  SavingsGoalResult,
} from '@/lib/calculators/savingsGoal';
import { formatCurrency } from '@/lib/utils/formatters';

export default function SavingsGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState<number>(50000);
  const [currentSavings, setCurrentSavings] = useState<number>(5000);
  const [timeframe, setTimeframe] = useState<number>(36);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [contributionFrequency, setContributionFrequency] = useState<'monthly' | 'biweekly' | 'weekly'>('monthly');
  const [result, setResult] = useState<SavingsGoalResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    try {
      setError('');

      if (goalAmount <= 0) {
        setError('Goal amount must be greater than $0');
        return;
      }

      if (currentSavings < 0) {
        setError('Current savings cannot be negative');
        return;
      }

      if (currentSavings >= goalAmount) {
        setError('Current savings must be less than your goal amount');
        return;
      }

      if (timeframe <= 0) {
        setError('Timeframe must be greater than 0 months');
        return;
      }

      if (interestRate < 0 || interestRate > 100) {
        setError('Interest rate must be between 0% and 100%');
        return;
      }

      const calculatedResult = calculateSavingsGoal({
        goalAmount,
        currentSavings,
        timeframe,
        interestRate,
        contributionFrequency,
      });
      setResult(calculatedResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during calculation'
      );
    }
  };

  const handleReset = () => {
    setGoalAmount(50000);
    setCurrentSavings(5000);
    setTimeframe(36);
    setInterestRate(4.5);
    setContributionFrequency('monthly');
    setResult(null);
    setError('');
  };

  const getFrequencyLabel = () => {
    switch (contributionFrequency) {
      case 'weekly':
        return 'per week';
      case 'biweekly':
        return 'per 2 weeks';
      case 'monthly':
      default:
        return 'per month';
    }
  };

  const relatedCalculators = [
    {
      name: 'Snowball Debt Calculator',
      description: 'Create a debt payoff plan using the snowball method.',
      href: '/debt/snowball-debt-calculator',
    },
    {
      name: 'Early Mortgage Payoff Calculator',
      description: 'Calculate savings from extra mortgage payments.',
      href: '/mortgage/early-mortgage-payoff-calculator',
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
        { name: 'Savings', href: '/savings' },
        { name: 'Savings Goal Calculator' },
      ]}
      title="Savings Goal Calculator - Plan Your Savings"
      description="Calculate how much to save each month to reach your financial goal. Our calculator accounts for your current savings, expected returns, and timeline to show the exact amount you need to contribute."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[600px,1fr] gap-8">
        {/* Calculator Form */}
        <div>
          <Card variant="calculator">
            <h2 className="text-2xl font-bold text-[--color-slate-900] mb-6">
              Set Your Savings Goal
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <Input
                label="Savings Goal"
                type="number"
                isCurrency
                value={goalAmount || ''}
                onChange={(e) => setGoalAmount(parseFloat(e.target.value) || 0)}
                placeholder="50000"
                helperText="How much do you want to save?"
              />

              <Input
                label="Current Savings"
                type="number"
                isCurrency
                value={currentSavings || ''}
                onChange={(e) => setCurrentSavings(parseFloat(e.target.value) || 0)}
                placeholder="5000"
                helperText="How much have you saved so far?"
              />

              <Input
                label="Timeframe (months)"
                type="number"
                value={timeframe || ''}
                onChange={(e) => setTimeframe(parseFloat(e.target.value) || 0)}
                placeholder="36"
                helperText="How many months until you need this money?"
              />

              <Input
                label="Expected Interest Rate (%)"
                type="number"
                step="0.1"
                value={interestRate || ''}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                placeholder="4.5"
                helperText="Annual return rate (e.g., savings account, investment)"
              />

              <Select
                label="Contribution Frequency"
                value={contributionFrequency}
                onChange={(e) =>
                  setContributionFrequency(e.target.value as 'monthly' | 'biweekly' | 'weekly')
                }
                options={[
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'biweekly', label: 'Every 2 weeks' },
                  { value: 'weekly', label: 'Weekly' },
                ]}
              />

              <div className="flex gap-4">
                <Button size="large" onClick={handleCalculate} className="flex-1">
                  Calculate Plan
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
              {/* Primary Result */}
              <Card variant="result">
                <div className="text-center">
                  <div className="text-sm font-semibold text-[--color-slate-600] uppercase tracking-wider mb-2">
                    Save This Amount
                  </div>
                  <div className="text-5xl font-bold text-[--color-primary-600] font-[family-name:var(--font-jetbrains-mono)] tabular-nums mb-2">
                    {formatCurrency(result.requiredContribution)}
                  </div>
                  <div className="text-lg text-[--color-slate-700]">
                    {getFrequencyLabel()}
                  </div>
                </div>
              </Card>

              {/* Breakdown */}
              <Card>
                <h3 className="text-xl font-bold text-[--color-slate-900] mb-6">
                  Your Savings Plan
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                    <span className="text-[--color-slate-600]">Starting Balance</span>
                    <span className="font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                      {formatCurrency(currentSavings)}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                    <span className="text-[--color-slate-600]">Total Contributions</span>
                    <span className="font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                      {formatCurrency(result.totalContributions)}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                    <span className="text-[--color-slate-600]">Interest Earned</span>
                    <span className="font-semibold text-[--color-success] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                      {formatCurrency(result.totalInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 bg-[--color-primary-50] rounded-lg px-4">
                    <span className="text-[--color-slate-900] font-semibold">Final Amount</span>
                    <span className="font-bold text-[--color-primary-600] text-lg font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                      {formatCurrency(result.finalAmount)}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Milestones */}
              <Card>
                <h3 className="text-xl font-bold text-[--color-slate-900] mb-6">
                  Progress Milestones
                </h3>
                <div className="space-y-3">
                  {result.milestones.map((milestone, index) => {
                    const periodsLabel = {
                      monthly: 'months',
                      biweekly: 'biweekly periods',
                      weekly: 'weeks',
                    }[contributionFrequency];

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-[--color-slate-50] rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[--color-primary-500] flex items-center justify-center">
                            <span className="text-white font-bold">{milestone.percentage}%</span>
                          </div>
                          <div>
                            <div className="font-semibold text-[--color-slate-900]">
                              {formatCurrency(milestone.amount)}
                            </div>
                            <div className="text-sm text-[--color-slate-600]">
                              Period {milestone.period} ({Math.floor((milestone.period * 12) / {
                                monthly: 12,
                                biweekly: 26,
                                weekly: 52,
                              }[contributionFrequency])} months)
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
            How to Use the Savings Goal Calculator
          </h2>
          <div className="space-y-4 text-[--color-slate-700]">
            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 1: Set Your Financial Goal
            </h3>
            <p>
              Enter the total amount you want to save. This could be for a down payment on a house, an emergency fund, a vacation, or any other financial goal.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 2: Enter Your Starting Point
            </h3>
            <p>
              Input how much you've already saved toward this goal. If you're starting from scratch, enter $0. Also specify your timeframe - how many months you have to reach your goal.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 3: Add Expected Returns
            </h3>
            <p>
              Enter the interest rate or expected return on your savings. For a high-yield savings account, this might be 4-5%. For investments, it could be higher. Use 0% if you're keeping cash under your mattress (not recommended!).
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            Setting Realistic Savings Goals
          </h2>
          <div className="space-y-4 text-[--color-slate-700]">
            <p>
              A good savings goal is specific, measurable, and achievable within your timeframe. Start by identifying what you're saving for and when you need the money. Common savings goals include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Emergency fund: 3-6 months of expenses</li>
              <li>Down payment: 10-20% of home price</li>
              <li>Vacation: Total trip cost including airfare and accommodations</li>
              <li>New car: Down payment or full purchase price</li>
              <li>Wedding: Average wedding costs $20,000-$30,000</li>
            </ul>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Breaking Down Large Goals
            </h3>
            <p>
              If your required contribution seems too high, consider adjusting your timeframe or goal amount. Sometimes it's better to save for a bit longer than to set an unrealistic monthly target that you won't be able to maintain.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            Maximizing Your Savings
          </h2>
          <ul className="space-y-3 text-[--color-slate-700]">
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">1.</span>
              <span>
                <strong>Automate your savings</strong> - Set up automatic transfers on payday so you never miss a contribution
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">2.</span>
              <span>
                <strong>Use a high-yield savings account</strong> - Earn 4-5% APY instead of the national average of 0.5%
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">3.</span>
              <span>
                <strong>Cut unnecessary expenses</strong> - Cancel unused subscriptions and redirect that money to savings
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">4.</span>
              <span>
                <strong>Save windfalls</strong> - Put tax refunds, bonuses, and birthday money toward your goal
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">5.</span>
              <span>
                <strong>Track your progress</strong> - Review your savings monthly and celebrate milestones
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
                What's a realistic savings rate?
              </h3>
              <p className="text-[--color-slate-700]">
                Financial experts recommend saving 10-20% of your income for long-term goals. If that's not possible right now, start with what you can afford - even 5% is better than nothing - and increase it over time as your income grows.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Should I save or invest to reach my goal?
              </h3>
              <p className="text-[--color-slate-700]">
                For goals less than 5 years away, use a savings account to avoid market volatility. For longer-term goals (5+ years), consider investing in index funds or target-date funds for potentially higher returns, though with more risk.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                What if I can't afford the required monthly savings?
              </h3>
              <p className="text-[--color-slate-700]">
                Consider extending your timeframe, reducing your goal amount, or finding ways to increase your income through a side hustle or asking for a raise. It's better to adjust your plan than to set yourself up for failure with an unrealistic target.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                How do I stay motivated to save?
              </h3>
              <p className="text-[--color-slate-700]">
                Track your progress visually (like with a chart or app), celebrate milestones (25%, 50%, 75% of your goal), and remind yourself why this goal matters to you. Having a specific, meaningful goal makes it easier to say no to impulse purchases.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Where should I keep my savings?
              </h3>
              <p className="text-[--color-slate-700]">
                For short-term goals (under 1 year), use a high-yield savings account. For medium-term goals (1-5 years), consider a high-yield savings account or short-term CDs. For long-term goals (5+ years), consider investment accounts like index funds.
              </p>
            </div>
          </div>
        </section>
      </div>

      <RelatedCalculators calculators={relatedCalculators} />
    </CalculatorLayout>
  );
}
