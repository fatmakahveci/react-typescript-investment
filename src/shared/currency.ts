import { Currency } from './types';

export const formatCurrency = (value: number, currency: Currency): string => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency,
  maximumFractionDigits: 2,
}).format(value);
