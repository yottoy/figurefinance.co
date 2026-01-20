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
        <section className="text-center" style={{ paddingTop: '96px', paddingBottom: '80px' }}>
          <div className="container mx-auto" style={{ maxWidth: '720px' }}>
            <h1 className="mb-4">
              Financial Calculators
            </h1>
            <p className="text-[--gray-500]" style={{ fontSize: '19px', lineHeight: '1.6' }}>
              Fast, accurate tools for debt payoff, mortgages, and savings goals.
            </p>
          </div>
        </section>

        {/* Calculators Section */}
        <section id="calculators" style={{ paddingTop: '72px', paddingBottom: '72px' }}>
          <div className="container mx-auto">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '72px' }}>
              {calculatorCategories.map((category, idx) => (
                <div key={idx}>
                  <div className="flex items-end justify-between" style={{ marginBottom: '32px' }}>
                    <div>
                      <h2 style={{ marginBottom: '8px' }}>
                        {category.category}
                      </h2>
                      <p className="text-[--gray-500]" style={{ fontSize: '17px' }}>
                        {category.description}
                      </p>
                    </div>
                    <Link
                      href={category.href}
                      className="hidden md:inline-flex items-center font-medium text-[--gray-400] hover:text-[--gray-900] transition-colors"
                      style={{ fontSize: '16px', transitionDuration: '0.2s' }}
                    >
                      View all →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px' }}>
                    {category.calculators.map((calc, calcIdx) => (
                      <Link key={calcIdx} href={calc.href} className="block">
                        <Card hover className="h-full group">
                          <h3 style={{ marginBottom: '6px' }}>
                            {calc.name}
                          </h3>
                          <p className="text-[--gray-500]" style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '12px' }}>
                            {calc.description}
                          </p>
                          <span className="font-medium text-[--gray-400] group-hover:text-[--indigo-500] transition-colors" style={{ fontSize: '16px', transitionDuration: '0.2s' }}>
                            Calculate →
                          </span>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={category.href}
                    className="md:hidden inline-flex items-center font-medium text-[--gray-400] hover:text-[--gray-900] transition-colors mt-6"
                    style={{ fontSize: '16px', transitionDuration: '0.2s' }}
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
