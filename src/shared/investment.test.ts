import { describe, expect, it } from 'vitest';
import { calculateInvestment, validateInvestment } from './investment';

describe('calculateInvestment', () => {
  it('adds contributions at year end and compounds the opening balance', () => {
    const result = calculateInvestment({
      currentSavings: 1000,
      yearlyContribution: 100,
      expectedReturn: 10,
      duration: 2,
    });

    expect(result).toEqual([
      { year: 1, yearlyInterest: 100, savingsEndOfYear: 1200, yearlyContribution: 100, investedCapital: 1100, totalInterest: 100 },
      { year: 2, yearlyInterest: 120, savingsEndOfYear: 1420, yearlyContribution: 100, investedCapital: 1200, totalInterest: 220 },
    ]);
  });

  it('supports a zero-percent return', () => {
    const result = calculateInvestment({
      currentSavings: 500,
      yearlyContribution: 50,
      expectedReturn: 0,
      duration: 2,
    });

    expect(result.at(-1)?.savingsEndOfYear).toBe(600);
  });

  it('rejects invalid input instead of producing misleading results', () => {
    expect(() => calculateInvestment({
      currentSavings: 100,
      yearlyContribution: 10,
      expectedReturn: 5,
      duration: 2.5,
    })).toThrow(RangeError);
  });
});

describe('validateInvestment', () => {
  it('reports negative amounts, out-of-range returns and invalid durations', () => {
    const errors = validateInvestment({
      currentSavings: -1,
      yearlyContribution: -1,
      expectedReturn: 101,
      duration: 0,
    });

    expect(Object.keys(errors)).toHaveLength(4);
  });
});
