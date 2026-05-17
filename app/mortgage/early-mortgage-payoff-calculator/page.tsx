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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Early Mortgage Payoff Calculator",
    "url": "https://figurefinance.co/mortgage/early-mortgage-payoff-calculator",
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

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">How Extra Mortgage Payments Save You Money</h2>

            <h3 className="text-xl font-semibold mb-3 mt-8">The Power of Extra Principal Payments</h3>
            <p className="text-gray-700 mb-4">Every dollar you pay beyond your required monthly mortgage payment goes directly toward reducing your principal balance. Because interest is calculated on the remaining principal, lowering it means less interest accrues in every subsequent month. This creates a compounding savings effect: each extra payment not only reduces principal but also reduces the interest portion of all future payments. On a $250,000 loan at 6.5%, the first year of payments includes roughly $16,000 in interest alone. Extra principal payments during those early, interest-heavy years produce the largest lifetime savings.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Monthly vs Yearly vs One-Time Extra Payments</h3>
            <p className="text-gray-700 mb-4">This calculator supports three extra payment strategies, each with different impacts. Monthly extra payments produce the greatest savings because they reduce principal more frequently, meaning interest recalculates on a lower balance every month. Yearly lump-sum payments, such as applying a tax refund or bonus, are also effective but produce slightly less savings than the same annual total spread across monthly contributions. One-time payments are best for windfalls like an inheritance — the earlier in the loan they are applied, the more interest they prevent.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">When to Pay Off Your Mortgage Early vs Investing</h3>
            <p className="text-gray-700 mb-4">The decision between extra mortgage payments and investing depends on your interest rate and risk tolerance. Paying down a 7% mortgage provides a guaranteed 7% return, while stock market returns average around 10% historically but with significant year-to-year volatility. Many financial planners suggest a hybrid approach: maintain retirement contributions for the tax benefits and employer match, then direct remaining surplus cash toward the mortgage. If you prefer the biweekly approach to accelerating your payoff, our <Link href="/mortgage/biweekly-mortgage-payment-calculator" className="text-blue-600 hover:text-blue-800 underline">biweekly mortgage payment calculator</Link> can show you those savings.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

            <h3 className="text-xl font-semibold mb-3 mt-8">Is it worth paying off your mortgage early?</h3>
            <p className="text-gray-700 mb-4">Whether paying off your mortgage early is worth it depends primarily on your interest rate compared to what you could earn by investing that same money. If your mortgage rate is 7% and you can reliably earn more than that in index funds, investing may yield a better financial outcome. However, the guaranteed, risk-free return of paying off debt — plus the peace of mind of owning your home outright — makes early payoff a compelling choice for many homeowners.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">What is the fastest way to pay off a mortgage?</h3>
            <p className="text-gray-700 mb-4">The fastest approach combines multiple strategies: making regular extra monthly principal payments, switching to biweekly payments to squeeze in an extra payment per year, and applying any lump sums (bonuses, tax refunds, inheritances) directly to principal. Even modest increases — like rounding up your payment or adding $200 to $300 a month — can shave years off a 30-year loan. Consistency is the most important factor.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Is there a penalty for paying off a mortgage early?</h3>
            <p className="text-gray-700 mb-4">Some mortgages include prepayment penalty clauses that charge a fee if you pay off the loan — or make large extra payments — within a certain period, typically the first 3 to 5 years. These penalties are less common today, especially on conventional loans, but they do still appear on some adjustable-rate mortgages and certain refinanced loans. Review your mortgage agreement or contact your servicer before making a large lump-sum payment to confirm there are no prepayment restrictions.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">How much can I save by paying an extra $200/month on my mortgage?</h3>
            <p className="text-gray-700 mb-4">The savings from an extra $200 per month vary significantly based on your interest rate, loan balance, and remaining term, but the impact is typically substantial. On a $300,000 mortgage at 6.5% with 25 years remaining, an extra $200 per month could save over $50,000 in interest and cut more than 5 years off the loan. Use this calculator to enter your specific numbers and see your exact potential savings.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">How much interest do I save by paying an extra $500 per month on my mortgage?</h3>
            <p className="text-gray-700 mb-4">An extra $500 per month has a dramatic effect on a mortgage. On a $300,000 loan at 6.5% with 25 years remaining, an additional $500 monthly could save over $100,000 in total interest and cut roughly 10 years from your payoff timeline. The exact figures depend on your specific loan details — enter your numbers in the calculator above to see your personalized savings. Even half that amount makes a meaningful difference, so start with whatever extra you can afford and increase over time.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Should I pay off my mortgage early or invest the money?</h3>
            <p className="text-gray-700 mb-4">This is one of the most common questions in personal finance, and the answer depends on your mortgage rate, tax situation, and personal comfort with risk. From a purely mathematical perspective, if your after-tax investment returns exceed your mortgage interest rate, investing comes out ahead. However, mortgage payoff provides a guaranteed return equal to your interest rate with zero risk. Many homeowners choose a balanced approach: max out tax-advantaged retirement accounts first, then direct extra cash toward the mortgage for the peace of mind of faster debt elimination.</p>
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
                    "name": "Is it worth paying off your mortgage early?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Whether paying off your mortgage early is worth it depends primarily on your interest rate compared to what you could earn by investing that same money. If your mortgage rate is 7% and you can reliably earn more than that in index funds, investing may yield a better financial outcome. However, the guaranteed, risk-free return of paying off debt — plus the peace of mind of owning your home outright — makes early payoff a compelling choice for many homeowners."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the fastest way to pay off a mortgage?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The fastest approach combines multiple strategies: making regular extra monthly principal payments, switching to biweekly payments to squeeze in an extra payment per year, and applying any lump sums (bonuses, tax refunds, inheritances) directly to principal. Even modest increases — like rounding up your payment or adding $200 to $300 a month — can shave years off a 30-year loan. Consistency is the most important factor."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is there a penalty for paying off a mortgage early?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Some mortgages include prepayment penalty clauses that charge a fee if you pay off the loan — or make large extra payments — within a certain period, typically the first 3 to 5 years. These penalties are less common today, especially on conventional loans, but they do still appear on some adjustable-rate mortgages and certain refinanced loans. Review your mortgage agreement or contact your servicer before making a large lump-sum payment to confirm there are no prepayment restrictions."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much can I save by paying an extra $200/month on my mortgage?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The savings from an extra $200 per month vary significantly based on your interest rate, loan balance, and remaining term, but the impact is typically substantial. On a $300,000 mortgage at 6.5% with 25 years remaining, an extra $200 per month could save over $50,000 in interest and cut more than 5 years off the loan. Use this calculator to enter your specific numbers and see your exact potential savings."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much interest do I save by paying an extra $500 per month on my mortgage?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "An extra $500 per month has a dramatic effect on a mortgage. On a $300,000 loan at 6.5% with 25 years remaining, an additional $500 monthly could save over $100,000 in total interest and cut roughly 10 years from your payoff timeline. The exact figures depend on your specific loan details."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Should I pay off my mortgage early or invest the money?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "If your after-tax investment returns exceed your mortgage interest rate, investing comes out ahead mathematically. However, mortgage payoff provides a guaranteed return equal to your interest rate with zero risk. Many homeowners choose a balanced approach: max out tax-advantaged retirement accounts first, then direct extra cash toward the mortgage for the peace of mind of faster debt elimination."
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
