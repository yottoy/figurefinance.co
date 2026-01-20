import Link from 'next/link';

export default function HomePage() {
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

      <main>
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">Financial Calculators</h1>
          <p className="text-lg text-gray-600 mb-8">Calculate consulting rates, PTO accrual, profit margins, and more. No signup required.</p>
          <Link href="#calculators" className="inline-flex items-center gap-2 px-7 py-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700">
            Browse Calculators
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </Link>
        </section>

        <section id="calculators" className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-3xl">💳</span>
            <h2 className="text-2xl font-semibold">Debt Calculators</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/debt/snowball-debt-calculator" className="block p-5 border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-sm transition-all">
              <h3 className="font-semibold">Snowball Debt Calculator</h3>
            </Link>
            <Link href="/debt/balance-transfer-calculator" className="block p-5 border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-sm transition-all">
              <h3 className="font-semibold">Balance Transfer Calculator</h3>
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-3xl">🏠</span>
            <h2 className="text-2xl font-semibold">Mortgage Calculators</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/mortgage/biweekly-mortgage-payment-calculator" className="block p-5 border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-sm transition-all">
              <h3 className="font-semibold">Biweekly Mortgage Payment Calculator</h3>
            </Link>
            <Link href="/mortgage/early-mortgage-payoff-calculator" className="block p-5 border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-sm transition-all">
              <h3 className="font-semibold">Early Mortgage Payoff Calculator</h3>
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-3xl">💰</span>
            <h2 className="text-2xl font-semibold">Savings Calculators</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/savings/savings-goal-calculator" className="block p-5 border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-sm transition-all">
              <h3 className="font-semibold">Savings Goal Calculator</h3>
            </Link>
          </div>
        </section>
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
