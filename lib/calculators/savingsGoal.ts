export interface SavingsGoalInputs {
  goalAmount: number;
  currentSavings: number;
  timeframe: number;
  interestRate: number;
  contributionFrequency: 'monthly' | 'biweekly' | 'weekly';
}

export interface ContributionItem {
  period: number;
  contribution: number;
  interest: number;
  balance: number;
}

export interface Milestone {
  percentage: number;
  period: number;
  amount: number;
}

export interface SavingsGoalResult {
  requiredContribution: number;
  totalContributions: number;
  totalInterest: number;
  finalAmount: number;
  contributionSchedule: ContributionItem[];
  milestones: Milestone[];
}

export const calculateSavingsGoal = (
  inputs: SavingsGoalInputs
): SavingsGoalResult => {
  const { goalAmount, currentSavings, timeframe, interestRate, contributionFrequency } =
    inputs;

  // Determine number of periods per year
  const periodsPerYear = {
    monthly: 12,
    biweekly: 26,
    weekly: 52,
  }[contributionFrequency];

  const totalPeriods = Math.floor((timeframe * periodsPerYear) / 12);
  const periodRate = interestRate / 100 / periodsPerYear;

  // Calculate required periodic contribution using future value of annuity formula
  // FV = PV(1 + r)^n + PMT[((1 + r)^n - 1) / r]
  // Solve for PMT:
  // PMT = (FV - PV(1 + r)^n) / [((1 + r)^n - 1) / r]

  const futureValueOfCurrent = currentSavings * Math.pow(1 + periodRate, totalPeriods);

  let requiredContribution: number;
  if (periodRate === 0) {
    // No interest case
    requiredContribution = (goalAmount - currentSavings) / totalPeriods;
  } else {
    const annuityFactor = (Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate;
    requiredContribution = (goalAmount - futureValueOfCurrent) / annuityFactor;
  }

  // Ensure we're not getting negative contributions
  if (requiredContribution < 0) {
    requiredContribution = 0;
  }

  // Generate contribution schedule
  const contributionSchedule: ContributionItem[] = [];
  let balance = currentSavings;

  for (let i = 1; i <= totalPeriods; i++) {
    const interestEarned = balance * periodRate;
    balance += interestEarned + requiredContribution;

    contributionSchedule.push({
      period: i,
      contribution: requiredContribution,
      interest: interestEarned,
      balance,
    });
  }

  // Calculate milestones
  const milestones: Milestone[] = [25, 50, 75, 100].map((percentage) => {
    const targetAmount = (goalAmount * percentage) / 100;
    const periodReached =
      contributionSchedule.findIndex((item) => item.balance >= targetAmount) + 1;

    return {
      percentage,
      period: periodReached,
      amount: targetAmount,
    };
  });

  const totalContributions = requiredContribution * totalPeriods;
  const finalAmount = contributionSchedule[contributionSchedule.length - 1]?.balance || goalAmount;
  const totalInterest = finalAmount - currentSavings - totalContributions;

  return {
    requiredContribution,
    totalContributions,
    totalInterest,
    finalAmount,
    contributionSchedule,
    milestones,
  };
};
