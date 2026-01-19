export interface EarlyPayoffInputs {
  currentBalance: number;
  interestRate: number;
  remainingYears: number;
  extraPayment: number;
  extraPaymentType: 'monthly' | 'yearly' | 'one-time';
}

export interface EarlyPayoffResult {
  originalPayment: number;
  newPayment: number;
  originalPayoffDate: Date;
  newPayoffDate: Date;
  originalTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
  timeSavedMonths: number;
}

const calculateMonthlyPayment = (
  principal: number,
  annualRate: number,
  months: number
): number => {
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) return principal / months;
  
  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  
  return payment;
};

export const calculateEarlyPayoff = (
  inputs: EarlyPayoffInputs
): EarlyPayoffResult => {
  const { currentBalance, interestRate, remainingYears, extraPayment, extraPaymentType } =
    inputs;
  
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = remainingYears * 12;
  
  // Calculate original monthly payment
  const originalPayment = calculateMonthlyPayment(
    currentBalance,
    interestRate,
    totalMonths
  );
  
  // Original scenario (no extra payments)
  let originalBalance = currentBalance;
  let originalTotalInterest = 0;
  let originalMonths = 0;
  
  for (let i = 0; i < totalMonths; i++) {
    if (originalBalance <= 0) break;
    
    const interestCharge = originalBalance * monthlyRate;
    const principalPayment = originalPayment - interestCharge;
    
    originalBalance -= principalPayment;
    originalTotalInterest += interestCharge;
    originalMonths++;
    
    if (originalBalance < 0) originalBalance = 0;
  }
  
  // New scenario (with extra payments)
  let newBalance = currentBalance;
  let newTotalInterest = 0;
  let newMonths = 0;
  let oneTimeApplied = false;
  
  for (let i = 0; i < totalMonths * 2; i++) { // Allow for longer in case of very small payments
    if (newBalance <= 0) break;
    
    const interestCharge = newBalance * monthlyRate;
    let payment = originalPayment;
    
    // Add extra payment based on type
    if (extraPaymentType === 'monthly') {
      payment += extraPayment;
    } else if (extraPaymentType === 'yearly' && (i + 1) % 12 === 0) {
      payment += extraPayment;
    } else if (extraPaymentType === 'one-time' && i === 0 && !oneTimeApplied) {
      payment += extraPayment;
      oneTimeApplied = true;
    }
    
    const principalPayment = payment - interestCharge;
    
    newBalance -= principalPayment;
    newTotalInterest += interestCharge;
    newMonths++;
    
    if (newBalance < 0) newBalance = 0;
  }
  
  // Calculate dates
  const startDate = new Date();
  const originalPayoffDate = new Date(startDate);
  originalPayoffDate.setMonth(originalPayoffDate.getMonth() + originalMonths);
  
  const newPayoffDate = new Date(startDate);
  newPayoffDate.setMonth(newPayoffDate.getMonth() + newMonths);
  
  const interestSaved = originalTotalInterest - newTotalInterest;
  const timeSavedMonths = originalMonths - newMonths;
  
  let newPayment = originalPayment;
  if (extraPaymentType === 'monthly') {
    newPayment += extraPayment;
  }
  
  return {
    originalPayment,
    newPayment,
    originalPayoffDate,
    newPayoffDate,
    originalTotalInterest,
    newTotalInterest,
    interestSaved,
    timeSavedMonths,
  };
};
