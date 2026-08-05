import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GrowthChart from './GrowthChart';

describe('GrowthChart', () => {
  it('provides a textual summary alongside the visual chart', () => {
    render(<GrowthChart language="en" currency="GBP" data={[{
      year: 1,
      yearlyInterest: 50,
      savingsEndOfYear: 1250,
      investedCapital: 1200,
      totalInterest: 50,
      inflationAdjustedSavings: 1213.59,
    }]} />);

    expect(screen.getByRole('heading', { name: /growth over time/i })).toBeInTheDocument();
    expect(screen.getByText(/£1,250.00/)).toBeInTheDocument();
    expect(screen.getByRole('list', { name: /chart legend/i })).toBeInTheDocument();
  });
});
