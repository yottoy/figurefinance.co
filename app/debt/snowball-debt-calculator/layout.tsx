import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debt Snowball Calculator - Free Debt Payoff Plan | FigureFinance',
  description: 'Free debt snowball calculator. Add all your debts to get a step-by-step payoff plan with the snowball method. See your debt-free date, payoff order, and total interest paid.',
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
