import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Early Mortgage Payoff Calculator - Extra Payment Savings | FigureFinance',
  description: 'Free early mortgage payoff calculator. Enter extra monthly, yearly, or one-time payments to see your new payoff date, interest saved, and how many years you cut from your loan.',
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
