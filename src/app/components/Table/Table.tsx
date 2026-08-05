import './Table.css';
import { formatCurrency } from '@/shared/currency';
import { Currency, YearlyData } from '@/shared/types';
import { Language, translations } from '@/shared/i18n';

interface Props {
    data: YearlyData[];
    currency: Currency;
    language: Language;
}

const Table = ({ data, currency, language }: Props) => {
    const text = translations[language];
    return (
        <div className="result-wrapper" tabIndex={0} aria-label="Investment results, horizontally scrollable on small screens">
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
