export interface InvestmentInput {
  currentSavings: number;
  yearlyContribution: number;
  expectedReturn: number;
  duration: number;
}

export interface YearlyData {
  year: number;
  yearlyInterest: number;
  savingsEndOfYear: number;
  yearlyContribution: number;
  investedCapital: number;
  totalInterest: number;
}
