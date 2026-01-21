import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Early Mortgage Payoff Calculator - Calculate Interest Savings | FigureFinance',
  description: 'Free early mortgage payoff calculator. See how extra principal payments can save you thousands in interest and years of payments.',
  alternates: {
    canonical: '/mortgage/early-mortgage-payoff-calculator',
  },
};

export default function EarlyMortgagePayoffCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
