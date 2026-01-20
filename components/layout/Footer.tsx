import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const calculatorLinks = {
    debt: [
      { name: 'Snowball Debt Calculator', href: '/debt/snowball-debt-calculator' },
      { name: 'Balance Transfer Calculator', href: '/debt/balance-transfer-calculator' },
    ],
    mortgage: [
      { name: 'Biweekly Mortgage Calculator', href: '/mortgage/biweekly-mortgage-payment-calculator' },
      { name: 'Early Mortgage Payoff Calculator', href: '/mortgage/early-mortgage-payoff-calculator' },
    ],
    savings: [
      { name: 'Savings Goal Calculator', href: '/savings/savings-goal-calculator' },
    ],
  };

  const legalLinks = [
    { name: 'About', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
  ];

  return (
    <footer className="text-white" style={{ background: '#1a1a1a', marginTop: '96px', padding: '64px 0 32px' }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-3" style={{ fontSize: '16px' }}>
              FigureFinance
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              Free financial calculators. Fast, accurate, no signup required.
            </p>
          </div>

          {/* Debt Calculators */}
          <div>
            <h4 className="font-semibold text-xs uppercase mb-4" style={{ letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)' }}>
              Debt Calculators
            </h4>
            <ul className="space-y-2">
              {calculatorLinks.debt.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', transitionDuration: '0.2s' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mortgage Calculators */}
          <div>
            <h4 className="font-semibold text-xs uppercase mb-4" style={{ letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)' }}>
              Mortgage Calculators
            </h4>
            <ul className="space-y-2">
              {calculatorLinks.mortgage.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                    style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', transitionDuration: '0.2s' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Savings Calculators - Inline */}
        <div className="mb-12">
          <h4 className="font-semibold text-xs uppercase mb-4" style={{ letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)' }}>
            Savings Calculators
          </h4>
          <ul className="space-y-2">
            {calculatorLinks.savings.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-white transition-colors"
                  style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', transitionDuration: '0.2s' }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
              © {currentYear} FigureFinance. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors"
                  style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', transitionDuration: '0.2s' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
