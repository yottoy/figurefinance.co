'use client';

import Link from 'next/link';
import { useState } from 'react';
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
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
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
          <h1 className="text-4xl font-bold mb-4">Early Mortgage Payoff Calculator</h1>
          <p className="text-lg text-gray-600">Calculate how much you can save by making extra mortgage payments. See your new payoff date and interest savings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Form */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">Enter Mortgage Details</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Current Loan Balance</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={currentBalance || ''}
                    onChange={(e) => setCurrentBalance(parseFloat(e.target.value) || 0)}
                    placeholder="250000"
                    className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Interest Rate</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate || ''}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                    placeholder="6.5"
                    className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Remaining Years</label>
                <div className="relative">
                  <input
                    type="number"
                    value={remainingYears || ''}
                    onChange={(e) => setRemainingYears(parseFloat(e.target.value) || 0)}
                    placeholder="25"
                    className="w-full h-12 pl-4 pr-16 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">years</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">How many years are left on your mortgage</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Extra Payment Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={extraPayment || ''}
                    onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
                    placeholder="300"
                    className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Extra Payment Frequency</label>
                <select
                  value={extraPaymentType}
                  onChange={(e) => setExtraPaymentType(e.target.value as 'monthly' | 'yearly' | 'one-time')}
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Once per year</option>
                  <option value="one-time">One-time payment</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleCalculate}
                  className="flex-1 h-12 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700"
                >
                  Calculate Savings
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
                <h2 className="text-xl font-semibold mb-6">Your Savings</h2>
                
                {/* Primary Result */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Interest Saved</div>
                  <div className="text-6xl font-bold font-mono text-green-600 mb-2">{formatCurrency(result.interestSaved)}</div>
                  <div className="text-xs text-gray-500">
                    Pay off {Math.floor(result.timeSavedMonths / 12)} years {result.timeSavedMonths % 12} months earlier
                  </div>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Original Payment</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.originalPayment)}</div>
                  </div>
                  
                  <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2">New Payment ⭐</div>
                    <div className="text-2xl font-bold font-mono text-blue-600">{formatCurrency(result.newPayment)}</div>
                  </div>
                </div>

                {/* Detailed Comparison */}
                <div className="space-y-3">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Original Payoff Date</div>
                    <div className="text-2xl font-bold font-mono">{formatMonthYear(result.originalPayoffDate)}</div>
                  </div>
                  
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">New Payoff Date</div>
                    <div className="text-2xl font-bold font-mono text-blue-600">{formatMonthYear(result.newPayoffDate)}</div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Original Total Interest</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.originalTotalInterest)}</div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">New Total Interest</div>
                    <div className="text-2xl font-bold font-mono text-green-600">{formatCurrency(result.newTotalInterest)}</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Enter your mortgage details and click Calculate Savings to see your results</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">How to Use This Calculator</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Step 1: Enter Your Current Mortgage Details</h3>
            <p className="text-gray-700 mb-4">Start by entering your current loan balance, interest rate, and the number of years remaining on your mortgage.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 2: Add Your Extra Payment Amount</h3>
            <p className="text-gray-700 mb-4">Enter how much extra you want to pay toward your mortgage principal. Even an additional $100-300 per month can save tens of thousands in interest.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 3: Choose Your Payment Frequency</h3>
            <p className="text-gray-700 mb-4">Select whether you'll make extra payments monthly, once per year, or as a one-time payment. Monthly extra payments have the biggest impact.</p>
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
