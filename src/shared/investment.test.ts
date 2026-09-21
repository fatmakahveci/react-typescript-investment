import { describe, expect, it } from 'vitest';
import { calculateInvestment, validateInvestment } from './investment';
import { InvestmentInput } from './types';

const baseInput: InvestmentInput = {
  currentSavings: 1000,
  contribution: 100,
  contributionFrequency: 'yearly',
  expectedReturn: 10,
  compoundingFrequency: 'yearly',
  inflationRate: 0,
  duration: 2,
  currency: 'USD',
};

describe('calculateInvestment', () => {
  it('reduces savings with negative returns and no contributions', () => {
    const result = calculateInvestment({ ...baseInput, contribution: 0, expectedReturn: -10 });
    expect(result[1].savingsEndOfYear).toBeCloseTo(810, 8);
    expect(result[1].totalInterest).toBeCloseTo(-190, 8);
    expect(result[1].investedCapital).toBe(1000);
  });

  it('handles complete annual loss before the end-of-year contribution', () => {
    const result = calculateInvestment({ ...baseInput, expectedReturn: -100 });
    expect(result.map((row) => row.savingsEndOfYear)).toEqual([100, 100]);
  });

  it('keeps an empty portfolio at zero for 100 years', () => {
    const result = calculateInvestment({ ...baseInput, currentSavings: 0, contribution: 0, duration: 100 });
    expect(result).toHaveLength(100);
    expect(result.every((row) => row.savingsEndOfYear === 0 && row.totalInterest === 0)).toBe(true);
  });

  it('matches the compound-interest formula over 100 years without contributions', () => {
    const final = calculateInvestment({ ...baseInput, contribution: 0, duration: 100, expectedReturn: 7, inflationRate: 3 }).at(-1)!;
    expect(final.savingsEndOfYear).toBeCloseTo(1000 * 1.07 ** 100, 4);
    expect(final.inflationAdjustedSavings).toBeCloseTo(1000 * (1.07 / 1.03) ** 100, 4);
  });

  it.each([Number.NaN, Infinity, -Infinity])('rejects non-finite savings: %s', (currentSavings) => {
    expect(() => calculateInvestment({ ...baseInput, currentSavings })).toThrow(RangeError);
  });
  it('adds yearly contributions after applying the yearly return', () => {
    const result = calculateInvestment(baseInput);

    expect(result).toEqual([
      { year: 1, yearlyInterest: 100, savingsEndOfYear: 1200, investedCapital: 1100, totalInterest: 100, inflationAdjustedSavings: 1200 },
      { year: 2, yearlyInterest: 120, savingsEndOfYear: 1420, investedCapital: 1200, totalInterest: 220, inflationAdjustedSavings: 1420 },
    ]);
  });

  it('supports monthly contributions and monthly compounding', () => {
    const result = calculateInvestment({
      ...baseInput,
      contribution: 10,
      contributionFrequency: 'monthly',
      expectedReturn: 12,
      compoundingFrequency: 'monthly',
      duration: 1,
    });

    expect(result[0].investedCapital).toBe(1120);
    expect(result[0].savingsEndOfYear).toBeCloseTo(1253.65, 2);
  });

  it('shows the ending balance in today\'s purchasing power', () => {
    const result = calculateInvestment({ ...baseInput, inflationRate: 10, duration: 1 });

    expect(result[0].inflationAdjustedSavings).toBeCloseTo(1090.91, 2);
  });

  it('supports a zero-percent return', () => {
    const result = calculateInvestment({ ...baseInput, currentSavings: 500, contribution: 50, expectedReturn: 0 });

    expect(result.at(-1)?.savingsEndOfYear).toBe(600);
  });

  it('rejects invalid input instead of producing misleading results', () => {
    expect(() => calculateInvestment({ ...baseInput, duration: 2.5 })).toThrow(RangeError);
  });
});

describe('validateInvestment', () => {
  it('reports invalid amounts, returns, inflation and duration', () => {
    const errors = validateInvestment({
      ...baseInput,
      currentSavings: -1,
      contribution: -1,
      expectedReturn: 101,
      inflationRate: 101,
      duration: 0,
    });

    expect(Object.keys(errors)).toHaveLength(5);
  });
});
