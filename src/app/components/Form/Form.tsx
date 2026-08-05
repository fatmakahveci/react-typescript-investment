'use client';

import { FormErrors, validateInvestment } from '@/shared/investment';
import { Language, translations } from '@/shared/i18n';
import { Currency, Frequency, InvestmentInput } from '@/shared/types';
import { FormEvent, useState } from 'react';
import './Form.css';

interface Props {
    onCalculate: (formData: InvestmentInput) => void;
    onReset: () => void;
    language: Language;
    initialValues?: InvestmentInput | null;
}

type FormValues = Record<keyof InvestmentInput, string>;

const INITIAL_FORM_VALUES: FormValues = {
    currentSavings: '',
    contribution: '',
    contributionFrequency: 'monthly',
    expectedReturn: '',
    compoundingFrequency: 'monthly',
    inflationRate: '2.5',
    duration: '',
    currency: 'USD',
};

const parseNumber = (value: string): number => value.trim() === '' ? Number.NaN : Number(value);

const toInvestmentInput = (values: FormValues): InvestmentInput => ({
    currentSavings: parseNumber(values.currentSavings),
    contribution: parseNumber(values.contribution),
    contributionFrequency: values.contributionFrequency as Frequency,
    expectedReturn: parseNumber(values.expectedReturn),
    compoundingFrequency: values.compoundingFrequency as Frequency,
    inflationRate: parseNumber(values.inflationRate),
    duration: parseNumber(values.duration),
    currency: values.currency as Currency,
});

const toFormValues = (values: InvestmentInput): FormValues => Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, String(value)]),
) as FormValues;

const Form = ({ onCalculate, onReset, language, initialValues }: Props) => {
    const [formData, setFormData] = useState<FormValues>(() => initialValues ? toFormValues(initialValues) : INITIAL_FORM_VALUES);
    const [errors, setErrors] = useState<FormErrors>({});
    const text = translations[language];

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const investmentInput = toInvestmentInput(formData);
        const validationErrors = validateInvestment(investmentInput);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            onCalculate(investmentInput);
        }
    };

    const resetHandler = () => {
        setFormData(INITIAL_FORM_VALUES);
        setErrors({});
        onReset();
    };

    const handleChange = (input: keyof InvestmentInput, value: string) => {
        setFormData((previous) => ({ ...previous, [input]: value }));
    };

    const currencySymbol = ({ USD: '$', EUR: '€', GBP: '£', TRY: '₺' } as const)[formData.currency as Currency];
    const localizedContributionLabel = formData.contributionFrequency === 'monthly' ? text.monthlyContribution : text.yearlyContribution;
    const errorText = {
        currentSavings: text.invalidCurrentSavings,
        contribution: text.invalidContribution,
        expectedReturn: text.invalidReturn,
        inflationRate: text.invalidInflation,
        duration: text.invalidDuration,
    };

    return (
        <form onSubmit={submitHandler} onReset={resetHandler} className="form">
            <div className="form__intro">
                <h2>{text.formTitle}</h2>
                <p>{text.formDescription}</p>
            </div>

            <div className="input-group">
                <p>
                    <label htmlFor="currency">{text.currency}</label>
                    <select id="currency" value={formData.currency} onChange={(event) => handleChange('currency', event.target.value)}>
                        <option value="USD">USD — US Dollar</option>
                        <option value="EUR">EUR — Euro</option>
                        <option value="GBP">GBP — British Pound</option>
                        <option value="TRY">TRY — Turkish Lira</option>
                    </select>
                </p>
                <p>
                    <label htmlFor="current-savings">{text.currentSavings} ({currencySymbol})</label>
                    <input id="current-savings" type="number" value={formData.currentSavings} onChange={(event) => handleChange('currentSavings', event.target.value)} placeholder="e.g. 10,000" min="0" step="0.01" required aria-invalid={Boolean(errors.currentSavings)} aria-describedby={errors.currentSavings ? 'current-savings-error' : undefined} />
                    {errors.currentSavings && <span id="current-savings-error" className="error" role="alert">{errorText.currentSavings}</span>}
                </p>
            </div>

            <div className="input-group">
                <p>
                    <label htmlFor="contribution-frequency">{text.contributionFrequency}</label>
                    <select id="contribution-frequency" value={formData.contributionFrequency} onChange={(event) => handleChange('contributionFrequency', event.target.value)}>
                        <option value="monthly">{text.monthly}</option>
                        <option value="yearly">{text.yearly}</option>
                    </select>
                </p>
                <p>
                    <label htmlFor="contribution">{localizedContributionLabel} ({currencySymbol})</label>
                    <input id="contribution" type="number" value={formData.contribution} onChange={(event) => handleChange('contribution', event.target.value)} placeholder={formData.contributionFrequency === 'monthly' ? 'e.g. 200' : 'e.g. 2,400'} min="0" step="0.01" required aria-invalid={Boolean(errors.contribution)} aria-describedby={errors.contribution ? 'contribution-error' : undefined} />
                    {errors.contribution && <span id="contribution-error" className="error" role="alert">{errorText.contribution}</span>}
                </p>
            </div>

            <div className="input-group">
                <p>
                    <label htmlFor="expected-return">{text.expectedReturn}</label>
                    <input id="expected-return" type="number" value={formData.expectedReturn} onChange={(event) => handleChange('expectedReturn', event.target.value)} placeholder="e.g. 7" min="-100" max="100" step="0.01" required aria-invalid={Boolean(errors.expectedReturn)} aria-describedby={errors.expectedReturn ? 'expected-return-error' : undefined} />
                    {errors.expectedReturn && <span id="expected-return-error" className="error" role="alert">{errorText.expectedReturn}</span>}
                </p>
                <p>
                    <label htmlFor="compounding-frequency">{text.compoundingFrequency}</label>
                    <select id="compounding-frequency" value={formData.compoundingFrequency} onChange={(event) => handleChange('compoundingFrequency', event.target.value)}>
                        <option value="monthly">{text.monthly}</option>
                        <option value="yearly">{text.yearly}</option>
                    </select>
                </p>
            </div>

            <div className="input-group">
                <p>
                    <label htmlFor="inflation-rate">{text.inflation}</label>
                    <input id="inflation-rate" type="number" value={formData.inflationRate} onChange={(event) => handleChange('inflationRate', event.target.value)} min="0" max="100" step="0.01" required aria-invalid={Boolean(errors.inflationRate)} aria-describedby={errors.inflationRate ? 'inflation-rate-error' : 'inflation-rate-help'} />
                    <span id="inflation-rate-help" className="field-help">{text.inflationHelp}</span>
                    {errors.inflationRate && <span id="inflation-rate-error" className="error" role="alert">{errorText.inflationRate}</span>}
                </p>
                <p>
                    <label htmlFor="duration">{text.duration}</label>
                    <input id="duration" type="number" value={formData.duration} onChange={(event) => handleChange('duration', event.target.value)} placeholder="e.g. 10" min="1" max="100" step="1" required aria-invalid={Boolean(errors.duration)} aria-describedby={errors.duration ? 'duration-error' : undefined} />
                    {errors.duration && <span id="duration-error" className="error" role="alert">{errorText.duration}</span>}
                </p>
            </div>

            <p className="actions">
                <button type="reset" className="buttonAlt">{text.reset}</button>
                <button type="submit" className="button">{text.calculate}</button>
            </p>
        </form>
    );
};

export default Form;
