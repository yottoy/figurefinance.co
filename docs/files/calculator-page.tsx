'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function CalculatorPage() {
  const [salary, setSalary] = useState(100000);
  const [hours, setHours] = useState(1560);
  const [overhead, setOverhead] = useState(25);
  const [tax, setTax] = useState(30);
  const [profit, setProfit] = useState(20);

  // Calculate recommended rate
  const calculateRate = () => {
    const totalCostMultiplier = 1 + (overhead / 100) + (tax / 100) + (profit / 100);
    const neededRevenue = salary * totalCostMultiplier;
    const hourlyRate = neededRevenue / hours;
    return {
      exact: hourlyRate.toFixed(2),
      rounded: (Math.round(hourlyRate / 5) * 5).toFixed(2),
      daily: (hourlyRate * 8).toFixed(2),
      weekly: (hourlyRate * 40).toFixed(2),
      monthly: (hourlyRate * 173).toFixed(2),
      annual: neededRevenue.toFixed(2),
      breakeven: ((salary * (1 + (overhead / 100) + (tax / 100))) / hours).toFixed(2)
    };
  };

  const rates = calculateRate();

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
            <h2 className="text-xl font-semibold mb-6">Your Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Desired Annual Salary</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full h-12 pl-8 pr-4 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">How much do you want to take home per year?</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Billable Hours per Year</label>
                <div className="relative">
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full h-12 pl-4 pr-16 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">hours</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Most consultants bill 1,500-1,800 hours per year</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Overhead & Expenses</label>
                <div className="relative">
                  <input
                    type="number"
                    value={overhead}
                    onChange={(e) => setOverhead(Number(e.target.value))}
                    className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Business expenses (software, insurance, equipment)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Self-Employment Tax</label>
                <div className="relative">
                  <input
                    type="number"
                    value={tax}
                    onChange={(e) => setTax(Number(e.target.value))}
                    className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Federal + state income tax + self-employment tax</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Desired Profit Margin</label>
                <div className="relative">
                  <input
                    type="number"
                    value={profit}
                    onChange={(e) => setProfit(Number(e.target.value))}
                    className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Additional profit for business growth and savings</p>
              </div>

              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 border-2 border-gray-200 rounded-lg px-4 py-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Reset to Defaults
              </button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 lg:sticky lg:top-20 h-fit">
            <h2 className="text-xl font-semibold mb-6">Your Rates</h2>
            
            {/* Primary Result */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center mb-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Recommended Hourly Rate</div>
              <div className="text-6xl font-bold font-mono mb-2">${rates.rounded}</div>
              <div className="text-xs text-gray-500">Rounded to nearest $5</div>
            </div>

            {/* Secondary Results Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Exact Rate</div>
                <div className="text-2xl font-bold font-mono mb-1">${rates.exact}</div>
                <div className="text-xs text-gray-500">Based on inputs</div>
              </div>
              
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Daily Rate</div>
                <div className="text-2xl font-bold font-mono mb-1">${rates.daily}</div>
                <div className="text-xs text-gray-500">8 hours per day</div>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Weekly Rate</div>
                <div className="text-2xl font-bold font-mono mb-1">${rates.weekly}</div>
                <div className="text-xs text-gray-500">40 hours per week</div>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Monthly Rate</div>
                <div className="text-2xl font-bold font-mono mb-1">${rates.monthly}</div>
                <div className="text-xs text-gray-500">~173 hours/month</div>
              </div>
            </div>

            {/* Full Width Results */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-center mb-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Annual Revenue Needed</div>
              <div className="text-2xl font-bold font-mono mb-1">${rates.annual}</div>
              <div className="text-xs text-gray-500">Total revenue to achieve goals</div>
            </div>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Break-Even Rate</div>
              <div className="text-2xl font-bold font-mono mb-1">${rates.breakeven}</div>
              <div className="text-xs text-gray-500">Minimum rate to cover costs (no profit)</div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">How to Use This Calculator</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Step 1: Enter Your Desired Annual Salary</h3>
            <p className="text-gray-700 mb-4">Start by entering how much you want to earn per year. This should be your take-home salary goal, similar to what you'd earn as a W2 employee.</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="text-xs font-bold uppercase tracking-wide text-blue-900 mb-2">Pro Tip</div>
              <p className="text-sm text-blue-900">New consultants should aim for 1,200-1,400 hours. Established consultants can target 1,500-1,800 hours.</p>
            </div>

            <h3 className="text-xl font-semibold mb-3 mt-8">Step 2: Set Your Billable Hours</h3>
            <p className="text-gray-700 mb-4">Not all hours in a year are billable. You'll spend time on marketing, administration, professional development, and vacations.</p>
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
