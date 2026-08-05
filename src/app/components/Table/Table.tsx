import './Table.css';
import { YearlyData } from '@/shared/types';
import { FC } from 'react';

interface Props {
    data: YearlyData[];
}

const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const Table: FC<Props> = ({ data }) => {
    return (
        <div className="result-wrapper" tabIndex={0} aria-label="Investment results, horizontally scrollable on small screens">
        <table className="result">
            <caption>Year-by-year investment projection</caption>
            <thead>
                <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Total Savings</th>
                    <th scope="col">Interest (Year)</th>
                    <th scope="col">Total Interest</th>
                    <th scope="col">Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {data.map((yearData) => (
                    <tr key={yearData.year}>
                        <th scope="row">{yearData.year}</th>
                        <td>{formatter.format(yearData.savingsEndOfYear)}</td>
                        <td>{formatter.format(yearData.yearlyInterest)}</td>
                        <td>{formatter.format(yearData.totalInterest)}</td>
                        <td>{formatter.format(yearData.investedCapital)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default Table;
