import { calculateInvestment } from '@/shared/investment';
import { formatCurrency } from '@/shared/currency';
import { Language, translations } from '@/shared/i18n';
import { InvestmentInput } from '@/shared/types';
import './ScenarioComparison.css';

interface Props {
  input: InvestmentInput;
  language: Language;
}

const ScenarioComparison = ({ input, language }: Props) => {
  const text = translations[language];
  const scenarios = [
    { label: text.conservative, rate: Math.max(-100, input.expectedReturn - 2) },
    { label: text.expected, rate: input.expectedReturn },
    { label: text.optimistic, rate: Math.min(100, input.expectedReturn + 2) },
  ];

  return (
    <section className="scenarios" aria-labelledby="scenarios-title">
      <h2 id="scenarios-title">{text.scenarios}</h2>
      <p>{text.scenariosDescription}</p>
      <div className="scenarios__grid">
        {scenarios.map((scenario) => {
          const finalYear = calculateInvestment({ ...input, expectedReturn: scenario.rate }).at(-1)!;
          return (
            <article key={scenario.label}>
              <span>{scenario.label}</span>
              <strong>{formatCurrency(finalYear.savingsEndOfYear, input.currency)}</strong>
              <small>{scenario.rate.toFixed(2)}%</small>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ScenarioComparison;
