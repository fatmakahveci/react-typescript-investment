'use client';

import './Table.css';
import { formatCurrency } from '@/shared/currency';
import { Currency, YearlyData } from '@/shared/types';
import { text } from '@/shared/copy';

interface Props {
    data: YearlyData[];
    currency: Currency;
}

const Table = ({ data, currency }: Props) => {
    return (
        <div className="result-wrapper" role="region" tabIndex={0} aria-label="Investment results, horizontally scrollable on small screens"
            onKeyDown={(event) => {
                if (event.target !== event.currentTarget || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
                event.preventDefault();
                event.currentTarget.scrollLeft += event.key === 'ArrowRight' ? 48 : -48;
            }}>
        <table className="result">
            <caption>{text.tableTitle}</caption>
            <thead>
                <tr>
                    <th scope="col">{text.year}</th>
                    <th scope="col">{text.totalSavings}</th>
                    <th scope="col">{text.interestYear}</th>
                    <th scope="col">{text.totalInterest}</th>
                    <th scope="col">{text.investedCapital}</th>
                    <th scope="col">{text.chartReal}</th>
                </tr>
            </thead>
            <tbody>
                {data.map((yearData) => (
                    <tr key={yearData.year}>
                        <th scope="row">{yearData.year}</th>
                        <td>{formatCurrency(yearData.savingsEndOfYear, currency)}</td>
                        <td>{formatCurrency(yearData.yearlyInterest, currency)}</td>
                        <td>{formatCurrency(yearData.totalInterest, currency)}</td>
                        <td>{formatCurrency(yearData.investedCapital, currency)}</td>
                        <td>{formatCurrency(yearData.inflationAdjustedSavings, currency)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default Table;
