import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';

export default function SavingsCalculatorsPage() {
  const calculators = [
    {
      name: 'Savings Goal Calculator',
      description:
        'Calculate how much you need to save each month to reach your financial goal. Accounts for your current savings and expected interest.',
      href: '/savings/savings-goal-calculator',
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
            <Breadcrumbs items={[{ name: 'Savings Calculators' }]} />
            <h1 className="text-4xl md:text-5xl font-bold text-[--color-slate-900] mb-4">
              Savings Calculators
            </h1>
            <p className="text-lg text-[--color-slate-600] max-w-3xl">
              Plan your savings and reach your financial goals. Calculate how much to save monthly for emergency funds, down payments, vacations, and more.
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
              Build Your Financial Future
            </h2>
            <div className="space-y-4 text-[--color-slate-700]">
              <p>
                Saving money is one of the most important financial habits you can develop. Whether you're building an emergency fund, saving for a down payment, or planning for a major purchase, having a clear savings plan makes your goal achievable.
              </p>
              <p>
                Our savings calculators help you create a realistic plan by showing you exactly how much to save each month. Factor in your current savings, expected interest, and timeline to see your path to financial success.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
