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
        <section className="text-center" style={{ padding: '80px 0' }}>
          <div className="container mx-auto" style={{ maxWidth: '600px' }}>
            <h1 style={{ marginBottom: '16px' }}>
              Financial Calculators
            </h1>
            <p className="text-[--gray-600]" style={{ fontSize: '18px', marginBottom: '32px' }}>
              Fast, accurate tools for debt payoff, mortgages, and savings goals.
            </p>
            <a 
              href="#calculators" 
              className="inline-flex items-center bg-[--gray-900] text-white font-semibold hover:bg-[--gray-600] transition-all"
              style={{ 
                padding: '14px 28px', 
                fontSize: '15px', 
                borderRadius: '8px',
                gap: '8px',
                transitionDuration: '0.2s'
              }}
            >
              Browse Calculators
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </section>

        {/* Calculators Section */}
        <section id="calculators" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <div className="container mx-auto">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
              {calculatorCategories.map((category, idx) => (
                <div key={idx}>
                  <div className="flex items-center" style={{ gap: '12px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '32px', flexShrink: 0 }}>
                      {category.category.includes('Debt') ? '💳' : category.category.includes('Mortgage') ? '🏠' : '💰'}
                    </span>
                    <h2>
                      {category.category}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '16px' }}>
                    {category.calculators.map((calc, calcIdx) => (
                      <Link key={calcIdx} href={calc.href} className="block">
                        <Card hover>
                          <h3>
                            {calc.name}
                          </h3>
                        </Card>
                      </Link>
                    ))}
                  </div>
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
