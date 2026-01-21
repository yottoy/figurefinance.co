import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Savings Goal Calculator - Calculate Monthly Savings | FigureFinance',
  description: 'Free savings goal calculator. Calculate how much you need to save each month to reach your financial goals with interest.',
  alternates: {
    canonical: '/savings/savings-goal-calculator',
  },
};

export default function SavingsGoalCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
