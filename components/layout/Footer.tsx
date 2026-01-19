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
    <footer className="bg-[--color-slate-50] border-t border-[--color-slate-200] mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-[--color-primary-600] mb-4">
              FigureFinance
            </h3>
            <p className="text-[--color-slate-600] text-sm leading-relaxed">
              Free financial calculators. Fast, accurate, no signup required.
            </p>
          </div>

          {/* Debt Calculators */}
          <div>
            <h4 className="font-semibold text-[--color-slate-900] mb-4">
              Debt Calculators
            </h4>
            <ul className="space-y-2">
              {calculatorLinks.debt.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[--color-slate-600] text-sm hover:text-[--color-primary-600] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mortgage Calculators */}
          <div>
            <h4 className="font-semibold text-[--color-slate-900] mb-4">
              Mortgage Calculators
            </h4>
            <ul className="space-y-2">
              {calculatorLinks.mortgage.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[--color-slate-600] text-sm hover:text-[--color-primary-600] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Savings Calculators */}
          <div>
            <h4 className="font-semibold text-[--color-slate-900] mb-4">
              Savings Calculators
            </h4>
            <ul className="space-y-2">
              {calculatorLinks.savings.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[--color-slate-600] text-sm hover:text-[--color-primary-600] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[--color-slate-200]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[--color-slate-600] text-sm">
              © {currentYear} FigureFinance. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[--color-slate-600] text-sm hover:text-[--color-primary-600] transition-colors"
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
