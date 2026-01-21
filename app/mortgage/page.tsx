import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mortgage Calculators - FigureFinance',
  description: 'Free mortgage calculators including biweekly payment and early payoff calculators. Calculate how to save thousands on your mortgage.',
  alternates: {
    canonical: '/mortgage',
  },
};

export default function MortgageCalculatorsPage() {
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
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🏠</span>
            <h1 className="text-4xl font-bold">Mortgage Calculators</h1>
          </div>
          <p className="text-lg text-gray-600">Calculate your rates, price projects, generate estimates and invoices. All tools are free and require no signup.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/mortgage/biweekly-mortgage-payment-calculator" className="block p-6 border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-sm transition-all">
            <h2 className="text-lg font-semibold mb-2">Biweekly Mortgage Payment Calculator</h2>
            <p className="text-sm text-gray-600">Calculate how much you can save by making biweekly mortgage payments</p>
          </Link>
          
          <Link href="/mortgage/early-mortgage-payoff-calculator" className="block p-6 border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-sm transition-all">
            <h2 className="text-lg font-semibold mb-2">Early Mortgage Payoff Calculator</h2>
            <p className="text-sm text-gray-600">See how extra principal payments can save you thousands in interest</p>
          </Link>
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
