'use client';

import { InvestmentInput, YearlyData } from '@/shared/types';
import { calculateInvestment, INVESTMENT_ASSUMPTION } from '@/shared/investment';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import { useState } from 'react';

const Home = () => {
  // A null value means that no valid calculation is currently displayed.
  const [formData, setFormData] = useState<InvestmentInput | null>(null);

  const calculateHandler = (formData: InvestmentInput): void => {
    setFormData(formData);
  };

  // The pure calculator keeps financial rules out of the rendering code.
  const yearlyData: YearlyData[] = formData ? calculateInvestment(formData) : [];

  return (
    <>
      <Header />
      <main>
        <Form onCalculate={calculateHandler} onReset={() => setFormData(null)} />
        <p className="assumption">{INVESTMENT_ASSUMPTION}</p>
        {!formData && <p className="paragraph" role="status">Enter your investment details to see a projection.</p>}
        {formData && <Table data={yearlyData} />}
      </main>
    </>
  );
};

export default Home;
