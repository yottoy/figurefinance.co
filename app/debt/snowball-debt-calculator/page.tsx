'use client';

import Link from 'next/link';
import { useState } from 'react';
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
          <h1 className="text-4xl font-bold mb-4">Snowball Debt Calculator</h1>
          <p className="text-lg text-gray-600">Calculate your consulting rate based on your desired annual income, billable hours, and business expenses.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Form */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">Enter Your Debts</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {debts.map((debt, index) => (
                <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">Debt {index + 1}</h3>
                    {debts.length > 1 && (
                      <button
                        onClick={() => removeDebt(index)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Debt Name</label>
                      <input
                        type="text"
                        value={debt.name}
                        onChange={(e) => updateDebt(index, 'name', e.target.value)}
                        placeholder="e.g., Credit Card 1"
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Current Balance</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={debt.balance || ''}
                          onChange={(e) => updateDebt(index, 'balance', parseFloat(e.target.value) || 0)}
                          placeholder="5000"
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
                          value={debt.interestRate || ''}
                          onChange={(e) => updateDebt(index, 'interestRate', parseFloat(e.target.value) || 0)}
                          placeholder="18.5"
                          className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Minimum Monthly Payment</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={debt.minimumPayment || ''}
                          onChange={(e) => updateDebt(index, 'minimumPayment', parseFloat(e.target.value) || 0)}
                          placeholder="125"
                          className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                onClick={addDebt}
                className="w-full h-12 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-gray-900"
              >
                + Add Another Debt
              </button>

              <div className="pt-4 border-t-2 border-gray-200">
                <label className="block text-sm font-semibold mb-2">Extra Monthly Payment</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={extraPayment || ''}
                    onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
                    placeholder="200"
                    className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Additional amount you can pay each month beyond minimums</p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleCalculate}
                  className="flex-1 h-12 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700"
                >
                  Calculate Payoff
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
                <h2 className="text-xl font-semibold mb-6">Your Debt-Free Plan</h2>
                
                {/* Primary Result */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Debt-Free Date</div>
                  <div className="text-6xl font-bold font-mono mb-2">{formatMonthYear(result.payoffDate)}</div>
                  <div className="text-xs text-gray-500">{result.monthsToPayoff} months from now</div>
                </div>

                {/* Secondary Results */}
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Debt</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.totalDebt)}</div>
                  </div>
                  
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Interest Paid</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.totalInterestPaid)}</div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Amount Paid</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.totalPaid)}</div>
                  </div>
                </div>

                {/* Payoff Order */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Payoff Order</h3>
                  <div className="space-y-3">
                    {result.debtOrder.map((debt, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold text-gray-900">
                            {index + 1}. {debt.debtName}
                          </div>
                          <div className="text-sm text-gray-600">
                            Month {debt.payoffMonth}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          Balance: {formatCurrency(debt.originalBalance)} • Interest: {formatCurrency(debt.totalInterest)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Enter your debts and click Calculate Payoff to see your debt-free plan</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">How to Use This Calculator</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Step 1: Enter Each Debt</h3>
            <p className="text-gray-700 mb-4">Add all your debts including credit cards, personal loans, medical bills, and any other debts you want to pay off. For each debt, enter the current balance, interest rate, and minimum monthly payment.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 2: Add Your Extra Payment</h3>
            <p className="text-gray-700 mb-4">Enter the additional amount you can afford to pay each month beyond your minimum payments. This extra payment accelerates your debt payoff timeline.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 3: Review Your Debt-Free Plan</h3>
            <p className="text-gray-700 mb-4">See your debt-free date, total interest savings, and the order in which your debts will be paid off. The calculator automatically orders your debts from smallest to largest balance.</p>
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
