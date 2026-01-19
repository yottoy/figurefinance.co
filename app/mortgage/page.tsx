import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';

export default function MortgageCalculatorsPage() {
  const calculators = [
    {
      name: 'Biweekly Mortgage Payment Calculator',
      description:
        'Calculate how much you can save by making biweekly mortgage payments instead of monthly payments. See interest savings and years saved.',
      href: '/mortgage/biweekly-mortgage-payment-calculator',
      popular: false,
    },
    {
      name: 'Early Mortgage Payoff Calculator',
      description:
        'See how extra principal payments can save you thousands in interest and help you pay off your mortgage years early.',
      href: '/mortgage/early-mortgage-payoff-calculator',
      popular: true,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-[--color-slate-50] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ name: 'Mortgage Calculators' }]} />
            <h1 className="text-4xl md:text-5xl font-bold text-[--color-slate-900] mb-4">
              Mortgage Calculators
            </h1>
            <p className="text-lg text-[--color-slate-600] max-w-3xl">
              Calculate mortgage payments, compare payment strategies, and see how you can save thousands in interest by paying off your mortgage early.
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
              Pay Off Your Mortgage Faster
            </h2>
            <div className="space-y-4 text-[--color-slate-700]">
              <p>
                Your mortgage is likely your largest debt, but with the right strategy, you can pay it off years early and save tens of thousands in interest. Even small extra payments can have a huge impact over time.
              </p>
              <p>
                Our mortgage calculators show you exactly how much you can save with different payment strategies, whether you're making biweekly payments, adding extra to your monthly payment, or making one-time principal payments.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
