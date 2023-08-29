"use client";

import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import './globals.css';

const Home = ({ }): JSX.Element => {
  const calculateHandler: any = (userInput: any): void => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    const yearlyData: any[] = []; // per-year results

    let currentSavings: number = +userInput["current-savings"]; // feel free to change the shape of this input object!
    const yearlyContribution: number = +userInput["yearly-contribution"]; // as mentioned: feel free to change the shape...
    const expectedReturn: number = +userInput["expected-return"] / 100;
    const duration: number = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i: number = 0; i < duration; i++) {
      const yearlyInterest: number = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution
      });
    }

    // do something with yearlyData ...
  };

  return (
    <div>
      <Header />
      <Form />
      <Table />
    </div>
  );

}

export default Home;
