import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function HomePage() {
  const calculatorCategories = [
    {
      category: 'Debt Calculators',
      description: 'Tools to help you pay off debt faster and save on interest',
      href: '/debt',
      calculators: [
        {
          name: 'Snowball Debt Calculator',
          description: 'Create a debt payoff plan using the snowball method',
          href: '/debt/snowball-debt-calculator',
        },
        {
          name: 'Balance Transfer Calculator',
          description: 'Calculate if a balance transfer will save you money',
          href: '/debt/balance-transfer-calculator',
        },
      ],
    },
    {
      category: 'Mortgage Calculators',
      description: 'Calculate mortgage payments and payoff strategies',
      href: '/mortgage',
      calculators: [
        {
          name: 'Biweekly Mortgage Payment Calculator',
          description: 'See savings from biweekly mortgage payments',
          href: '/mortgage/biweekly-mortgage-payment-calculator',
        },
        {
          name: 'Early Mortgage Payoff Calculator',
          description: 'Calculate savings from extra principal payments',
          href: '/mortgage/early-mortgage-payoff-calculator',
        },
      ],
    },
    {
      category: 'Savings Calculators',
      description: 'Plan your savings and reach your financial goals',
      href: '/savings',
      calculators: [
        {
          name: 'Savings Goal Calculator',
          description: 'Calculate how much to save to reach your goal',
          href: '/savings/savings-goal-calculator',
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[--color-primary-50] to-white py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[--color-slate-900] mb-6">
              Free Financial Calculators
            </h1>
            <p className="text-xl md:text-2xl text-[--color-slate-600] mb-8 max-w-3xl mx-auto">
              Fast, accurate, no signup required. Make informed financial decisions with our suite of professional calculators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#calculators"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[--color-primary-500] rounded-lg hover:bg-[--color-primary-600] transition-all duration-150 hover:-translate-y-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.1),0_2px_6px_rgba(99,102,241,0.3)]"
              >
                Browse Calculators
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[--color-primary-100] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[--color-primary-600]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                  Instant Results
                </h3>
                <p className="text-[--color-slate-600]">
                  Get accurate calculations in seconds. No waiting, no processing time.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[--color-primary-100] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[--color-primary-600]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                  100% Free
                </h3>
                <p className="text-[--color-slate-600]">
                  No signup, no credit card, no hidden fees. Completely free to use.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[--color-primary-100] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[--color-primary-600]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                  Privacy First
                </h3>
                <p className="text-[--color-slate-600]">
                  Your data stays private. We don't store or share your information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Section */}
        <section id="calculators" className="py-20 bg-[--color-slate-50]">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {calculatorCategories.map((category, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[--color-slate-900] mb-2">
                        {category.category}
                      </h2>
                      <p className="text-lg text-[--color-slate-600]">
                        {category.description}
                      </p>
                    </div>
                    <Link
                      href={category.href}
                      className="hidden md:inline-flex items-center gap-2 text-[--color-primary-600] font-semibold hover:text-[--color-primary-700] transition-colors"
                    >
                      View all
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.calculators.map((calc, calcIdx) => (
                      <Link key={calcIdx} href={calc.href}>
                        <Card hover className="h-full">
                          <h3 className="text-xl font-semibold text-[--color-slate-900] mb-3">
                            {calc.name}
                          </h3>
                          <p className="text-[--color-slate-600] mb-4">
                            {calc.description}
                          </p>
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

                  <Link
                    href={category.href}
                    className="md:hidden inline-flex items-center gap-2 text-[--color-primary-600] font-semibold hover:text-[--color-primary-700] transition-colors mt-6"
                  >
                    View all {category.category.toLowerCase()}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[--color-primary-500] to-[--color-primary-600]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to take control of your finances?
            </h2>
            <p className="text-xl text-[--color-primary-100] mb-8 max-w-2xl mx-auto">
              Start using our calculators today. No signup required, completely free.
            </p>
            <a
              href="#calculators"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[--color-primary-600] bg-white rounded-lg hover:bg-[--color-slate-50] transition-all duration-150 hover:-translate-y-0.5 shadow-lg"
            >
              Get Started
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
