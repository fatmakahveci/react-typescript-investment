'use client';

import { formatCurrency } from '@/shared/currency';
import { Language, translations } from '@/shared/i18n';
import { InvestmentInput, YearlyData } from '@/shared/types';
import { useState } from 'react';
import './ResultActions.css';

interface Props {
  input: InvestmentInput;
  data: YearlyData[];
  language: Language;
}

const ResultActions = ({ input, data, language }: Props) => {
  const [copied, setCopied] = useState(false);
  const text = translations[language];

  const downloadCsv = () => {
    const headers = [text.year, text.totalSavings, text.interestYear, text.totalInterest, text.investedCapital, text.chartReal];
    const rows = data.map((year) => [year.year, year.savingsEndOfYear, year.yearlyInterest, year.totalInterest, year.investedCapital, year.inflationAdjustedSavings]);
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `investment-projection-${input.currency}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyShareLink = async () => {
    const url = new URL(window.location.href);
    Object.entries(input).forEach(([key, value]) => url.searchParams.set(key, String(value)));
    url.searchParams.set('lang', language);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(text.share, url.toString());
    }
  };

  return (
    <div className="result-actions" aria-label="Result actions">
      <span>{formatCurrency(data.at(-1)?.savingsEndOfYear ?? 0, input.currency)}</span>
      <button type="button" onClick={downloadCsv}>{text.exportCsv}</button>
      <button type="button" onClick={() => window.print()}>{text.printPdf}</button>
      <button type="button" onClick={copyShareLink}>{copied ? text.copied : text.share}</button>
    </div>
  );
};

export default ResultActions;
