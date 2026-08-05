import { formatCurrency } from '@/shared/currency';
import { Currency, YearlyData } from '@/shared/types';
import { Language, translations } from '@/shared/i18n';
import './GrowthChart.css';

interface Props {
  data: YearlyData[];
  currency: Currency;
  language: Language;
}

const WIDTH = 800;
const HEIGHT = 280;
const PADDING = 28;

const GrowthChart = ({ data, currency, language }: Props) => {
  if (data.length === 0) return null;

  const maximum = Math.max(...data.flatMap((year) => [year.savingsEndOfYear, year.investedCapital, year.inflationAdjustedSavings]), 1);
  const x = (index: number) => PADDING + (index / Math.max(data.length - 1, 1)) * (WIDTH - PADDING * 2);
  const y = (value: number) => HEIGHT - PADDING - (value / maximum) * (HEIGHT - PADDING * 2);
  const points = (selector: (year: YearlyData) => number) => data.map((year, index) => `${x(index)},${y(selector(year))}`).join(' ');
  const finalYear = data.at(-1)!;
  const text = translations[language];

  return (
    <figure className="chart" aria-labelledby="growth-chart-title growth-chart-description">
      <figcaption>
        <div>
          <h2 id="growth-chart-title">{text.growthTitle}</h2>
          <p id="growth-chart-description">
            {text.projectionAt} {finalYear.year}: {text.balance.toLowerCase()} {formatCurrency(finalYear.savingsEndOfYear, currency)}, {text.capital.toLowerCase()} {formatCurrency(finalYear.investedCapital, currency)}.
          </p>
        </div>
        <ul className="chart__legend" aria-label="Chart legend">
          <li><span className="chart__dot chart__dot--balance" />{text.balance}</li>
          <li><span className="chart__dot chart__dot--capital" />{text.capital}</li>
          <li><span className="chart__dot chart__dot--real" />{text.chartReal}</li>
        </ul>
      </figcaption>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-hidden="true">
        <line x1={PADDING} y1={HEIGHT - PADDING} x2={WIDTH - PADDING} y2={HEIGHT - PADDING} className="chart__axis" />
        <line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} className="chart__axis" />
        <polyline points={points((year) => year.investedCapital)} className="chart__line chart__line--capital" />
        <polyline points={points((year) => year.inflationAdjustedSavings)} className="chart__line chart__line--real" />
        <polyline points={points((year) => year.savingsEndOfYear)} className="chart__line chart__line--balance" />
        <text x={PADDING} y={HEIGHT - 6} className="chart__label">{text.year} 1</text>
        <text x={WIDTH - PADDING} y={HEIGHT - 6} textAnchor="end" className="chart__label">{text.year} {finalYear.year}</text>
      </svg>
    </figure>
  );
};

export default GrowthChart;
