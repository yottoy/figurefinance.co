export interface ConsolidationDebt {
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface ConsolidationInputs {
  debts: ConsolidationDebt[];
  newLoanRate: number;   // APR for the consolidation loan
  newLoanTerm: number;   // months
}

export interface ConsolidationResult {
  totalDebt: number;
  currentMonthlyPayment: number;       // sum of all current minimum payments
  newMonthlyPayment: number;           // payment on the consolidation loan
  currentTotalInterest: number;        // total interest if paying current minimums to payoff
  newTotalInterest: number;            // total interest on consolidation loan
  interestSaved: number;               // positive = savings, negative = costs more
  currentPayoffMonths: number;         // months to pay off all debts at current minimums
  worthConsolidating: boolean;         // true if consolidation saves money
}

export const calculateConsolidation = (inputs: ConsolidationInputs): ConsolidationResult => {
  const totalDebt = inputs.debts.reduce((sum, d) => sum + d.balance, 0);
  const currentMonthlyPayment = inputs.debts.reduce((sum, d) => sum + d.minimumPayment, 0);

  // Calculate how long to pay off current debts at minimums, and total interest
  // For each debt, simulate paying minimums (we'll assume min payment is fixed for simplicity)
  let currentTotalInterest = 0;
  let maxMonths = 0;
  for (const debt of inputs.debts) {
    const monthlyRate = debt.interestRate / 100 / 12;
    let balance = debt.balance;
    let months = 0;
    while (balance > 0.01 && months < 1200) {
      const interest = balance * monthlyRate;
      currentTotalInterest += interest;
      balance = balance - (debt.minimumPayment - interest);
      if (balance < 0) balance = 0;
      months++;
    }
    if (months > maxMonths) maxMonths = months;
  }

  // Calculate new consolidation loan payment (standard amortization)
  const monthlyRate = inputs.newLoanRate / 100 / 12;
  let newMonthlyPayment: number;
  if (monthlyRate === 0) {
    newMonthlyPayment = totalDebt / inputs.newLoanTerm;
  } else {
    newMonthlyPayment = totalDebt * (monthlyRate * Math.pow(1 + monthlyRate, inputs.newLoanTerm))
      / (Math.pow(1 + monthlyRate, inputs.newLoanTerm) - 1);
  }

  const newTotalInterest = (newMonthlyPayment * inputs.newLoanTerm) - totalDebt;
  const interestSaved = currentTotalInterest - newTotalInterest;

  return {
    totalDebt,
    currentMonthlyPayment,
    newMonthlyPayment,
    currentTotalInterest,
    newTotalInterest,
    interestSaved,
    currentPayoffMonths: maxMonths,
    worthConsolidating: interestSaved > 0,
  };
};
