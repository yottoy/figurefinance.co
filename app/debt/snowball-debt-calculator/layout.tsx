import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snowball Debt Calculator - Free Debt Payoff Planner | FigureFinance',
  description: 'Free snowball debt calculator. Create a debt payoff plan using the snowball method. Calculate your debt-free date and total interest savings.',
  alternates: {
    canonical: '/debt/snowball-debt-calculator',
  },
};

export default function SnowballDebtCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
