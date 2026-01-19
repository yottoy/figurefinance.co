/**
 * Validate a positive number
 */
export const validatePositiveNumber = (value: number): string | null => {
  if (isNaN(value) || value <= 0) {
    return 'Please enter a positive number';
  }
  return null;
};

/**
 * Validate a percentage (0-100)
 */
export const validatePercentage = (value: number): string | null => {
  if (isNaN(value) || value < 0 || value > 100) {
    return 'Please enter a percentage between 0 and 100';
  }
  return null;
};

/**
 * Validate a currency amount
 */
export const validateCurrency = (value: number, min: number = 1): string | null => {
  if (isNaN(value) || value < min) {
    return `Please enter an amount of at least $${min}`;
  }
  return null;
};

/**
 * Validate that minimum payment is sufficient
 */
export const validateMinimumPayment = (
  balance: number,
  interestRate: number,
  minimumPayment: number
): string | null => {
  const monthlyInterest = (balance * (interestRate / 100)) / 12;
  if (minimumPayment <= monthlyInterest) {
    return `Monthly payment must be greater than the interest charge of ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlyInterest)}`;
  }
  return null;
};
