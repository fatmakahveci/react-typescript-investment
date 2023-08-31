'use client';

import { FormModel, YearlyData } from '@/shared/types/Types';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import { useState } from 'react';
import './globals.css';

const Home = ({ }): JSX.Element => {
  const [formData, setFormData] = useState<FormModel | null>(null);

  const calculateHandler = (formData: FormModel): void => {
    setFormData(formData);
  };

  let yearlyData: YearlyData[] = []; // per-year results

  if (formData) {
    let currentSavings: number = +formData["current-savings"];
    const yearlyContribution: number = +formData["yearly-contribution"];
    const expectedReturn: number = +formData["expected-return"] / 100;
    const duration: number = +formData["duration"];

    // It calculates yearly results (total savings, interest etc)
    for (let i: number = 0; i < duration; i++) {
      const yearlyInterest: number = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;

      yearlyData.push({
        // TODO: Change the shape of pushed object
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }

    // TODO: do something with yearlyData ...
  }

  return (
    <>
      <Header />
      <Form onCalculate={calculateHandler} />
      {!formData && <p>No investment calculated yet!</p>}
      {formData && <Table data={yearlyData} />}
    </>
  );
};

export default Home;
