import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biweekly Mortgage Payment Calculator - See How Much You Save | FigureFinance',
  description: 'Free biweekly mortgage payment calculator. See exactly how much interest you save and how many years you cut by switching from monthly to biweekly payments. Instant results, no signup.',
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
