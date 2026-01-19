export interface DebtItem {
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface SnowballInputs {
  debts: DebtItem[];
  extraPayment: number;
}

export interface PayoffScheduleItem {
  month: number;
  debtName: string;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface DebtOrderItem {
  debtName: string;
  originalBalance: number;
  payoffMonth: number;
  totalInterest: number;
}

export interface SnowballResult {
  totalDebt: number;
  payoffDate: Date;
  totalInterestPaid: number;
  totalPaid: number;
  monthsToPayoff: number;
  payoffSchedule: PayoffScheduleItem[];
  debtOrder: DebtOrderItem[];
}

export const calculateSnowball = (inputs: SnowballInputs): SnowballResult => {
  // Sort debts by balance (smallest to largest)
  const sortedDebts = [...inputs.debts].sort((a, b) => a.balance - b.balance);
  
  // Initialize tracking arrays
  const debtBalances = sortedDebts.map(d => d.balance);
  const totalInterestByDebt = sortedDebts.map(() => 0);
  const payoffMonthByDebt = sortedDebts.map(() => 0);
  const payoffSchedule: PayoffScheduleItem[] = [];
  
  let currentMonth = 0;
  let totalInterest = 0;
  const startDate = new Date();
  
  // Continue until all debts are paid
  while (debtBalances.some(balance => balance > 0)) {
    currentMonth++;
    
    // Prevent infinite loops (max 1000 months)
    if (currentMonth > 1000) {
      throw new Error('Payment plan exceeds 1000 months. Please increase your payment amount.');
    }
    
    // Calculate which debts are still active
    const activeDebts = debtBalances.map((balance, index) => ({
      index,
      balance,
      debt: sortedDebts[index],
    })).filter(d => d.balance > 0);
    
    if (activeDebts.length === 0) break;
    
    // Find the first active debt (smallest balance)
    const targetDebtIndex = activeDebts[0].index;
    
    // Calculate minimum payments for all debts
    let totalMinimumPayments = 0;
    activeDebts.forEach(({ index }) => {
      totalMinimumPayments += sortedDebts[index].minimumPayment;
    });
    
    // Distribute payments
    activeDebts.forEach(({ index, balance, debt }) => {
      const monthlyRate = (debt.interestRate / 100) / 12;
      const interestCharge = balance * monthlyRate;
      
      let payment: number;
      if (index === targetDebtIndex) {
        // Target debt gets extra payment
        payment = debt.minimumPayment + inputs.extraPayment;
      } else {
        // Other debts get minimum payment
        payment = debt.minimumPayment;
      }
      
      // Don't pay more than the balance + interest
      payment = Math.min(payment, balance + interestCharge);
      
      const principalPayment = payment - interestCharge;
      const newBalance = Math.max(0, balance - principalPayment);
      
      // Update tracking
      debtBalances[index] = newBalance;
      totalInterestByDebt[index] += interestCharge;
      totalInterest += interestCharge;
      
      // Mark payoff month
      if (newBalance === 0 && payoffMonthByDebt[index] === 0) {
        payoffMonthByDebt[index] = currentMonth;
      }
      
      // Add to schedule
      payoffSchedule.push({
        month: currentMonth,
        debtName: debt.name,
        payment,
        principal: principalPayment,
        interest: interestCharge,
        remainingBalance: newBalance,
      });
    });
  }
  
  // Calculate payoff date
  const payoffDate = new Date(startDate);
  payoffDate.setMonth(payoffDate.getMonth() + currentMonth);
  
  // Build debt order array
  const debtOrder: DebtOrderItem[] = sortedDebts.map((debt, index) => ({
    debtName: debt.name,
    originalBalance: debt.balance,
    payoffMonth: payoffMonthByDebt[index],
    totalInterest: totalInterestByDebt[index],
  }));
  
  // Calculate totals
  const totalDebt = inputs.debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalPaid = totalDebt + totalInterest;
  
  return {
    totalDebt,
    payoffDate,
    totalInterestPaid: totalInterest,
    totalPaid,
    monthsToPayoff: currentMonth,
    payoffSchedule,
    debtOrder,
  };
};
