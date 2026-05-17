'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  calculateConsolidation,
  ConsolidationDebt,
  ConsolidationResult,
} from '@/lib/calculators/debtConsolidation';
import { formatCurrency } from '@/lib/utils/formatters';

const defaultDebts: ConsolidationDebt[] = [
  { name: 'Credit Card 1', balance: 5000, interestRate: 22, minimumPayment: 125 },
  { name: 'Auto Loan', balance: 12000, interestRate: 8.5, minimumPayment: 280 },
];

export default function DebtConsolidationCalculator() {
  const [debts, setDebts] = useState<ConsolidationDebt[]>(defaultDebts);
  const [newLoanRate, setNewLoanRate] = useState<number>(12);
  const [newLoanTerm, setNewLoanTerm] = useState<number>(60);
  const [result, setResult] = useState<ConsolidationResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleDebtChange = (index: number, field: keyof ConsolidationDebt, value: string | number) => {
    setDebts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddDebt = () => {
    setDebts((prev) => [
      ...prev,
      { name: `Debt ${prev.length + 1}`, balance: 0, interestRate: 0, minimumPayment: 0 },
    ]);
  };

  const handleRemoveDebt = (index: number) => {
    setDebts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCalculate = () => {
    try {
      setError('');

      if (debts.length === 0) {
        setError('Please add at least one debt.');
        return;
      }

      for (let i = 0; i < debts.length; i++) {
        const d = debts[i];
        if (d.balance <= 0) {
          setError(`Debt "${d.name || i + 1}": balance must be greater than $0.`);
          return;
        }
        if (d.interestRate < 0 || d.interestRate > 100) {
          setError(`Debt "${d.name || i + 1}": interest rate must be between 0% and 100%.`);
          return;
        }
        if (d.minimumPayment <= 0) {
          setError(`Debt "${d.name || i + 1}": minimum payment must be greater than $0.`);
          return;
        }
        const monthlyRate = d.interestRate / 100 / 12;
        const interestFirstMonth = d.balance * monthlyRate;
        if (d.minimumPayment <= interestFirstMonth) {
          setError(`Debt "${d.name || i + 1}": minimum payment is too low to cover interest. Please increase it.`);
          return;
        }
      }

      if (newLoanRate < 0 || newLoanRate > 100) {
        setError('New loan APR must be between 0% and 100%.');
        return;
      }
      if (newLoanTerm <= 0) {
        setError('Loan term must be greater than 0 months.');
        return;
      }

      const calculatedResult = calculateConsolidation({ debts, newLoanRate, newLoanTerm });
      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
    }
  };

  const handleReset = () => {
    setDebts(defaultDebts);
    setNewLoanRate(12);
    setNewLoanTerm(60);
    setResult(null);
    setError('');
  };

  const jsonLdWebApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Debt Consolidation Calculator',
    url: 'https://figurefinance.co/debt/debt-consolidation-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const jsonLdBreadcrumb = {
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
        name: 'Debt Calculators',
        item: 'https://figurefinance.co/debt',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Debt Consolidation Calculator',
        item: 'https://figurefinance.co/debt/debt-consolidation-calculator',
      },
    ],
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is debt consolidation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Debt consolidation means combining multiple debts — such as credit cards, personal loans, or medical bills — into a single new loan, ideally at a lower interest rate. The goal is to simplify repayment and reduce the total interest you pay over time.',
        },
      },
      {
        '@type': 'Question',
        name: "What's a good interest rate for debt consolidation?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "A good consolidation rate is one that's lower than your current weighted average APR across all your debts. Borrowers with good credit can typically qualify for personal loans in the 8–15% range, compared to the 20%+ rates common on credit cards. The lower the rate, the more you save.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does debt consolidation hurt your credit score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In the short term, applying for a consolidation loan triggers a hard inquiry and adds a new account, which can temporarily lower your score by a few points. Long term, consolidation often helps your credit by reducing your credit utilization ratio and simplifying on-time payments.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of debt can be consolidated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most unsecured debts can be consolidated, including credit cards, personal loans, medical debt, and private student loans. Mortgages and auto loans are secured debts that typically require their own refinancing process rather than a general consolidation loan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is debt consolidation the same as a balance transfer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. A balance transfer moves credit card debt to a new card with a 0% promotional rate, while consolidation takes out a personal loan to pay off multiple debts. Balance transfers work best for credit card debt you can pay off within the promotional period. Consolidation works for larger amounts, mixed debt types, and longer repayment terms.',
        },
      },
      {
        '@type': 'Question',
        name: 'What credit score do I need for a debt consolidation loan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most lenders require a minimum credit score of 580 to 660 for a consolidation loan, though the best rates go to borrowers with scores above 700. The rate you receive directly determines whether consolidation saves you money, so compare offers from multiple lenders before committing.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
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
          <h1 className="text-4xl font-bold mb-4">Debt Consolidation Calculator</h1>
          <p className="text-lg text-gray-600">Enter your current debts and a consolidation loan offer to see exactly how much you could save in interest.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Form */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">Your Debt Details</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Debt Rows */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Your Current Debts</h3>
                <div className="space-y-4">
                  {debts.map((debt, index) => (
                    <div key={index} className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">Debt {index + 1}</span>
                        {debts.length > 1 && (
                          <button
                            onClick={() => handleRemoveDebt(index)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-gray-600">Name</label>
                          <input
                            type="text"
                            value={debt.name}
                            onChange={(e) => handleDebtChange(index, 'name', e.target.value)}
                            placeholder="e.g. Credit Card 1"
                            className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none text-sm font-medium"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-gray-600">Balance</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                              <input
                                type="number"
                                value={debt.balance || ''}
                                onChange={(e) => handleDebtChange(index, 'balance', parseFloat(e.target.value) || 0)}
                                placeholder="5000"
                                className="w-full h-10 pl-6 pr-2 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none text-sm font-medium"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-gray-600">Rate</label>
                            <div className="relative">
                              <input
                                type="number"
                                step="0.1"
                                value={debt.interestRate || ''}
                                onChange={(e) => handleDebtChange(index, 'interestRate', parseFloat(e.target.value) || 0)}
                                placeholder="22"
                                className="w-full h-10 pl-3 pr-6 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none text-sm font-medium"
                              />
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">%</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-gray-600">Min. Payment</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                              <input
                                type="number"
                                value={debt.minimumPayment || ''}
                                onChange={(e) => handleDebtChange(index, 'minimumPayment', parseFloat(e.target.value) || 0)}
                                placeholder="125"
                                className="w-full h-10 pl-6 pr-2 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none text-sm font-medium"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handleAddDebt}
                    className="w-full h-10 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:border-gray-900 hover:text-gray-900"
                  >
                    + Add Another Debt
                  </button>
                </div>
              </div>

              {/* Consolidation Loan */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Consolidation Loan</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">New Loan APR</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={newLoanRate || ''}
                        onChange={(e) => setNewLoanRate(parseFloat(e.target.value) || 0)}
                        placeholder="12"
                        className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">The annual interest rate you&apos;ve been quoted</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Loan Term</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={newLoanTerm || ''}
                        onChange={(e) => setNewLoanTerm(parseFloat(e.target.value) || 0)}
                        placeholder="60"
                        className="w-full h-12 pl-4 pr-20 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">months</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Repayment period (e.g. 60 = 5 years)</p>
                  </div>
                </div>
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
                <h2 className="text-xl font-semibold mb-6">Your Consolidation Analysis</h2>

                {/* Primary Result */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center mb-6">
                  {result.worthConsolidating ? (
                    <>
                      <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded mb-4">
                        RECOMMENDED
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Interest Saved</div>
                      <div className="text-6xl font-bold font-mono text-green-600 mb-2">
                        {formatCurrency(result.interestSaved)}
                      </div>
                      <div className="text-xs text-gray-500">Consolidating your debts will save you money!</div>
                    </>
                  ) : (
                    <>
                      <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded mb-4">
                        NOT RECOMMENDED
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Additional Interest Cost</div>
                      <div className="text-6xl font-bold font-mono text-red-600 mb-2">
                        {formatCurrency(Math.abs(result.interestSaved))}
                      </div>
                      <div className="text-xs text-gray-500">You&apos;ll pay more interest with this consolidation loan</div>
                    </>
                  )}
                </div>

                {/* Breakdown Cards */}
                <div className="space-y-4">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Debt</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.totalDebt)}</div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Current Monthly Payment</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.currentMonthlyPayment)}</div>
                    <div className="text-xs text-gray-500 mt-1">Sum of all current minimum payments</div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">New Monthly Payment</div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(result.newMonthlyPayment)}</div>
                    <div className="text-xs text-gray-500 mt-1">Fixed payment on the consolidation loan</div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Current Payoff Time</div>
                    <div className="text-2xl font-bold font-mono">{result.currentPayoffMonths} months</div>
                    <div className="text-xs text-gray-500 mt-1">Paying current minimums across all debts</div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Interest Savings</div>
                    <div className={`text-2xl font-bold font-mono ${result.interestSaved >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.interestSaved >= 0 ? '+' : ''}{formatCurrency(result.interestSaved)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {result.interestSaved >= 0 ? 'Total interest saved vs. paying minimums' : 'Extra interest vs. paying minimums'}
                    </div>
                  </div>

                  {result.worthConsolidating ? (
                    <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg text-sm text-gray-700">
                      Consolidating at {newLoanRate}% over {newLoanTerm} months saves you money compared to paying current minimums.
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-lg text-sm text-gray-700">
                      Try a lower APR or a shorter term to make consolidation worthwhile.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Enter your debts and consolidation loan details, then click Calculate Savings to see your analysis</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">How to Use This Calculator</h2>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 1: Enter Your Current Debts</h3>
            <p className="text-gray-700 mb-4">Add each of your current debts with their balance, interest rate, and minimum payment. You can find these figures on your monthly statements or by logging into each account online. Add as many debts as you have — use the &quot;Add Another Debt&quot; button to include more rows.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 2: Enter the Consolidation Loan Offer</h3>
            <p className="text-gray-700 mb-4">Input the APR you&apos;ve been quoted for a personal consolidation loan and the repayment term in months. A 60-month (5-year) term is common, but shorter terms mean less interest paid overall even if the monthly payment is higher.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 3: See Your Savings Instantly</h3>
            <p className="text-gray-700 mb-4">The calculator compares the total interest you&apos;d pay staying on your current debts at minimum payments versus rolling everything into the new loan. You&apos;ll see immediately whether consolidation saves you money and by exactly how much.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Understanding Debt Consolidation</h2>

            <h3 className="text-xl font-semibold mb-3 mt-8">How Debt Consolidation Works</h3>
            <p className="text-gray-700 mb-4">Debt consolidation replaces multiple monthly payments with a single, fixed-rate loan. You take out one personal loan large enough to pay off all your existing debts, then make a single monthly payment to the new lender. The goal is twofold: a lower interest rate that reduces total costs, and one predictable payment that simplifies budgeting. Consolidation works best when your combined debts carry high variable rates, typically credit cards at 20% or more, and you can qualify for a personal loan at a significantly lower rate.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">When Consolidation Makes Sense vs. Other Strategies</h3>
            <p className="text-gray-700 mb-4">Consolidation is strongest when you have multiple high-rate debts and can lock in a meaningfully lower rate. If your debt is primarily on one or two credit cards, a <Link href="/debt/balance-transfer-calculator" className="text-blue-600 hover:text-blue-800 underline">balance transfer to a 0% promotional card</Link> may save even more, since you pay no interest during the promotional window. If your debts have varied rates and you are disciplined about extra payments, the <Link href="/debt/debt-avalanche-calculator" className="text-blue-600 hover:text-blue-800 underline">debt avalanche method</Link> can achieve similar savings without the origination fee a consolidation loan charges. The right choice depends on your credit score, the number of debts you carry, and how much simplification you need.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Hidden Costs to Watch For</h3>
            <p className="text-gray-700 mb-4">Consolidation loans often carry origination fees of 1% to 8% of the loan amount, which are deducted from your disbursement or added to the balance. A longer repayment term can also offset rate savings: stretching a $15,000 balance from 3 years to 5 years lowers your monthly payment but may increase total interest even at a lower rate. Always compare the total cost of the consolidation loan, including fees and full-term interest, against what you would pay on your current debts. This calculator does that comparison automatically.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

            <h3 className="text-xl font-semibold mb-3 mt-8">What is debt consolidation?</h3>
            <p className="text-gray-700 mb-4">Debt consolidation means combining multiple debts — such as credit cards, personal loans, or medical bills — into a single new loan, ideally at a lower interest rate. The goal is to simplify repayment into one fixed monthly payment and reduce the total interest you pay over time.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">What&apos;s a good interest rate for debt consolidation?</h3>
            <p className="text-gray-700 mb-4">A good consolidation rate is one that is lower than your current weighted average APR across all your debts. Borrowers with good credit can typically qualify for personal loans in the 8–15% range, compared to the 20%+ rates that are common on credit cards. The lower the rate relative to your existing debts, the more you stand to save.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Does debt consolidation hurt your credit score?</h3>
            <p className="text-gray-700 mb-4">In the short term, applying for a consolidation loan triggers a hard inquiry and adds a new account to your credit file, which can temporarily lower your score by a few points. Long term, consolidation often improves your credit profile by reducing your credit utilization ratio on revolving accounts and giving you a single on-time payment to manage each month.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">What types of debt can be consolidated?</h3>
            <p className="text-gray-700 mb-4">Most unsecured debts can be consolidated into a personal loan, including credit cards, personal loans, medical debt, and private student loans. Mortgages and auto loans are secured by collateral and typically require their own refinancing process rather than a general consolidation loan.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Is debt consolidation the same as a balance transfer?</h3>
            <p className="text-gray-700 mb-4">No. A balance transfer moves credit card debt to a new card with a 0% promotional rate, while consolidation takes out a personal loan to pay off multiple debts. Balance transfers work best for credit card debt you can pay off within the promotional period (typically 12 to 21 months). Consolidation works for larger amounts, mixed debt types, and longer repayment terms. Use our <Link href="/debt/balance-transfer-calculator" className="text-blue-600 hover:text-blue-800 underline">balance transfer calculator</Link> to compare the two approaches side by side.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">What credit score do I need for a debt consolidation loan?</h3>
            <p className="text-gray-700 mb-4">Most lenders require a minimum credit score of 580 to 660 for a consolidation loan, though the best rates go to borrowers with scores above 700. If your score is below 580, you may still qualify through a credit union or an online lender that considers alternative factors. Keep in mind that the rate you receive directly determines whether consolidation saves you money, so compare offers from multiple lenders before committing.</p>
          </section>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
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
