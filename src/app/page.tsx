'use client';

import { calculateInvestment, validateInvestment } from '@/shared/investment';
import { text } from '@/shared/copy';
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

  useEffect(() => {
    const sharedInput = parseSharedInput();
    queueMicrotask(() => {
      if (sharedInput) setFormData(sharedInput);
    });
  }, []);

  const yearlyData: YearlyData[] = formData ? calculateInvestment(formData) : [];

  return (
    <>
      <Header />
      <main className="workspace" id="main-content">
        <div className="workspace__inputs">
          <Form key={formData ? JSON.stringify(formData) : 'empty'} initialValues={formData} onCalculate={setFormData} onReset={() => setFormData(null)} />
          <aside className="assumption" aria-label={text.methodTitle}>
            <strong>{text.methodTitle}</strong>
            <span>{text.method}</span>
          </aside>
        </div>
        <div className="workspace__results" aria-live="polite" aria-atomic="false">
          {!formData ? (
            <section className="welcome" aria-labelledby="welcome-title">
              <span className="section-label">YOUR NEXT CHAPTER</span>
              <h2 id="welcome-title">Small steps.<br /><em>Long-term possibilities.</em></h2>
              <p>Give your goals a clearer picture. Explore how your savings, regular contributions, and time can work together.</p>
              <div className="welcome__visual" aria-hidden="true">
                <span>CONSISTENCY + TIME</span>
                <svg viewBox="0 0 600 160" fill="none">
                  <path d="M0 145H600M0 100H600M0 55H600" stroke="currentColor" strokeDasharray="4 8" opacity=".18" />
                  <path d="M5 145C140 140 230 125 305 100S470 60 595 10" stroke="currentColor" strokeWidth="3" />
                  <path d="M5 145L595 90" stroke="currentColor" strokeWidth="2" opacity=".25" />
                  <circle cx="595" cy="10" r="5" fill="currentColor" />
                </svg>
                <small>Illustration only. Your projection will use the values you enter.</small>
              </div>
              <div className="welcome__steps">
                <div><span>01</span><strong>Set your starting point</strong><p>Enter what you have and what you can add.</p></div>
                <div><span>02</span><strong>Explore the possibilities</strong><p>Compare returns and purchasing power.</p></div>
                <div><span>03</span><strong>Make it your plan</strong><p>Adjust, compare, and save your projection.</p></div>
              </div>
              <div className="welcome__action">
                <button type="button" className="button" onClick={() => setFormData({ currentSavings: 10000, contribution: 250, contributionFrequency: 'monthly', expectedReturn: 7, compoundingFrequency: 'monthly', inflationRate: 2.5, duration: 10, currency: 'USD' })}>Try an example <span aria-hidden="true">↗</span></button>
                <span>$10,000 to start · $250/month · 10 years</span>
              </div>
            </section>
          ) : (
            <>
              <ResultsSummary data={yearlyData} currency={formData.currency} />
              <GrowthChart data={yearlyData} currency={formData.currency} />
              <ScenarioComparison input={formData} />
              <ResultActions input={formData} data={yearlyData} />
              <Table data={yearlyData} currency={formData.currency} />
            </>
          )}
        </div>
      </main>
      <footer className="page-footer"><span>Built for a clearer financial picture.</span><span>Estimates only. Actual returns may vary.</span></footer>
    </>
  );
};

export default Home;
