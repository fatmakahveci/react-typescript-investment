'use client';

import { calculateInvestment, validateInvestment } from '@/shared/investment';
import { Language, translations } from '@/shared/i18n';
import { Currency, Frequency, InvestmentInput, YearlyData } from '@/shared/types';
import { useEffect, useState } from 'react';
import Form from './components/Form/Form';
import GrowthChart from './components/GrowthChart/GrowthChart';
import Header from './components/Header/Header';
import ResultActions from './components/ResultActions/ResultActions';
import ResultsSummary from './components/ResultsSummary/ResultsSummary';
import ScenarioComparison from './components/ScenarioComparison/ScenarioComparison';
import Table from './components/Table/Table';

const parseSharedInput = (): InvestmentInput | null => {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('currentSavings')) return null;

  const input: InvestmentInput = {
    currentSavings: Number(params.get('currentSavings')),
    contribution: Number(params.get('contribution')),
    contributionFrequency: params.get('contributionFrequency') as Frequency,
    expectedReturn: Number(params.get('expectedReturn')),
    compoundingFrequency: params.get('compoundingFrequency') as Frequency,
    inflationRate: Number(params.get('inflationRate')),
    duration: Number(params.get('duration')),
    currency: params.get('currency') as Currency,
  };

  return Object.keys(validateInvestment(input)).length === 0 ? input : null;
};

const Home = () => {
  const [formData, setFormData] = useState<InvestmentInput | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const text = translations[language];

  useEffect(() => {
    const sharedInput = parseSharedInput();
    const sharedLanguage = new URLSearchParams(window.location.search).get('lang');
    queueMicrotask(() => {
      if (sharedInput) setFormData(sharedInput);
      if (sharedLanguage === 'tr' || sharedLanguage === 'en') setLanguage(sharedLanguage);
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const yearlyData: YearlyData[] = formData ? calculateInvestment(formData) : [];

  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />
      <main>
        <Form key={formData ? JSON.stringify(formData) : 'empty'} language={language} initialValues={formData} onCalculate={setFormData} onReset={() => setFormData(null)} />
        <aside className="assumption" aria-label={text.methodTitle}>
          <strong>{text.methodTitle}</strong>
          <span>{text.method}</span>
        </aside>
        {!formData && (
          <div className="empty-state" role="status">
            <span aria-hidden="true">↗</span>
            <p>{text.empty}</p>
          </div>
        )}
        {formData && (
          <>
            <ResultActions input={formData} data={yearlyData} language={language} />
            <ResultsSummary data={yearlyData} currency={formData.currency} language={language} />
            <ScenarioComparison input={formData} language={language} />
            <GrowthChart data={yearlyData} currency={formData.currency} language={language} />
            <Table data={yearlyData} currency={formData.currency} language={language} />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
