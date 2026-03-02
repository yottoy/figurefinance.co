'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  calculateDownPayment,
  DownPaymentResult,
} from '@/lib/calculators/downPayment';
import { formatCurrency } from '@/lib/utils/formatters';

export default function DownPaymentCalculator() {
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [currentSavings, setCurrentSavings] = useState<number>(15000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1500);
  const [annualReturn, setAnnualReturn] = useState<number>(4.5);
  const [result, setResult] = useState<DownPaymentResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    try {
      setError('');

      if (homePrice <= 0) {
        setError('Home price must be greater than $0');
        return;
      }
      if (downPaymentPercent < 3 || downPaymentPercent > 100) {
        setError('Down payment percentage must be between 3% and 100%');
        return;
      }
      if (currentSavings < 0) {
        setError('Current savings cannot be negative');
        return;
      }
      if (monthlyContribution < 0) {
        setError('Monthly contribution cannot be negative');
        return;
      }
      if (annualReturn < 0 || annualReturn > 100) {
        setError('Annual return must be between 0% and 100%');
        return;
      }

      const calculatedResult = calculateDownPayment({
        homePrice,
        downPaymentPercent,
        currentSavings,
        monthlyContribution,
        annualReturn,
      });
      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
    }
  };

  const handleReset = () => {
    setHomePrice(400000);
    setDownPaymentPercent(20);
    setCurrentSavings(15000);
    setMonthlyContribution(1500);
    setAnnualReturn(4.5);
    setResult(null);
    setError('');
  };

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Down Payment Calculator',
    url: 'https://figurefinance.co/savings/down-payment-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://figurefinance.co',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Savings Calculators',
        item: 'https://figurefinance.co/savings',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Down Payment Calculator',
        item: 'https://figurefinance.co/savings/down-payment-calculator',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much should I save for a down payment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The minimum down payment depends on the loan type. Conventional loans require as little as 3%, while FHA loans require 3.5%. However, putting down 20% avoids Private Mortgage Insurance (PMI), which can add hundreds of dollars to your monthly payment. On a $400,000 home, a 20% down payment equals $80,000.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is PMI and how do I avoid it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Private Mortgage Insurance (PMI) is required by lenders when your down payment is less than 20% of the home's purchase price. It typically costs between 0.5% and 1.5% of the loan amount annually. You can avoid PMI by making a 20% down payment, choosing a VA or USDA loan if you qualify, or using a piggyback loan structure.",
        },
      },
      {
        '@type': 'Question',
        name: 'How can I save for a down payment faster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To accelerate your down payment savings: open a high-yield savings account to earn more interest, cut discretionary spending and redirect those funds, automate monthly transfers so saving happens before you can spend, consider a side income or freelance work, and look into down payment assistance programs offered by state and local governments.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use gift money for a down payment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, most mortgage loan programs allow gift funds from family members to be used toward a down payment. Lenders typically require a gift letter from the donor stating the amount given, the relationship to the borrower, and that the funds are a gift and do not need to be repaid. Requirements vary by loan type, so check with your lender for specifics.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
          <h1 className="text-4xl font-bold mb-4">Down Payment Calculator</h1>
          <p className="text-lg text-gray-600">Find out how long it will take to save for a down payment on your dream home. Enter your target price, current savings, and monthly contribution to get a clear savings timeline.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Form */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">Your Down Payment Goal</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Target Home Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={homePrice || ''}
                    onChange={(e) => setHomePrice(parseFloat(e.target.value) || 0)}
                    placeholder="400000"
                    className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">The purchase price of the home you want to buy</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Down Payment Percentage</label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="3"
                    max="100"
                    value={downPaymentPercent || ''}
                    onChange={(e) => setDownPaymentPercent(parseFloat(e.target.value) || 0)}
                    placeholder="20"
                    className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">20% avoids PMI; FHA requires 3.5%</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Current Down Payment Savings</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={currentSavings || ''}
                    onChange={(e) => setCurrentSavings(parseFloat(e.target.value) || 0)}
                    placeholder="15000"
                    className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">How much you&apos;ve already saved toward a down payment</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Monthly Savings Contribution</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={monthlyContribution || ''}
                    onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
                    placeholder="1500"
                    className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">How much you can save each month toward the down payment</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Expected Annual Return</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={annualReturn || ''}
                    onChange={(e) => setAnnualReturn(parseFloat(e.target.value) || 0)}
                    placeholder="4.5"
                    className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Use 4-5% for high-yield savings, 0% for regular savings</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCalculate}
                  className="flex-1 h-12 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700"
                >
                  Calculate Timeline
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
                <h2 className="text-xl font-semibold mb-6">Your Savings Timeline</h2>

                {result.isAlreadyMet ? (
                  <div className="p-6 bg-green-50 border-2 border-green-500 rounded-lg text-center">
                    <div className="text-green-700 text-xl font-bold mb-2">You&apos;ve already reached your goal!</div>
                    <div className="text-green-600 text-sm">Your current savings of {formatCurrency(currentSavings)} meets or exceeds your {downPaymentPercent}% down payment target of {formatCurrency(result.targetDownPayment)}.</div>
                  </div>
                ) : (
                  <>
                    {/* Hero Result */}
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center mb-6">
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Time to Goal</div>
                      <div className="text-6xl font-bold font-mono text-blue-600 mb-2">{result.yearsToGoal}</div>
                      <div className="text-xs text-gray-500">years ({result.monthsToGoal} months)</div>
                    </div>

                    {/* Breakdown Cards */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Target Down Payment</div>
                        <div className="text-2xl font-bold font-mono">{formatCurrency(result.targetDownPayment)}</div>
                      </div>

                      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Remaining to Save</div>
                        <div className="text-2xl font-bold font-mono">{formatCurrency(result.remainingToSave)}</div>
                      </div>

                      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Contributions</div>
                        <div className="text-2xl font-bold font-mono">{formatCurrency(result.totalContributions)}</div>
                      </div>

                      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Interest Earned</div>
                        <div className="text-2xl font-bold font-mono text-green-600">{formatCurrency(result.interestEarned)}</div>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Enter your home price and savings details, then click Calculate Timeline to see your results</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">How to Use This Calculator</h2>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 1: Enter Your Home Price and Down Payment Target</h3>
            <p className="text-gray-700 mb-4">Enter the price of the home you want to buy and your target down payment percentage. A 20% down payment avoids PMI, while FHA loans allow as little as 3.5% down.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 2: Enter Your Current Savings and Monthly Contribution</h3>
            <p className="text-gray-700 mb-4">Enter how much you&apos;ve already saved toward the down payment and how much you can contribute each month. If you&apos;re just starting out, enter $0 for current savings.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 3: See Your Timeline and Interest Earnings</h3>
            <p className="text-gray-700 mb-4">The calculator shows exactly how many years and months it will take to reach your goal, along with how much interest your savings will earn along the way — a powerful motivator to keep going.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

            <h3 className="text-xl font-semibold mb-3 mt-8">How much should I save for a down payment?</h3>
            <p className="text-gray-700 mb-4">The minimum down payment depends on your loan type. Conventional loans require as little as 3%, while FHA loans require 3.5%. However, putting down 20% avoids Private Mortgage Insurance (PMI), which can add meaningfully to your monthly costs. On a $400,000 home, a 20% down payment equals $80,000. The right target depends on your financial situation, timeline, and the loan programs available to you.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">What is PMI and how do I avoid it?</h3>
            <p className="text-gray-700 mb-4">Private Mortgage Insurance (PMI) is required by lenders when your down payment is less than 20% of the home&apos;s purchase price. It typically costs between 0.5% and 1.5% of the loan amount per year, adding hundreds of dollars to your monthly payment. You can avoid PMI by making a 20% down payment, choosing a VA or USDA loan if you qualify, or using a piggyback loan structure where a second loan covers part of the down payment.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">How can I save for a down payment faster?</h3>
            <p className="text-gray-700 mb-4">To accelerate your down payment savings: open a high-yield savings account to earn more interest on your balance, cut discretionary spending and redirect those funds to your down payment account, automate monthly transfers so saving happens before you can spend, consider a side income or freelance work to boost your monthly contribution, and look into down payment assistance programs offered by state and local housing agencies that may provide grants or low-interest loans.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Can I use gift money for a down payment?</h3>
            <p className="text-gray-700 mb-4">Yes, most mortgage loan programs allow gift funds from family members to be used toward a down payment. Lenders typically require a gift letter from the donor stating the amount given, the relationship to the borrower, and confirmation that the funds are a gift and do not need to be repaid. Some loan programs have restrictions on gift fund usage, so always check with your lender to understand the specific requirements for your loan type.</p>
          </section>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
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
                <li><Link href="/debt/debt-avalanche-calculator" className="text-sm text-gray-400 hover:text-white">Debt Avalanche Calculator</Link></li>
                <li><Link href="/debt/debt-consolidation-calculator" className="text-sm text-gray-400 hover:text-white">Debt Consolidation Calculator</Link></li>
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
                <li><Link href="/savings/down-payment-calculator" className="text-sm text-gray-400 hover:text-white">Down Payment Calculator</Link></li>
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
