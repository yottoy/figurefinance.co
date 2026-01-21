import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Balance Transfer Calculator - Calculate Savings | FigureFinance',
  description: 'Free balance transfer calculator. Calculate if a balance transfer will save you money. Compare transfer fees vs. interest savings.',
  alternates: {
    canonical: '/debt/balance-transfer-calculator',
  },
};

export default function BalanceTransferCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
