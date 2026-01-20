'use client';

import Link from 'next/link';
import { useState } from 'react';
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
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
    }
  };

  const handleReset = () => {
    setLoanAmount(300000);
    setInterestRate(6.5);
    setLoanTerm(30);
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
          <h1 className="text-4xl font-bold mb-4">Biweekly Mortgage Payment Calculator</h1>
          <p className="text-lg text-gray-600">Calculate how much you'll save with biweekly mortgage payments. See the interest savings and time saved.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Form */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">Enter Loan Details</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={loanAmount || ''}
                    onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                    placeholder="300000"
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
                <label className="block text-sm font-semibold mb-2">Loan Term</label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                >
                  <option value={15}>15 years</option>
                  <option value={20}>20 years</option>
                  <option value={30}>30 years</option>
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
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Savings</div>
                  <div className="text-6xl font-bold font-mono text-green-600 mb-2">{formatCurrency(result.interestSaved)}</div>
                  <div className="text-xs text-gray-500">
                    Pay off {result.timeSavedYears} years {result.timeSavedMonths % 12} months earlier
                  </div>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Monthly Payment */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Monthly</div>
                    <div className="text-2xl font-bold font-mono mb-1">{formatCurrency(result.monthlyPayment)}</div>
                    <div className="text-xs text-gray-500 mb-3">Payment</div>
                    <div className="text-sm text-gray-600">
                      {Math.floor(result.monthlyPayoffMonths / 12)}yr {result.monthlyPayoffMonths % 12}mo
                    </div>
                  </div>

                  {/* Biweekly Payment */}
                  <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2">Biweekly ⭐</div>
                    <div className="text-2xl font-bold font-mono mb-1 text-blue-600">{formatCurrency(result.biweeklyPayment)}</div>
                    <div className="text-xs text-gray-500 mb-3">Payment</div>
                    <div className="text-sm text-gray-600">
                      {Math.floor(result.biweeklyPayoffMonths / 12)}yr {result.biweeklyPayoffMonths % 12}mo
                    </div>
                  </div>
                </div>

                {/* Interest Comparison */}
                <div className="space-y-3">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Monthly Total Interest</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.monthlyTotalInterest)}</div>
                  </div>
                  
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Biweekly Total Interest</div>
                    <div className="text-2xl font-bold font-mono text-green-600">{formatCurrency(result.biweeklyTotalInterest)}</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Enter your loan details and click Calculate Savings to see your results</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">How to Use This Calculator</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Step 1: Enter Your Loan Amount and Interest Rate</h3>
            <p className="text-gray-700 mb-4">Enter your current mortgage balance or the loan amount if you're planning a new mortgage. Then add your interest rate.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 2: Select Your Loan Term</h3>
            <p className="text-gray-700 mb-4">Choose your loan term - typically 15 or 30 years. If you already have a mortgage, use the remaining term.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 3: Compare Monthly vs Biweekly Payments</h3>
            <p className="text-gray-700 mb-4">Review the side-by-side comparison to see exactly how much you'll save in interest and how much sooner you'll pay off your mortgage with biweekly payments.</p>
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
