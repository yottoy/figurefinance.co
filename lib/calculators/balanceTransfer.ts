export interface BalanceTransferInputs {
  currentBalance: number;
  currentAPR: number;
  transferAPR: number;
  transferFee: number;
  promoLength: number;
  postPromoAPR: number;
  monthlyPayment: number;
}

export interface PaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface BalanceTransferResult {
  transferFeeAmount: number;
  currentInterest: number;
  transferInterest: number;
  totalSavings: number;
  payoffMonths: number;
  willPayoffDuringPromo: boolean;
  postPromoBalance: number;
  isWorthIt: boolean;
}

export const calculateBalanceTransfer = (
  inputs: BalanceTransferInputs
): BalanceTransferResult => {
  const {
    currentBalance,
    currentAPR,
    transferAPR,
    transferFee,
    promoLength,
    postPromoAPR,
    monthlyPayment,
  } = inputs;

  // Calculate transfer fee
  const transferFeeAmount = currentBalance * (transferFee / 100);
  const transferStartBalance = currentBalance + transferFeeAmount;

  // Current card scenario
  let currentCardBalance = currentBalance;
  let currentTotalInterest = 0;
  let currentMonths = 0;
  const currentMonthlyRate = currentAPR / 100 / 12;

  for (let i = 0; i < 500; i++) {
    // Max 500 months
    if (currentCardBalance <= 0) break;

    const interestCharge = currentCardBalance * currentMonthlyRate;
    const principalPayment = Math.min(
      monthlyPayment - interestCharge,
      currentCardBalance
    );

    if (principalPayment <= 0) {
      throw new Error(
        'Monthly payment is too low to pay off the balance. Please increase your monthly payment.'
      );
    }

    currentCardBalance -= principalPayment;
    currentTotalInterest += interestCharge;
    currentMonths++;

    if (currentCardBalance < 0) currentCardBalance = 0;
  }

  // Transfer card scenario
  let transferCardBalance = transferStartBalance;
  let transferTotalInterest = 0;
  let transferMonths = 0;
  const transferPromoRate = transferAPR / 100 / 12;
  const transferPostPromoRate = postPromoAPR / 100 / 12;

  for (let i = 0; i < 500; i++) {
    if (transferCardBalance <= 0) break;

    // Use promo rate for first promoLength months, then post-promo rate
    const monthlyRate =
      i < promoLength ? transferPromoRate : transferPostPromoRate;
    const interestCharge = transferCardBalance * monthlyRate;
    const principalPayment = Math.min(
      monthlyPayment - interestCharge,
      transferCardBalance
    );

    if (principalPayment <= 0) {
      throw new Error(
        'Monthly payment is too low to pay off the balance. Please increase your monthly payment.'
      );
    }

    transferCardBalance -= principalPayment;
    transferTotalInterest += interestCharge;
    transferMonths++;

    if (transferCardBalance < 0) transferCardBalance = 0;
  }

  // Check if balance is paid off during promo period
  const willPayoffDuringPromo = transferMonths <= promoLength;

  // Calculate balance remaining when promo ends
  let postPromoBalance = transferStartBalance;
  for (let i = 0; i < promoLength; i++) {
    if (postPromoBalance <= 0) break;

    const interestCharge = postPromoBalance * transferPromoRate;
    const principalPayment = Math.min(
      monthlyPayment - interestCharge,
      postPromoBalance
    );

    postPromoBalance -= principalPayment;
    if (postPromoBalance < 0) postPromoBalance = 0;
  }

  // Calculate total savings (accounting for transfer fee)
  const totalSavings = currentTotalInterest - (transferTotalInterest + transferFeeAmount);
  const isWorthIt = totalSavings > 0;

  return {
    transferFeeAmount,
    currentInterest: currentTotalInterest,
    transferInterest: transferTotalInterest,
    totalSavings,
    payoffMonths: transferMonths,
    willPayoffDuringPromo,
    postPromoBalance,
    isWorthIt,
  };
};
