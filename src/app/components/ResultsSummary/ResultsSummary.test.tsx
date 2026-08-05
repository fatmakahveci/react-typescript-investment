import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ResultsSummary from './ResultsSummary';

describe('ResultsSummary', () => {
  it('formats the final values in the selected currency', () => {
    render(<ResultsSummary language="en" currency="EUR" data={[{
      year: 1,
      yearlyInterest: 50,
      savingsEndOfYear: 1250,
      investedCapital: 1200,
      totalInterest: 50,
      inflationAdjustedSavings: 1213.59,
    }]} />);

    expect(screen.getByText('€1,250.00')).toBeInTheDocument();
    expect(screen.getByText('€1,213.59')).toBeInTheDocument();
  });
});
