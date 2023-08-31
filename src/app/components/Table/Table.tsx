'use client';

import './Table.css';
import { YearlyData } from '@/shared/types/Types';
import { FC } from 'react';

interface Props {
    data: YearlyData[];
};

const Table: FC<Props> = ({ data }): JSX.Element => {
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
                <tr>
                    <td>YEAR NUMBER</td>
                    <td>TOTAL SAVINGS END OF YEAR</td>
                    <td>INTEREST GAINED IN YEAR</td>
                    <td>TOTAL INTEREST GAINED</td>
                    <td>TOTAL INVESTED CAPITAL</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table;