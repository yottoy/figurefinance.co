export interface BiweeklyMortgageInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export interface AmortizationItem {
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
}

export interface BiweeklyMortgageResult {
  monthlyPayment: number;
  biweeklyPayment: number;
  monthlyPayoffMonths: number;
  biweeklyPayoffMonths: number;
  monthlyTotalInterest: number;
  biweeklyTotalInterest: number;
  interestSaved: number;
  timeSavedMonths: number;
  timeSavedYears: number;
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

export const calculateBiweeklyMortgage = (
  inputs: BiweeklyMortgageInputs
): BiweeklyMortgageResult => {
  const { loanAmount, interestRate, loanTerm } = inputs;
  
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTerm * 12;
  
  // Calculate monthly payment
  const monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    interestRate,
    totalMonths
  );
  
  // Monthly payment scenario
  let monthlyBalance = loanAmount;
  let monthlyTotalInterest = 0;
  let monthlyPayoffMonths = 0;
  
  for (let i = 0; i < totalMonths; i++) {
    if (monthlyBalance <= 0) break;
    
    const interestPayment = monthlyBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    monthlyBalance -= principalPayment;
    monthlyTotalInterest += interestPayment;
    monthlyPayoffMonths++;
    
    if (monthlyBalance < 0) monthlyBalance = 0;
  }
  
  // Biweekly payment scenario
  const biweeklyPayment = monthlyPayment / 2;
  const biweeklyRate = interestRate / 100 / 26; // 26 biweekly periods per year
  
  let biweeklyBalance = loanAmount;
  let biweeklyTotalInterest = 0;
  let biweeklyPayoffPayments = 0;
  
  for (let i = 0; i < totalMonths * 2.5; i++) { // Max iterations
    if (biweeklyBalance <= 0) break;
    
    const interestPayment = biweeklyBalance * biweeklyRate;
    const principalPayment = biweeklyPayment - interestPayment;
    
    biweeklyBalance -= principalPayment;
    biweeklyTotalInterest += interestPayment;
    biweeklyPayoffPayments++;
    
    if (biweeklyBalance < 0) biweeklyBalance = 0;
  }
  
  // Convert biweekly payments to months (26 payments per year = 2.17 payments per month)
  const biweeklyPayoffMonths = Math.ceil(biweeklyPayoffPayments / 2.17);
  
  const interestSaved = monthlyTotalInterest - biweeklyTotalInterest;
  const timeSavedMonths = monthlyPayoffMonths - biweeklyPayoffMonths;
  const timeSavedYears = Math.floor(timeSavedMonths / 12);
  
  return {
    monthlyPayment,
    biweeklyPayment,
    monthlyPayoffMonths,
    biweeklyPayoffMonths,
    monthlyTotalInterest,
    biweeklyTotalInterest,
    interestSaved,
    timeSavedMonths,
    timeSavedYears,
  };
};
