export interface DownPaymentInputs {
  homePrice: number;          // target home price
  downPaymentPercent: number; // desired down payment percentage (e.g., 20)
  currentSavings: number;     // already saved toward down payment
  monthlyContribution: number; // how much they can save per month
  annualReturn: number;       // expected annual return % on savings (e.g., 4.5)
}

export interface DownPaymentResult {
  targetDownPayment: number;    // homePrice * downPaymentPercent / 100
  remainingToSave: number;      // targetDownPayment - currentSavings
  monthsToGoal: number;         // months until goal reached (with interest)
  yearsToGoal: number;          // rounded to 1 decimal
  totalContributions: number;   // monthlyContribution * monthsToGoal
  interestEarned: number;       // total interest earned
  monthlyNeeded: number;        // if they want to hit goal in a specific timeframe
  isAlreadyMet: boolean;        // currentSavings >= targetDownPayment
}

export const calculateDownPayment = (inputs: DownPaymentInputs): DownPaymentResult => {
  const targetDownPayment = inputs.homePrice * (inputs.downPaymentPercent / 100);

  if (inputs.currentSavings >= targetDownPayment) {
    return {
      targetDownPayment,
      remainingToSave: 0,
      monthsToGoal: 0,
      yearsToGoal: 0,
      totalContributions: 0,
      interestEarned: 0,
      monthlyNeeded: 0,
      isAlreadyMet: true,
    };
  }

  const monthlyRate = inputs.annualReturn / 100 / 12;
  let balance = inputs.currentSavings;
  let months = 0;

  // Simulate monthly contributions + compound interest
  while (balance < targetDownPayment && months < 600) {
    balance = balance * (1 + monthlyRate) + inputs.monthlyContribution;
    months++;
  }

  const totalContributions = inputs.monthlyContribution * months;
  const interestEarned = balance - inputs.currentSavings - totalContributions;

  return {
    targetDownPayment,
    remainingToSave: targetDownPayment - inputs.currentSavings,
    monthsToGoal: months,
    yearsToGoal: Math.round((months / 12) * 10) / 10,
    totalContributions,
    interestEarned: Math.max(0, interestEarned),
    monthlyNeeded: inputs.monthlyContribution, // included for reference
    isAlreadyMet: false,
  };
};
