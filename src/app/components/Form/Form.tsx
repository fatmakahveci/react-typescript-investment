'use client';

import { InvestmentInput } from '@/shared/types';
import { FormErrors, validateInvestment } from '@/shared/investment';
import { FC, FormEvent, useState } from 'react';
import './Form.css';

interface Props {
    onCalculate: (formData: InvestmentInput) => void;
    onReset: () => void;
}

type FormValues = Record<keyof InvestmentInput, string>;

const INITIAL_FORM_VALUES: FormValues = {
    currentSavings: '',
    yearlyContribution: '',
    expectedReturn: '',
    duration: '',
};

const parseNumber = (value: string): number => value.trim() === '' ? Number.NaN : Number(value);

const toInvestmentInput = (values: FormValues): InvestmentInput => ({
    currentSavings: parseNumber(values.currentSavings),
    yearlyContribution: parseNumber(values.yearlyContribution),
    expectedReturn: parseNumber(values.expectedReturn),
    duration: parseNumber(values.duration),
});

const Form: FC<Props> = ({ onCalculate, onReset }) => {
    // Strings allow number inputs to remain genuinely empty while the user edits them.
    const [formData, setFormData] = useState<FormValues>(INITIAL_FORM_VALUES);
    const [errors, setErrors] = useState<FormErrors>({});

    const submitHandler = (e: FormEvent) => {
        // Keep submission client-side and only publish values after domain validation.
        e.preventDefault();
        const investmentInput = toInvestmentInput(formData);
        const validationErrors = validateInvestment(investmentInput);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        onCalculate(investmentInput);
    };

    const resetHandler = () => {
        setFormData(INITIAL_FORM_VALUES);
        setErrors({});
        // The parent owns the result table, so it must be reset separately.
        onReset();
    };

    const handleChange = (input: keyof InvestmentInput, value: string) => {
        // keyof prevents field names that do not exist in the investment model.
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [input]: value,
            };
        });
    };

    return (
        <form onSubmit={submitHandler} onReset={resetHandler} className="form">
            <div className="input-group">
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    <input
                        type="number"
                        name="current-savings"
                        id="current-savings"
                        placeholder="Enter the value..."
                        value={formData.currentSavings}
                        onChange={(e) => handleChange('currentSavings', e.target.value)}
                        min="0"
                        step="0.01"
                        required
                        aria-invalid={Boolean(errors.currentSavings)}
                        aria-describedby={errors.currentSavings ? 'current-savings-error' : undefined}
                    />
                    {errors.currentSavings && <span id="current-savings-error" className="error" role="alert">{errors.currentSavings}</span>}
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input
                        type="number"
                        name="yearly-contribution"
                        id="yearly-contribution"
                        placeholder="Enter the value..."
                        value={formData.yearlyContribution}
                        onChange={(e) => handleChange('yearlyContribution', e.target.value)}
                        min="0"
                        step="0.01"
                        required
                        aria-invalid={Boolean(errors.yearlyContribution)}
                        aria-describedby={errors.yearlyContribution ? 'yearly-contribution-error' : undefined}
                    />
                    {errors.yearlyContribution && <span id="yearly-contribution-error" className="error" role="alert">{errors.yearlyContribution}</span>}
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label htmlFor="expected-return">Expected Interest (%, per year)</label>
                    <input
                        type="number"
                        name="expected-return"
                        id="expected-return"
                        placeholder="Enter the value..."
                        value={formData.expectedReturn}
                        onChange={(e) => handleChange('expectedReturn', e.target.value)}
                        min="-100"
                        max="100"
                        step="0.01"
                        required
                        aria-invalid={Boolean(errors.expectedReturn)}
                        aria-describedby={errors.expectedReturn ? 'expected-return-error' : undefined}
                    />
                    {errors.expectedReturn && <span id="expected-return-error" className="error" role="alert">{errors.expectedReturn}</span>}
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input
                        type="number"
                        name="duration"
                        id="duration"
                        placeholder="Enter the value..."
                        value={formData.duration}
                        onChange={(e) => handleChange('duration', e.target.value)}
                        min="1"
                        max="100"
                        step="1"
                        required
                        aria-invalid={Boolean(errors.duration)}
                        aria-describedby={errors.duration ? 'duration-error' : undefined}
                    />
                    {errors.duration && <span id="duration-error" className="error" role="alert">{errors.duration}</span>}
                </p>
            </div>
            <p className="actions">
                <button type="reset" className="buttonAlt">
                    Reset
                </button>
                <button type="submit" className="button">
                    Calculate
                </button>
            </p>
        </form>
    );
};

export default Form;
