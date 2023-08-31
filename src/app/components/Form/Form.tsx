'use client';

import { INITIAL_VALUES } from '@/shared/Constants';
import { FormModel } from '@/shared/types/Types';
import { FormEvent, useState } from 'react';
import './Form.css';

const Form: () => JSX.Element = () => {
    const [formData, setFormData] = useState<FormModel>();

    const submitHandler = (e: FormEvent) => {
        e.preventDefault(); // avoid page reloading
    };

    const resetHandler = () => {
        setFormData(INITIAL_VALUES);
    };

    const handleChange = (input: string, value: string) => {
        setFormData((prevValue: any) => {
            return {
                ...prevValue,
                [input]: +value
            }
        });
    };

    return (
        <form onSubmit={submitHandler} className="form">
            <div className="input-group">
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    <input
                        type="number"
                        name="current-savings"
                        id="current-savings"
                        placeholder="Enter the value..."
                        value={formData?.["current-savings"]}
                        onChange={(e) => handleChange("current-savings", e.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input
                        type="number"
                        name="yearly-contribution"
                        id="yearly-contribution"
                        placeholder="Enter the value..."
                        value={formData?.["yearly-contribution"]}
                        onChange={(e) => handleChange("yearly-contribution", e.target.value)}
                    />
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label htmlFor="expected-return">Expected Interest (%, per year)</label>
                    <input
                        type="number"
                        name="expected-return"
                        id="expected-return"
                        placeholder="Enter the value..."
                        value={formData?.["expected-return"]}
                        onChange={(e) => handleChange("expected-return", e.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input
                        type="number"
                        name="duration"
                        id="duration"
                        placeholder="Enter the value..."
                        value={formData?.["duration"]}
                        onChange={(e) => handleChange("duration", e.target.value)}
                    />
                </p>
            </div>
            <p className="actions">
                <button onClick={resetHandler} type="reset" className="buttonAlt">
                    Reset
                </button>
                <button type="submit" className="button">
                    Calculate
                </button>
            </p>
        </form>
    )
}

export default Form;