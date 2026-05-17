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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Balance Transfer Calculator",
    "url": "https://figurefinance.co/debt/balance-transfer-calculator",
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

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">What Is a Balance Transfer and How Does It Work?</h2>

            <h3 className="text-xl font-semibold mb-3 mt-8">How a Balance Transfer Saves You Money</h3>
            <p className="text-gray-700 mb-4">A balance transfer moves existing credit card debt from a high-interest card to a new card with a lower or 0% promotional APR. During the promotional period, which commonly lasts 12 to 21 months, your entire monthly payment goes toward reducing the principal balance instead of being consumed by interest charges. On an $8,000 balance at 22% APR, you would normally pay roughly $1,700 in interest over 18 months. With a 0% promotional rate, that interest cost drops to zero, and the only upfront cost is the one-time transfer fee.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Balance Transfer Fees Explained</h3>
            <p className="text-gray-700 mb-4">Most issuers charge a transfer fee of 3% to 5% of the amount moved. On a $10,000 transfer, a 3% fee adds $300 to your new balance. While this might seem like a significant cost, it pales in comparison to the interest you would pay at a high APR over 12 to 18 months. The key calculation is simple: compare the one-time fee to the total interest you would owe if you kept the balance on your current card. If the interest savings exceed the fee, the transfer is financially beneficial. If you are also considering combining multiple debts into a single payment, our <Link href="/debt/debt-consolidation-calculator" className="text-blue-600 hover:text-blue-800 underline">debt consolidation calculator</Link> can help you evaluate that option.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">What Happens After the Promotional Period</h3>
            <p className="text-gray-700 mb-4">When the promotional period ends, the standard APR on the new card takes effect on any remaining balance. This rate is often between 18% and 27%, similar to or higher than what you were paying before. If you have not paid off the full balance by then, you will begin accruing interest at the new rate, which can quickly erode the savings you gained during the promotion. That is why your payoff plan matters as much as the offer itself: the goal is to clear the debt entirely before the promo window closes.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

            <h3 className="text-xl font-semibold mb-3 mt-8">Is a balance transfer worth it?</h3>
            <p className="text-gray-700 mb-4">A balance transfer is generally worth it if you can pay off the transferred amount before the promotional period ends, saving you from accruing further high-interest charges. Even after accounting for the transfer fee, moving a large balance from a 20%+ APR card to a 0% promotional offer can save hundreds or thousands of dollars. The key is to commit to a realistic payment plan that clears the balance within the promo window.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">What is a typical balance transfer fee?</h3>
            <p className="text-gray-700 mb-4">Most balance transfer fees range from 3% to 5% of the total amount transferred, and this fee is added to your new card balance. For example, transferring $8,000 at a 3% fee means you&apos;ll owe $8,240 on the new card from day one. Some cards occasionally offer no-fee transfers, but these are rare and usually come with shorter promotional periods.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">How long do balance transfer offers last?</h3>
            <p className="text-gray-700 mb-4">Promotional balance transfer periods typically last between 12 and 21 months, with 15 to 18 months being the most common range offered by major issuers. The length of the offer often correlates with your creditworthiness — borrowers with excellent credit tend to qualify for the longest 0% windows. Always confirm the exact end date of the promo period from your card agreement, as interest can begin accruing immediately after it expires.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Can I transfer a balance between cards from the same bank?</h3>
            <p className="text-gray-700 mb-4">In most cases, no — banks do not allow you to transfer balances between two cards they both issue, as this would simply be moving money within their own portfolio. For example, you generally cannot transfer a Chase balance to another Chase card or a Citi balance to another Citi card. You&apos;ll need to open a card from a different bank to take advantage of a 0% balance transfer offer.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">How do I calculate if a credit card balance transfer is worth it?</h3>
            <p className="text-gray-700 mb-4">To determine if a balance transfer makes financial sense, compare two numbers: the total cost of keeping your current card (interest charges over your expected payoff period) versus the total cost of transferring (the one-time transfer fee plus any interest after the promo period). If the transfer costs less, it is worth it. Our calculator above does this comparison automatically. As a rule of thumb, the higher your current APR and the larger your balance, the more likely a transfer will save you money.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">What happens to my old credit card after a balance transfer?</h3>
            <p className="text-gray-700 mb-4">Your old credit card remains open with a zero or reduced balance after the transfer completes. Closing the old card is not required and is generally not recommended, because closing an account reduces your total available credit, which can lower your credit score. Most financial advisors suggest keeping the old card open but avoiding new charges on it while you focus on paying off the transferred balance.</p>

            <h3 className="text-xl font-semibold mb-3 mt-8">Can I do a balance transfer with bad credit?</h3>
            <p className="text-gray-700 mb-4">Balance transfer cards with 0% promotional rates typically require good to excellent credit, generally a FICO score of 670 or higher. If your credit score is below that threshold, you may still qualify for a card with a reduced APR rather than 0%, which can still save money compared to a high-rate card. Another option for consolidating debt with less-than-perfect credit is a <Link href="/debt/debt-consolidation-calculator" className="text-blue-600 hover:text-blue-800 underline">debt consolidation loan</Link>, which may have more flexible credit requirements.</p>
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
                    "name": "Is a balance transfer worth it?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A balance transfer is generally worth it if you can pay off the transferred amount before the promotional period ends, saving you from accruing further high-interest charges. Even after accounting for the transfer fee, moving a large balance from a 20%+ APR card to a 0% promotional offer can save hundreds or thousands of dollars. The key is to commit to a realistic payment plan that clears the balance within the promo window."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is a typical balance transfer fee?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most balance transfer fees range from 3% to 5% of the total amount transferred, and this fee is added to your new card balance. For example, transferring $8,000 at a 3% fee means you'll owe $8,240 on the new card from day one. Some cards occasionally offer no-fee transfers, but these are rare and usually come with shorter promotional periods."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long do balance transfer offers last?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Promotional balance transfer periods typically last between 12 and 21 months, with 15 to 18 months being the most common range offered by major issuers. The length of the offer often correlates with your creditworthiness — borrowers with excellent credit tend to qualify for the longest 0% windows. Always confirm the exact end date of the promo period from your card agreement, as interest can begin accruing immediately after it expires."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I transfer a balance between cards from the same bank?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "In most cases, no — banks do not allow you to transfer balances between two cards they both issue, as this would simply be moving money within their own portfolio. For example, you generally cannot transfer a Chase balance to another Chase card or a Citi balance to another Citi card. You'll need to open a card from a different bank to take advantage of a 0% balance transfer offer."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I calculate if a credit card balance transfer is worth it?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Compare the total cost of keeping your current card (interest charges over your expected payoff period) versus the total cost of transferring (the one-time transfer fee plus any interest after the promo period). If the transfer costs less, it is worth it. As a rule of thumb, the higher your current APR and the larger your balance, the more likely a transfer will save you money."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What happens to my old credit card after a balance transfer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Your old credit card remains open with a zero or reduced balance after the transfer completes. Closing the old card is not required and is generally not recommended, because closing an account reduces your total available credit, which can lower your credit score. Most financial advisors suggest keeping the old card open but avoiding new charges on it."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I do a balance transfer with bad credit?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Balance transfer cards with 0% promotional rates typically require good to excellent credit, generally a FICO score of 670 or higher. If your credit score is below that threshold, you may still qualify for a card with a reduced APR rather than 0%, which can still save money compared to a high-rate card. Another option is a debt consolidation loan, which may have more flexible credit requirements."
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
