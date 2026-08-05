import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form from './Form';

describe('Form', () => {
  it('shows validation errors and does not calculate invalid values', () => {
    const onCalculate = vi.fn();
    render(<Form onCalculate={onCalculate} onReset={vi.fn()} />);

    fireEvent.submit(screen.getByRole('button', { name: /calculate/i }).closest('form')!);

    expect(screen.getByText(/duration must be a whole number/i)).toBeInTheDocument();
    expect(onCalculate).not.toHaveBeenCalled();
  });

  it('keeps a cleared number input empty and rejects it on submit', () => {
    const onCalculate = vi.fn();
    render(<Form onCalculate={onCalculate} onReset={vi.fn()} />);

    const savingsInput = screen.getByLabelText(/current savings/i);
    fireEvent.change(savingsInput, { target: { value: '' } });

    expect(savingsInput).toHaveValue(null);
    fireEvent.submit(screen.getByRole('button', { name: /calculate/i }).closest('form')!);
    expect(screen.getByText(/current savings must be zero or greater/i)).toBeInTheDocument();
    expect(onCalculate).not.toHaveBeenCalled();
  });

  it('converts valid form values to numbers before calculating', () => {
    const onCalculate = vi.fn();
    render(<Form onCalculate={onCalculate} onReset={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/current savings/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/yearly savings/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/expected interest/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/investment duration/i), { target: { value: '10' } });
    fireEvent.submit(screen.getByRole('button', { name: /calculate/i }).closest('form')!);

    expect(onCalculate).toHaveBeenCalledWith({
      currentSavings: 1000,
      yearlyContribution: 100,
      expectedReturn: 5,
      duration: 10,
    });
  });

  it('notifies the parent when reset is clicked', () => {
    const onReset = vi.fn();
    render(<Form onCalculate={vi.fn()} onReset={onReset} />);

    fireEvent.click(screen.getByRole('button', { name: /reset/i }));

    expect(onReset).toHaveBeenCalledOnce();
  });
});
