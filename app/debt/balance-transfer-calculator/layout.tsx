import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Balance Transfer Calculator - Compare Offers & Fees | FigureFinance',
  description: 'Free balance transfer calculator. Enter your balance, APR, and transfer offer to instantly see your savings. Compares fees, promotional rates, and payoff timelines. No signup required.',
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
