import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biweekly Mortgage Payment Calculator - Save Thousands | FigureFinance',
  description: 'Free biweekly mortgage payment calculator. Calculate how much you can save by making biweekly mortgage payments instead of monthly.',
  alternates: {
    canonical: '/mortgage/biweekly-mortgage-payment-calculator',
  },
};

export default function BiweeklyMortgageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
