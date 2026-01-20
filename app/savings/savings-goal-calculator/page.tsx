'use client';

import Link from 'next/link';
import { useState } from 'react';
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
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
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

  return (
    <>
      <header className="border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold">FigureFinance</Link>
          <div className="flex gap-8">
            <Link href="/debt" className="text-sm font-medium text-gray-600 hover:text-gray-900">Debt</Link>
            <Link href="/mortgage" className="text-sm font-medium text-gray-600 hover:text-gray-900">Mortgage</Link>
            <Link href="/savings" className="text-sm font-medium text-gray-600 hover:text-gray-900">Savings</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Savings Goal Calculator</h1>
          <p className="text-lg text-gray-600">Calculate how much to save each month to reach your financial goal. Accounts for your current savings and expected interest.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Form */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">Set Your Savings Goal</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Savings Goal</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={goalAmount || ''}
                    onChange={(e) => setGoalAmount(parseFloat(e.target.value) || 0)}
                    placeholder="50000"
                    className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">How much do you want to save?</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Current Savings</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={currentSavings || ''}
                    onChange={(e) => setCurrentSavings(parseFloat(e.target.value) || 0)}
                    placeholder="5000"
                    className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">How much have you saved so far?</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Timeframe</label>
                <div className="relative">
                  <input
                    type="number"
                    value={timeframe || ''}
                    onChange={(e) => setTimeframe(parseFloat(e.target.value) || 0)}
                    placeholder="36"
                    className="w-full h-12 pl-4 pr-16 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">months</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">How many months until you need this money?</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Expected Interest Rate</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate || ''}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                    placeholder="4.5"
                    className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Annual return rate (e.g., savings account, investment)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Contribution Frequency</label>
                <select
                  value={contributionFrequency}
                  onChange={(e) =>
                    setContributionFrequency(e.target.value as 'monthly' | 'biweekly' | 'weekly')
                  }
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                >
                  <option value="monthly">Monthly</option>
                  <option value="biweekly">Every 2 weeks</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleCalculate}
                  className="flex-1 h-12 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700"
                >
                  Calculate Plan
                </button>
                <button 
                  onClick={handleReset}
                  className="h-12 px-6 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-gray-900"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 lg:sticky lg:top-20 h-fit">
            {result ? (
              <>
                <h2 className="text-xl font-semibold mb-6">Your Savings Plan</h2>
                
                {/* Primary Result */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Save This Amount</div>
                  <div className="text-6xl font-bold font-mono text-blue-600 mb-2">{formatCurrency(result.requiredContribution)}</div>
                  <div className="text-xs text-gray-500">{getFrequencyLabel()}</div>
                </div>

                {/* Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Starting Balance</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(currentSavings)}</div>
                  </div>
                  
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Contributions</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.totalContributions)}</div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Interest Earned</div>
                    <div className="text-2xl font-bold font-mono text-green-600">{formatCurrency(result.totalInterest)}</div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2">Final Amount</div>
                    <div className="text-2xl font-bold font-mono text-blue-600">{formatCurrency(result.finalAmount)}</div>
                  </div>
                </div>

                {/* Progress Milestones */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Milestones</h3>
                  <div className="space-y-3">
                    {result.milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-bold">{milestone.percentage}%</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {formatCurrency(milestone.amount)}
                            </div>
                            <div className="text-sm text-gray-600">
                              Period {milestone.period}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Enter your savings goal and click Calculate Plan to see your results</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">How to Use This Calculator</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Step 1: Set Your Financial Goal</h3>
            <p className="text-gray-700 mb-4">Enter the total amount you want to save. This could be for a down payment on a house, an emergency fund, a vacation, or any other financial goal.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 2: Enter Your Starting Point</h3>
            <p className="text-gray-700 mb-4">Input how much you've already saved toward this goal. If you're starting from scratch, enter $0. Also specify your timeframe.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 3: Add Expected Returns</h3>
            <p className="text-gray-700 mb-4">Enter the interest rate or expected return on your savings. For a high-yield savings account, this might be 4-5%.</p>
          </section>
        </div>
      </main>

      <footer className="bg-[#1a1a1a] text-white mt-24">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-semibold mb-3">FigureFinance</h3>
              <p className="text-sm text-gray-400">Free financial calculators. Fast, accurate, no signup required.</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-4">Debt Calculators</h4>
              <ul className="space-y-2">
                <li><Link href="/debt/snowball-debt-calculator" className="text-sm text-gray-400 hover:text-white">Snowball Debt Calculator</Link></li>
                <li><Link href="/debt/balance-transfer-calculator" className="text-sm text-gray-400 hover:text-white">Balance Transfer Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-4">Mortgage Calculators</h4>
              <ul className="space-y-2">
                <li><Link href="/mortgage/biweekly-mortgage-payment-calculator" className="text-sm text-gray-400 hover:text-white">Biweekly Mortgage Calculator</Link></li>
                <li><Link href="/mortgage/early-mortgage-payoff-calculator" className="text-sm text-gray-400 hover:text-white">Early Payoff Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-4">Savings Calculators</h4>
              <ul className="space-y-2">
                <li><Link href="/savings/savings-goal-calculator" className="text-sm text-gray-400 hover:text-white">Savings Goal Calculator</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-sm text-gray-500">© 2026 FigureFinance. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/about" className="text-sm text-gray-500 hover:text-white">About</Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-white">Terms of Use</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
