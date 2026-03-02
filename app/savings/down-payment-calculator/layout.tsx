import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Down Payment Calculator - How Long to Save for a House | FigureFinance',
  description: 'Free down payment calculator. Enter your target home price, current savings, and monthly contributions to see exactly how long it will take to save for a down payment.',
  alternates: { canonical: '/savings/down-payment-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
