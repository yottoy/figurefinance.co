import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debt Consolidation Calculator - See If It Saves Money | FigureFinance',
  description: 'Free debt consolidation calculator. Enter your current debts and a new loan offer to see exactly how much you could save in interest and whether consolidation makes sense.',
  alternates: { canonical: '/debt/debt-consolidation-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
