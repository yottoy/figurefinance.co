'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  calculateBalanceTransfer,
  BalanceTransferResult,
} from '@/lib/calculators/balanceTransfer';
import { formatCurrency } from '@/lib/utils/formatters';

export default function BalanceTransferCalculator() {
  const [currentBalance, setCurrentBalance] = useState<number>(8000);
  const [currentAPR, setCurrentAPR] = useState<number>(22.5);
  const [transferAPR, setTransferAPR] = useState<number>(0);
  const [transferFee, setTransferFee] = useState<number>(3);
  const [promoLength, setPromoLength] = useState<number>(18);
  const [postPromoAPR, setPostPromoAPR] = useState<number>(19.99);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(300);
  const [result, setResult] = useState<BalanceTransferResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    try {
      setError('');

      if (currentBalance <= 0) {
        setError('Current balance must be greater than $0');
        return;
      }
      if (currentAPR < 0 || currentAPR > 100) {
        setError('Current APR must be between 0% and 100%');
        return;
      }
      if (transferAPR < 0 || transferAPR > 100) {
        setError('Transfer APR must be between 0% and 100%');
        return;
      }
      if (transferFee < 0 || transferFee > 100) {
        setError('Transfer fee must be between 0% and 100%');
        return;
      }
      if (promoLength <= 0) {
        setError('Promotional period must be greater than 0 months');
        return;
      }
      if (postPromoAPR < 0 || postPromoAPR > 100) {
        setError('Post-promo APR must be between 0% and 100%');
        return;
      }
      if (monthlyPayment <= 0) {
        setError('Monthly payment must be greater than $0');
        return;
      }

      const calculatedResult = calculateBalanceTransfer({
        currentBalance,
        currentAPR,
        transferAPR,
        transferFee,
        promoLength,
        postPromoAPR,
        monthlyPayment,
      });
      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
    }
  };

  const handleReset = () => {
    setCurrentBalance(8000);
    setCurrentAPR(22.5);
    setTransferAPR(0);
    setTransferFee(3);
    setPromoLength(18);
    setPostPromoAPR(19.99);
    setMonthlyPayment(300);
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
          <h1 className="text-4xl font-bold mb-4">Balance Transfer Calculator</h1>
          <p className="text-lg text-gray-600">Compare balance transfer offers and calculate your savings. Factors in transfer fees and promotional periods.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Form */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">Compare Balance Transfer</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Current Card</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Current Balance</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={currentBalance || ''}
                        onChange={(e) => setCurrentBalance(parseFloat(e.target.value) || 0)}
                        placeholder="8000"
                        className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Current APR</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={currentAPR || ''}
                        onChange={(e) => setCurrentAPR(parseFloat(e.target.value) || 0)}
                        placeholder="22.5"
                        className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Transfer Card Offer</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Promotional APR</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={transferAPR || ''}
                        onChange={(e) => setTransferAPR(parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Often 0% for balance transfers</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Transfer Fee</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={transferFee || ''}
                        onChange={(e) => setTransferFee(parseFloat(e.target.value) || 0)}
                        placeholder="3"
                        className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Typically 3-5% of transfer amount</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Promotional Period</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={promoLength || ''}
                        onChange={(e) => setPromoLength(parseFloat(e.target.value) || 0)}
                        placeholder="18"
                        className="w-full h-12 pl-4 pr-16 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">months</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">APR After Promo</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={postPromoAPR || ''}
                        onChange={(e) => setPostPromoAPR(parseFloat(e.target.value) || 0)}
                        placeholder="19.99"
                        className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Monthly Payment</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={monthlyPayment || ''}
                    onChange={(e) => setMonthlyPayment(parseFloat(e.target.value) || 0)}
                    placeholder="300"
                    className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">How much you plan to pay each month</p>
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
                <h2 className="text-xl font-semibold mb-6">Your Savings Analysis</h2>
                
                {/* Primary Result */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center mb-6">
                  {result.isWorthIt ? (
                    <>
                      <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded mb-4">
                        RECOMMENDED
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Savings</div>
                      <div className="text-6xl font-bold font-mono text-green-600 mb-2">{formatCurrency(result.totalSavings)}</div>
                      <div className="text-xs text-gray-500">This balance transfer will save you money!</div>
                    </>
                  ) : (
                    <>
                      <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded mb-4">
                        NOT RECOMMENDED
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Additional Cost</div>
                      <div className="text-6xl font-bold font-mono text-red-600 mb-2">{formatCurrency(Math.abs(result.totalSavings))}</div>
                      <div className="text-xs text-gray-500">You'll pay more with this balance transfer</div>
                    </>
                  )}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-4">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Transfer Fee</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.transferFeeAmount)}</div>
                  </div>
                  
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Interest on Current Card</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.currentInterest)}</div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Interest on Transfer Card</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.transferInterest)}</div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Payoff Timeline</div>
                    <div className="text-2xl font-bold font-mono">{result.payoffMonths} months</div>
                  </div>

                  {!result.willPayoffDuringPromo && (
                    <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-lg text-sm text-gray-700">
                      ⚠️ You won't pay off the balance during the promotional period. Remaining balance: {formatCurrency(result.postPromoBalance)}
                    </div>
                  )}
                  {result.willPayoffDuringPromo && (
                    <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg text-sm text-gray-700">
                      ✓ You'll pay off the balance during the promotional period!
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Enter your card details and click Calculate Savings to see your analysis</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">How to Use This Calculator</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Step 1: Enter Your Current Card Details</h3>
            <p className="text-gray-700 mb-4">Start with your current credit card balance and APR. You can find these on your monthly statement or by logging into your credit card account online.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 2: Add the Transfer Card Offer Details</h3>
            <p className="text-gray-700 mb-4">Enter the promotional APR (often 0%), transfer fee (typically 3-5%), promotional period length, and the APR that applies after the promotion ends.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 3: Enter Your Monthly Payment</h3>
            <p className="text-gray-700 mb-4">Input how much you plan to pay each month. The calculator will determine if you'll pay off the balance during the promotional period and calculate your total savings.</p>
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
