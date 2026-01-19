import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';

export default function DebtCalculatorsPage() {
  const calculators = [
    {
      name: 'Snowball Debt Calculator',
      description:
        'Create a debt payoff plan using the snowball method. Pay off debts from smallest to largest balance, building momentum as you go.',
      href: '/debt/snowball-debt-calculator',
      popular: true,
    },
    {
      name: 'Balance Transfer Calculator',
      description:
        'Compare balance transfer credit card offers and calculate your savings. Factors in transfer fees, promotional periods, and post-promotional rates.',
      href: '/debt/balance-transfer-calculator',
      popular: false,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-[--color-slate-50] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ name: 'Debt Calculators' }]} />
            <h1 className="text-4xl md:text-5xl font-bold text-[--color-slate-900] mb-4">
              Debt Calculators
            </h1>
            <p className="text-lg text-[--color-slate-600] max-w-3xl">
              Tools to help you pay off debt faster and save money on interest. Create personalized debt payoff plans and compare strategies.
            </p>
          </div>
        </section>

        {/* Calculators Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
              {calculators.map((calc, idx) => (
                <Link key={idx} href={calc.href}>
                  <Card hover className="h-full">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-[--color-slate-900]">
                        {calc.name}
                      </h2>
                      {calc.popular && (
                        <span className="text-xs font-semibold text-[--color-primary-600] bg-[--color-primary-100] px-2 py-1 rounded">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-[--color-slate-600] mb-6">{calc.description}</p>
                    <span className="text-[--color-primary-600] font-medium inline-flex items-center gap-2">
                      Calculate now
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-[--color-slate-50]">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-[--color-slate-900] mb-6">
              Take Control of Your Debt
            </h2>
            <div className="space-y-4 text-[--color-slate-700]">
              <p>
                Paying off debt can feel overwhelming, but with the right strategy and tools, you can become debt-free faster than you think. Our debt calculators help you create a personalized payoff plan and see exactly how long it will take to eliminate your debt.
              </p>
              <p>
                Whether you're using the debt snowball method to build momentum with quick wins, or comparing balance transfer offers to save on interest, our calculators provide clear, actionable insights to guide your debt payoff journey.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
