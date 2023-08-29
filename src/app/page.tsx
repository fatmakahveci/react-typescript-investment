"use client";

import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import './globals.css';

type YearlyData = {
  year: number,
  yearlyInterest: number,
  savingsEndOfYear: number,
  yearlyContribution: number
};

const Home = ({ }): JSX.Element => {
  const calculateHandler: any = (userInput: any): void => {
    // TODO: Should be triggered when form is submitted
    // TODO: You might not directly want to bind it to the submit event on the form though...

    const yearlyData: YearlyData[] = []; // per-year results

    // TODO: Change the shape of input object
    let currentSavings: number = +userInput["current-savings"];

    // TODO: Change the shape of input object
    const yearlyContribution: number = +userInput["yearly-contribution"];

    const expectedReturn: number = +userInput["expected-return"] / 100;
    const duration: number = +userInput["duration"];

    // It calculates yearly results (total savings, interest etc)
    for (let i: number = 0; i < duration; i++) {
      const yearlyInterest: number = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;

      // TODO: Change the shape of pushed object
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution
      });
    }

    // TODO: do something with yearlyData ...
  };

  return (
    <>
      <Header />
      <Form />
      <Table />
    </>
  );
}

export default Home;