import { InvestmentInput, YearlyData } from './types';

export type FormErrors = Partial<Record<keyof InvestmentInput, string>>;

// Keep the displayed explanation and the calculation rule in one shared module.
export const INVESTMENT_ASSUMPTION =
  'Contributions are added at the end of each selected period. Returns compound monthly or yearly, and inflation-adjusted values are shown in today\'s purchasing power.';

// Domain validation is independent from the form so every caller applies the same limits.
export const validateInvestment = (values: InvestmentInput): FormErrors => {
  const errors: FormErrors = {};

  if (!Number.isFinite(values.currentSavings) || values.currentSavings < 0) {
    errors.currentSavings = 'Current savings must be zero or greater.';
  }

  if (!Number.isFinite(values.contribution) || values.contribution < 0) {
    errors.contribution = 'Contribution must be zero or greater.';
  }

  const expectedReturn = values.expectedReturn;
  if (!Number.isFinite(expectedReturn) || expectedReturn < -100 || expectedReturn > 100) {
    errors.expectedReturn = 'Expected interest must be between -100% and 100%.';
  }

  const duration = values.duration;
  if (!Number.isInteger(duration) || duration < 1 || duration > 100) {
    errors.duration = 'Duration must be a whole number between 1 and 100.';
  }

  if (!Number.isFinite(values.inflationRate) || values.inflationRate < 0 || values.inflationRate > 100) {
    errors.inflationRate = 'Inflation must be between 0% and 100%.';
  }

  if (!['monthly', 'yearly'].includes(values.contributionFrequency)) {
    errors.contributionFrequency = 'Contribution frequency is invalid.';
  }

  if (!['monthly', 'yearly'].includes(values.compoundingFrequency)) {
    errors.compoundingFrequency = 'Compounding frequency is invalid.';
  }

  if (!['USD', 'EUR', 'GBP', 'TRY'].includes(values.currency)) {
    errors.currency = 'Currency is invalid.';
  }

  return errors;
};

export const calculateInvestment = (values: InvestmentInput): YearlyData[] => {
  const errors = validateInvestment(values);

  if (Object.keys(errors).length > 0) {
    throw new RangeError('Cannot calculate an investment with invalid values.');
  }

  let balance = values.currentSavings;
  let investedCapital = values.currentSavings;
  const annualReturn = values.expectedReturn / 100;
  const inflationRate = values.inflationRate / 100;
  const periodsPerYear = values.compoundingFrequency === 'monthly' ? 12 : 1;
  const periodicReturn = annualReturn / periodsPerYear;

  return Array.from({ length: values.duration }, (_, index) => {
    let yearlyInterest = 0;

    for (let period = 1; period <= periodsPerYear; period += 1) {
      const periodInterest = balance * periodicReturn;
      balance += periodInterest;
      yearlyInterest += periodInterest;

      const shouldContribute = values.contributionFrequency === 'monthly'
        ? true
        : period === periodsPerYear;
      const contributionAmount = values.contributionFrequency === 'monthly' && values.compoundingFrequency === 'yearly'
        ? values.contribution * 12
        : values.contribution;

      if (shouldContribute) {
        balance += contributionAmount;
        investedCapital += contributionAmount;
      }
    }

    const year = index + 1;

    return {
      year,
      yearlyInterest,
      savingsEndOfYear: balance,
      investedCapital,
      totalInterest: balance - investedCapital,
      inflationAdjustedSavings: balance / ((1 + inflationRate) ** year),
    };
  });
};
