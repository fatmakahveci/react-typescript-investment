import { InvestmentInput, YearlyData } from './types';

export type FormErrors = Partial<Record<keyof InvestmentInput, string>>;

// Keep the displayed explanation and the calculation rule in one shared module.
export const INVESTMENT_ASSUMPTION =
  'Contributions are added at the end of each year and start earning interest the following year.';

// Domain validation is independent from the form so every caller applies the same limits.
export const validateInvestment = (values: InvestmentInput): FormErrors => {
  const errors: FormErrors = {};

  if (!Number.isFinite(values.currentSavings) || values.currentSavings < 0) {
    errors.currentSavings = 'Current savings must be zero or greater.';
  }

  if (!Number.isFinite(values.yearlyContribution) || values.yearlyContribution < 0) {
    errors.yearlyContribution = 'Yearly savings must be zero or greater.';
  }

  const expectedReturn = values.expectedReturn;
  if (!Number.isFinite(expectedReturn) || expectedReturn < -100 || expectedReturn > 100) {
    errors.expectedReturn = 'Expected interest must be between -100% and 100%.';
  }

  const duration = values.duration;
  if (!Number.isInteger(duration) || duration < 1 || duration > 100) {
    errors.duration = 'Duration must be a whole number between 1 and 100.';
  }

  return errors;
};

export const calculateInvestment = (values: InvestmentInput): YearlyData[] => {
  const errors = validateInvestment(values);

  if (Object.keys(errors).length > 0) {
    throw new RangeError('Cannot calculate an investment with invalid values.');
  }

  let currentSavings = values.currentSavings;
  const yearlyContribution = values.yearlyContribution;
  const expectedReturn = values.expectedReturn / 100;

  return Array.from({ length: values.duration }, (_, index) => {
    // Interest applies to the opening balance; this year's contribution is added afterwards.
    const yearlyInterest = currentSavings * expectedReturn;
    currentSavings += yearlyInterest + yearlyContribution;
    const investedCapital = values.currentSavings + yearlyContribution * (index + 1);

    return {
      year: index + 1,
      yearlyInterest,
      savingsEndOfYear: currentSavings,
      yearlyContribution,
      investedCapital,
      totalInterest: currentSavings - investedCapital,
    };
  });
};
