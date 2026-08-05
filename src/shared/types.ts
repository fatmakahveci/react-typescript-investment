export type Currency = 'USD' | 'EUR' | 'GBP' | 'TRY';
export type Frequency = 'monthly' | 'yearly';

export interface InvestmentInput {
  currentSavings: number;
  contribution: number;
  contributionFrequency: Frequency;
  expectedReturn: number;
  compoundingFrequency: Frequency;
  inflationRate: number;
  duration: number;
  currency: Currency;
}

export interface YearlyData {
  year: number;
  yearlyInterest: number;
  savingsEndOfYear: number;
  investedCapital: number;
  totalInterest: number;
  inflationAdjustedSavings: number;
}
