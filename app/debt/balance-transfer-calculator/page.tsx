'use client';

import { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator/CalculatorLayout';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { Card } from '@/components/ui/Card';
import { Button, Input } from '@/components/ui';
import {
  calculateBalanceTransfer,
  BalanceTransferResult,
} from '@/lib/calculators/balanceTransfer';
import { formatCurrency } from '@/lib/utils/formatters';
import { Badge } from '@/components/ui/Badge';

export default function BalanceTransferCalculator() {
  const [currentBalance, setCurrentBalance] = useState<number>(8000);
  const [currentAPR, setCurrentAPR] = useState<number>(22.5);
  const [transferAPR, setTransferAPR] = useState<number>(0);
  const [transferFee, setTransferFee] = useState<number>(3);
  const [promoLength, setPromoLength] = useState<number>(18);
  const [postPromoAPR, setPostPromoAPR] = useState<number>(19.99);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(300);
  const [result, setResult] = useState<BalanceTransferResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    try {
      setError('');

      if (currentBalance <= 0) {
        setError('Current balance must be greater than $0');
        return;
      }

      if (currentAPR < 0 || currentAPR > 100) {
        setError('Current APR must be between 0% and 100%');
        return;
      }

      if (transferAPR < 0 || transferAPR > 100) {
        setError('Transfer APR must be between 0% and 100%');
        return;
      }

      if (transferFee < 0 || transferFee > 100) {
        setError('Transfer fee must be between 0% and 100%');
        return;
      }

      if (promoLength <= 0) {
        setError('Promotional period must be greater than 0 months');
        return;
      }

      if (postPromoAPR < 0 || postPromoAPR > 100) {
        setError('Post-promo APR must be between 0% and 100%');
        return;
      }

      if (monthlyPayment <= 0) {
        setError('Monthly payment must be greater than $0');
        return;
      }

      const calculatedResult = calculateBalanceTransfer({
        currentBalance,
        currentAPR,
        transferAPR,
        transferFee,
        promoLength,
        postPromoAPR,
        monthlyPayment,
      });
      setResult(calculatedResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during calculation'
      );
    }
  };

  const handleReset = () => {
    setCurrentBalance(8000);
    setCurrentAPR(22.5);
    setTransferAPR(0);
    setTransferFee(3);
    setPromoLength(18);
    setPostPromoAPR(19.99);
    setMonthlyPayment(300);
    setResult(null);
    setError('');
  };

  const relatedCalculators = [
    {
      name: 'Snowball Debt Calculator',
      description: 'Create a debt payoff plan using the snowball method.',
      href: '/debt/snowball-debt-calculator',
    },
    {
      name: 'Early Mortgage Payoff Calculator',
      description: 'Calculate savings from extra mortgage payments.',
      href: '/mortgage/early-mortgage-payoff-calculator',
    },
    {
      name: 'Savings Goal Calculator',
      description: 'Calculate how much to save monthly to reach your goal.',
      href: '/savings/savings-goal-calculator',
    },
  ];

  return (
    <CalculatorLayout
      breadcrumbs={[
        { name: 'Debt', href: '/debt' },
        { name: 'Balance Transfer Calculator' },
      ]}
      title="Balance Transfer Calculator - Find the Best Deal"
      description="Compare balance transfer offers and calculate your savings. Our calculator factors in transfer fees, promotional periods, and post-promotional rates to show if a balance transfer will save you money."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[600px,1fr] gap-8">
        {/* Calculator Form */}
        <div>
          <Card variant="calculator">
            <h2 className="text-2xl font-bold text-[--color-slate-900] mb-6">
              Compare Balance Transfer
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="p-4 bg-[--color-slate-50] rounded-lg">
                <h3 className="font-semibold text-[--color-slate-900] mb-4">
                  Current Card
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Current Balance"
                    type="number"
                    isCurrency
                    value={currentBalance || ''}
                    onChange={(e) => setCurrentBalance(parseFloat(e.target.value) || 0)}
                    placeholder="8000"
                  />
                  <Input
                    label="Current APR (%)"
                    type="number"
                    step="0.1"
                    value={currentAPR || ''}
                    onChange={(e) => setCurrentAPR(parseFloat(e.target.value) || 0)}
                    placeholder="22.5"
                  />
                </div>
              </div>

              <div className="p-4 bg-[--color-primary-50] rounded-lg">
                <h3 className="font-semibold text-[--color-slate-900] mb-4">
                  Transfer Card Offer
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Promotional APR (%)"
                    type="number"
                    step="0.1"
                    value={transferAPR || ''}
                    onChange={(e) => setTransferAPR(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    helperText="Often 0% for balance transfers"
                  />
                  <Input
                    label="Transfer Fee (%)"
                    type="number"
                    step="0.1"
                    value={transferFee || ''}
                    onChange={(e) => setTransferFee(parseFloat(e.target.value) || 0)}
                    placeholder="3"
                    helperText="Typically 3-5% of transfer amount"
                  />
                  <Input
                    label="Promotional Period (months)"
                    type="number"
                    value={promoLength || ''}
                    onChange={(e) => setPromoLength(parseFloat(e.target.value) || 0)}
                    placeholder="18"
                  />
                  <Input
                    label="APR After Promo (%)"
                    type="number"
                    step="0.1"
                    value={postPromoAPR || ''}
                    onChange={(e) => setPostPromoAPR(parseFloat(e.target.value) || 0)}
                    placeholder="19.99"
                  />
                </div>
              </div>

              <Input
                label="Monthly Payment"
                type="number"
                isCurrency
                value={monthlyPayment || ''}
                onChange={(e) => setMonthlyPayment(parseFloat(e.target.value) || 0)}
                placeholder="300"
                helperText="How much you plan to pay each month"
              />

              <div className="flex gap-4">
                <Button size="large" onClick={handleCalculate} className="flex-1">
                  Calculate Savings
                </Button>
                <Button size="large" variant="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div>
          {result && (
            <div className="space-y-6">
              {/* Verdict */}
              <Card variant="result">
                <div className="text-center">
                  {result.isWorthIt ? (
                    <>
                      <Badge variant="success" className="mb-4">
                        RECOMMENDED
                      </Badge>
                      <div className="text-sm font-semibold text-[--color-slate-600] uppercase tracking-wider mb-2">
                        Total Savings
                      </div>
                      <div className="text-5xl font-bold text-[--color-success] font-[family-name:var(--font-jetbrains-mono)] tabular-nums mb-4">
                        {formatCurrency(result.totalSavings)}
                      </div>
                      <div className="text-lg text-[--color-slate-700]">
                        This balance transfer will save you money!
                      </div>
                    </>
                  ) : (
                    <>
                      <Badge className="mb-4 bg-[--color-warning]/20 text-[--color-warning]">
                        NOT RECOMMENDED
                      </Badge>
                      <div className="text-sm font-semibold text-[--color-slate-600] uppercase tracking-wider mb-2">
                        Additional Cost
                      </div>
                      <div className="text-5xl font-bold text-[--color-error] font-[family-name:var(--font-jetbrains-mono)] tabular-nums mb-4">
                        {formatCurrency(Math.abs(result.totalSavings))}
                      </div>
                      <div className="text-lg text-[--color-slate-700]">
                        You'll pay more with this balance transfer
                      </div>
                    </>
                  )}
                </div>
              </Card>

              {/* Breakdown */}
              <Card>
                <h3 className="text-xl font-bold text-[--color-slate-900] mb-6">
                  Cost Breakdown
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                    <span className="text-[--color-slate-600]">Transfer Fee</span>
                    <span className="font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                      {formatCurrency(result.transferFeeAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                    <span className="text-[--color-slate-600]">
                      Interest on Current Card
                    </span>
                    <span className="font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                      {formatCurrency(result.currentInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-[--color-slate-200]">
                    <span className="text-[--color-slate-600]">
                      Interest on Transfer Card
                    </span>
                    <span className="font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                      {formatCurrency(result.transferInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between py-3 bg-[--color-slate-50] rounded-lg px-4">
                    <span className="text-[--color-slate-900] font-semibold">
                      Net Savings
                    </span>
                    <span
                      className={`font-bold text-lg font-[family-name:var(--font-jetbrains-mono)] tabular-nums ${
                        result.isWorthIt
                          ? 'text-[--color-success]'
                          : 'text-[--color-error]'
                      }`}
                    >
                      {result.isWorthIt ? '+' : ''}
                      {formatCurrency(result.totalSavings)}
                    </span>
                  </div>

                  <div className="mt-6 p-4 bg-[--color-info]/10 rounded-lg">
                    <h4 className="font-semibold text-[--color-slate-900] mb-2">
                      Payoff Timeline
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[--color-slate-600]">
                          Total months to payoff:
                        </span>
                        <span className="font-semibold text-[--color-slate-900]">
                          {result.payoffMonths} months
                        </span>
                      </div>
                      {!result.willPayoffDuringPromo && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-[--color-slate-600]">
                              Balance when promo ends:
                            </span>
                            <span className="font-semibold text-[--color-slate-900] font-[family-name:var(--font-jetbrains-mono)] tabular-nums">
                              {formatCurrency(result.postPromoBalance)}
                            </span>
                          </div>
                          <div className="mt-3 p-3 bg-[--color-warning]/20 rounded text-[--color-slate-700]">
                            ⚠️ You won't pay off the balance during the promotional period. 
                            The remaining balance will start accruing interest at {postPromoAPR}%.
                          </div>
                        </>
                      )}
                      {result.willPayoffDuringPromo && (
                        <div className="mt-3 p-3 bg-[--color-success]/20 rounded text-[--color-slate-700]">
                          ✓ You'll pay off the balance during the promotional period!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className="mt-16 max-w-4xl">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            How to Use the Balance Transfer Calculator
          </h2>
          <div className="space-y-4 text-[--color-slate-700]">
            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 1: Enter Your Current Card Details
            </h3>
            <p>
              Start with your current credit card balance and APR. You can find these on your monthly statement or by logging into your credit card account online.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 2: Add the Transfer Card Offer Details
            </h3>
            <p>
              Enter the promotional APR (often 0%), transfer fee (typically 3-5%), promotional period length, and the APR that applies after the promotion ends.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              Step 3: Enter Your Monthly Payment
            </h3>
            <p>
              Input how much you plan to pay each month. The calculator will determine if you'll pay off the balance during the promotional period and calculate your total savings.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            Understanding Balance Transfers
          </h2>
          <div className="space-y-4 text-[--color-slate-700]">
            <p>
              A balance transfer moves debt from one credit card to another, typically to take advantage of a lower interest rate or 0% promotional period. This can save you money on interest charges, but you need to consider the transfer fee and ensure you can pay off the balance before the promotional rate expires.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              How Balance Transfer Fees Work
            </h3>
            <p>
              Most balance transfer offers charge a fee of 3-5% of the amount transferred. For example, transferring $10,000 with a 3% fee costs $300. This fee is typically added to your new card balance. Even with the fee, balance transfers often save money if you have high-interest debt.
            </p>

            <h3 className="text-xl font-semibold text-[--color-slate-900] mt-6">
              The Importance of the Promotional Period
            </h3>
            <p>
              Most balance transfer offers include a 0% APR promotional period, typically 12-21 months. After this period ends, the remaining balance starts accruing interest at the card's regular APR, which is often 15-25%. To maximize savings, aim to pay off the balance before the promotional period ends.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            When Balance Transfers Make Sense
          </h2>
          <ul className="space-y-3 text-[--color-slate-700]">
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span>
                <strong>You have high-interest credit card debt</strong> (typically above 15% APR)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span>
                <strong>You can pay off the balance during the promo period</strong> or make significant progress
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span>
                <strong>You have good credit</strong> to qualify for the best offers (usually 670+ credit score)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--color-primary-600] font-bold">✓</span>
              <span>
                <strong>You won't accumulate new debt</strong> on either card during the payoff period
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Are balance transfer fees worth it?
              </h3>
              <p className="text-[--color-slate-700]">
                Yes, if you have high-interest debt. A 3% fee on a 0% APR card is usually worthwhile if your current card charges 20%+ interest. Our calculator helps you determine if the fee is worth paying based on your specific situation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                How long do balance transfer promotions last?
              </h3>
              <p className="text-[--color-slate-700]">
                Most balance transfer promotional periods range from 12 to 21 months. The best offers provide 18 months or more of 0% APR. Check the terms carefully, as the promotional period starts from when the transfer is completed, not when you apply.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Can I transfer a balance to any credit card?
              </h3>
              <p className="text-[--color-slate-700]">
                You can only transfer balances to cards that offer balance transfer options. You cannot transfer a balance between cards from the same issuing bank. For example, you can't transfer from one Chase card to another Chase card.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Will a balance transfer hurt my credit score?
              </h3>
              <p className="text-[--color-slate-700]">
                A balance transfer may temporarily lower your credit score by a few points due to the hard inquiry from applying for a new card. However, paying off high-interest debt faster can improve your credit utilization ratio and ultimately boost your score.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                What happens if I don't pay off the balance during the promo period?
              </h3>
              <p className="text-[--color-slate-700]">
                The remaining balance will start accruing interest at the card's regular APR, which is typically 15-25%. Unlike some promotional offers, you won't be charged retroactive interest on the amount you already paid off during the promotional period.
              </p>
            </div>
          </div>
        </section>
      </div>

      <RelatedCalculators calculators={relatedCalculators} />
    </CalculatorLayout>
  );
}
