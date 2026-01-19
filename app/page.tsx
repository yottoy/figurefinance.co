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
        <section className="bg-[--color-slate-50] py-20 md:py-20">
          <div className="container mx-auto px-4 text-center max-w-[800px]">
            <h1 className="text-5xl md:text-6xl font-bold text-[--color-slate-900] mb-4">
              Financial Calculators
            </h1>
            <p className="text-lg md:text-xl text-[--color-slate-600]">
              Fast, accurate tools for debt payoff, mortgages, and savings goals.
            </p>
          </div>
        </section>

        {/* Calculators Section */}
        <section id="calculators" className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {calculatorCategories.map((category, idx) => (
                <div key={idx}>
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-[--color-slate-900] mb-2">
                        {category.category}
                      </h2>
                      <p className="text-base text-[--color-slate-600]">
                        {category.description}
                      </p>
                    </div>
                    <Link
                      href={category.href}
                      className="hidden md:inline-flex items-center text-[--color-primary-600] font-medium hover:text-[--color-primary-700] transition-colors"
                    >
                      View all →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {category.calculators.map((calc, calcIdx) => (
                      <Link key={calcIdx} href={calc.href}>
                        <Card hover className="h-full">
                          <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                            {calc.name}
                          </h3>
                          <p className="text-[--color-slate-600] mb-4">
                            {calc.description}
                          </p>
                          <span className="text-[--color-primary-600] font-medium">
                            Calculate →
                          </span>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={category.href}
                    className="md:hidden inline-flex items-center text-[--color-primary-600] font-medium hover:text-[--color-primary-700] transition-colors mt-6"
                  >
                    View all →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
