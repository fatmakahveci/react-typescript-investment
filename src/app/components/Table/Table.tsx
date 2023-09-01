'use client';

import './Table.css';
import { YearlyData } from '@/shared/types/Types';
import { FC } from 'react';

interface Props {
    data: YearlyData[];
    initialInvestment: number;
};

const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const Table: FC<Props> = ({ data, initialInvestment }): JSX.Element => {
    return (
        <table className="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Total Savings</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {data.map((yearData) => (
                    <tr key={yearData.year}>
                        <td>{yearData.year}</td>
                        <td>{formatter.format(yearData.savingsEndOfYear)}</td>
                        <td>{formatter.format(yearData.yearlyInterest)}</td>
                        <td>{formatter.format(yearData.savingsEndOfYear - initialInvestment - yearData.yearlyContribution * yearData.year)}</td>
                        <td>{formatter.format(initialInvestment + yearData.yearlyContribution * yearData.year)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;