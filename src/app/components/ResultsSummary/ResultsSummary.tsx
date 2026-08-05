import { formatCurrency } from '@/shared/currency';
import { Currency, YearlyData } from '@/shared/types';
import { Language, translations } from '@/shared/i18n';
import './ResultsSummary.css';

interface Props {
  data: YearlyData[];
  currency: Currency;
  language: Language;
}

const ResultsSummary = ({ data, currency, language }: Props) => {
  const finalYear = data.at(-1);
  const text = translations[language];

  if (!finalYear) return null;

  return (
    <section className="summary" aria-labelledby="summary-title">
      <div className="summary__heading">
        <p>{text.projectionAt} {finalYear.year}</p>
        <h2 id="summary-title">{text.snapshot}</h2>
      </div>
      <dl className="summary__cards">
        <div>
          <dt>{text.finalBalance}</dt>
          <dd>{formatCurrency(finalYear.savingsEndOfYear, currency)}</dd>
        </div>
        <div>
          <dt>{text.investedCapital}</dt>
          <dd>{formatCurrency(finalYear.investedCapital, currency)}</dd>
        </div>
        <div>
          <dt>{text.totalReturn}</dt>
          <dd className={finalYear.totalInterest < 0 ? 'summary__negative' : 'summary__positive'}>
            {formatCurrency(finalYear.totalInterest, currency)}
          </dd>
        </div>
        <div>
          <dt>{text.todaysMoney}</dt>
          <dd>{formatCurrency(finalYear.inflationAdjustedSavings, currency)}</dd>
        </div>
      </dl>
    </section>
  );
};

export default ResultsSummary;
