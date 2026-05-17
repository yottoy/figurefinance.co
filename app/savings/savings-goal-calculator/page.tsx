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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://figurefinance.co"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Savings Calculators",
        "item": "https://figurefinance.co/savings"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Savings Goal Calculator",
        "item": "https://figurefinance.co/savings/savings-goal-calculator"
      }
    ]
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Savings Goal Calculator",
    "url": "https://figurefinance.co/savings/savings-goal-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Setting Effective Savings Goals</h2>

            <h3 className="text-xl font-semibold mb-3 mt-8">Why a Specific Target Matters</h3>
            <p className="text-gray-700 mb-4">Research consistently shows that people who set specific savings targets save significantly more than those who aim to &quot;save more.&quot; A defined number transforms saving from an abstract intention into a measurable objective. Instead of wondering whether you are on track, you can divide the target by your timeline and know exactly what is required each month. This calculator does that math for you and accounts for compound interest, so the monthly number is often lower than you might expect.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">How Contribution Frequency Affects Growth</h3>
            <p className="text-gray-700 mb-4">Contributing weekly or biweekly rather than monthly puts your money to work sooner, which means it earns more interest over time. On a $20,000 goal at 5% annual interest over 3 years, switching from monthly to biweekly contributions can save you roughly $50 to $100 in required contributions because the money compounds more frequently. The effect grows with larger goals and longer timelines. This calculator supports monthly, biweekly, and weekly frequencies so you can find the schedule that matches your pay cycle.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Savings Accounts vs. Investments for Your Goal</h3>
            <p className="text-gray-700 mb-4">For goals within 1 to 3 years, a high-yield savings account or money market account offers safety and liquidity while still earning 4% to 5% in the current rate environment. For goals 5 or more years away, a diversified index fund portfolio historically delivers higher returns, though with short-term volatility. The dividing line is your risk tolerance and flexibility: if you absolutely need the money by a specific date, prioritize safety. If your timeline is flexible, investing can reduce the monthly contribution you need. If your goal is a <Link href="/savings/down-payment-calculator" className="text-blue-600 hover:text-blue-800 underline">house down payment</Link>, our dedicated calculator factors in home prices and PMI thresholds.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

            <h3 className="text-xl font-semibold mb-3 mt-8">How much should I save each month?</h3>
            <p className="text-gray-700 mb-4">A widely recommended guideline is the 50/30/20 rule, which suggests putting 20% of your take-home income toward savings and debt repayment. If your monthly take-home pay is $4,000, that means aiming for $800 per month toward savings and financial goals. The right amount ultimately depends on your specific goals, timeline, and current expenses — use this calculator to work backwards from your goal to find the exact number you need.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">What is a good savings goal?</h3>
            <p className="text-gray-700 mb-4">Financial experts typically recommend building an emergency fund covering 3 to 6 months of living expenses as the first savings priority before working toward other goals. Once your emergency fund is in place, good next goals include saving for a home down payment, paying off high-interest debt, or funding a retirement account. Having a specific target — like "$15,000 for an emergency fund" — makes it far easier to stay motivated and measure your progress.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">How does compound interest help savings?</h3>
            <p className="text-gray-700 mb-4">Compound interest means that the interest you earn on your savings also earns interest in subsequent periods, creating a snowball effect that accelerates growth over time. For example, $10,000 earning 5% annually becomes roughly $16,300 after 10 years and nearly $26,500 after 20 years — without any additional contributions. The longer you leave money invested, the more powerful compounding becomes, which is why starting early matters so much.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Where should I put my savings?</h3>
            <p className="text-gray-700 mb-4">For short-term goals (money you&apos;ll need within 1 to 3 years), a high-yield savings account or money market account is ideal — offering safety, liquidity, and competitive interest rates. For long-term goals like retirement or a down payment 10+ years away, broad market index funds offer significantly higher expected returns despite short-term volatility. Match the account type to your time horizon: the longer you can leave money untouched, the more risk (and potential return) you can afford to take on.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">How do I stay on track with my savings goal?</h3>
            <p className="text-gray-700 mb-4">Automate your contributions so the transfer happens on payday before you can spend the money. Set up a dedicated savings account separate from your checking account to reduce the temptation to dip into it. Revisit this calculator monthly to track your progress and adjust your contribution if your income or timeline changes. Small, consistent contributions compound into significant results over time.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Should I pay off debt or save first?</h3>
            <p className="text-gray-700 mb-4">If you carry high-interest debt above 10% to 15% APR, paying that off first typically provides a better return than saving, since the interest cost exceeds what most savings accounts earn. However, building a small emergency fund of $1,000 to $2,000 first prevents you from going deeper into debt when unexpected expenses arise. Once your high-rate debt is managed, shift focus to your savings goals.</p>
          </section>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How much should I save each month?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A widely recommended guideline is the 50/30/20 rule, which suggests putting 20% of your take-home income toward savings and debt repayment. If your monthly take-home pay is $4,000, that means aiming for $800 per month toward savings and financial goals. The right amount ultimately depends on your specific goals, timeline, and current expenses."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is a good savings goal?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Financial experts typically recommend building an emergency fund covering 3 to 6 months of living expenses as the first savings priority before working toward other goals. Once your emergency fund is in place, good next goals include saving for a home down payment, paying off high-interest debt, or funding a retirement account. Having a specific target makes it far easier to stay motivated and measure your progress."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does compound interest help savings?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Compound interest means that the interest you earn on your savings also earns interest in subsequent periods, creating a snowball effect that accelerates growth over time. For example, $10,000 earning 5% annually becomes roughly $16,300 after 10 years and nearly $26,500 after 20 years — without any additional contributions. The longer you leave money invested, the more powerful compounding becomes, which is why starting early matters so much."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Where should I put my savings?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "For short-term goals (money you'll need within 1 to 3 years), a high-yield savings account or money market account is ideal — offering safety, liquidity, and competitive interest rates. For long-term goals like retirement or a down payment 10+ years away, broad market index funds offer significantly higher expected returns despite short-term volatility. Match the account type to your time horizon: the longer you can leave money untouched, the more risk and potential return you can afford to take on."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I stay on track with my savings goal?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Automate your contributions so the transfer happens on payday before you can spend the money. Set up a dedicated savings account separate from your checking to reduce temptation. Revisit your calculator monthly to track progress and adjust your contribution if your income or timeline changes."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Should I pay off debt or save first?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "If you carry high-interest debt above 10-15% APR, paying that off first typically provides a better return than saving. However, building a small emergency fund of $1,000 to $2,000 first prevents you from going deeper into debt when unexpected expenses arise. Once high-rate debt is managed, shift focus to savings goals."
                    }
                  }
                ]
              })
            }}
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
