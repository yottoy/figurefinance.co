/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a number as a percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format a date as "Month Year" (e.g., "January 2027")
 */
export const formatMonthYear = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/**
 * Format a date as "Mon YYYY" (e.g., "Jan 2027")
 */
export const formatShortMonthYear = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
};

/**
 * Parse a currency string to a number
 */
export const parseCurrency = (value: string): number => {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  return parseFloat(cleaned) || 0;
};

/**
 * Parse a percentage string to a decimal
 */
export const parsePercentage = (value: string): number => {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const percentage = parseFloat(cleaned) || 0;
  return percentage / 100;
};

/**
 * Format a number with commas
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};
