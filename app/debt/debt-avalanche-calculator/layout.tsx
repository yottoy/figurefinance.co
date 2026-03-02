import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debt Avalanche Calculator - Pay Less Interest | FigureFinance',
  description: 'Free debt avalanche calculator. Pay off debt by targeting highest-interest balances first. Calculate your debt-free date and compare savings vs. the snowball method.',
  alternates: { canonical: '/debt/debt-avalanche-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
