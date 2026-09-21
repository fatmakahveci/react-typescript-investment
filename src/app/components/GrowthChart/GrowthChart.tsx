import { formatCurrency } from '@/shared/currency';
import { Currency, YearlyData } from '@/shared/types';
import { text } from '@/shared/copy';
import './GrowthChart.css';

interface Props {
  data: YearlyData[];
  currency: Currency;
}

const WIDTH = 800;
const HEIGHT = 280;
const PADDING = 28;
const LEFT = 76;

const GrowthChart = ({ data, currency }: Props) => {
  if (data.length === 0) return null;

  const maximum = Math.max(...data.flatMap((year) => [year.savingsEndOfYear, year.investedCapital, year.inflationAdjustedSavings]), 1);
  const x = (index: number) => LEFT + (index / Math.max(data.length - 1, 1)) * (WIDTH - LEFT - PADDING);
  const y = (value: number) => HEIGHT - PADDING - (value / maximum) * (HEIGHT - PADDING * 2);
  const points = (selector: (year: YearlyData) => number) => data.map((year, index) => `${x(index)},${y(selector(year))}`).join(' ');
  const finalYear = data.at(-1)!;

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
        <defs><linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#85e5ba" stopOpacity=".18" /><stop offset="100%" stopColor="#85e5ba" stopOpacity="0" /></linearGradient></defs>
        {[0, .25, .5, .75, 1].map((fraction) => (
          <g key={fraction}>
            <line x1={LEFT} y1={y(maximum * fraction)} x2={WIDTH - PADDING} y2={y(maximum * fraction)} className="chart__grid" />
            <text x={LEFT - 12} y={y(maximum * fraction) + 4} textAnchor="end" className="chart__label">{new Intl.NumberFormat('en-US', { style: 'currency', currency, notation: 'compact', maximumFractionDigits: 1 }).format(maximum * fraction)}</text>
          </g>
        ))}
        <polygon points={`${LEFT},${y(0)} ${points((year) => year.savingsEndOfYear)} ${x(data.length - 1)},${y(0)}`} className="chart__area" />
        <polyline points={points((year) => year.investedCapital)} className="chart__line chart__line--capital" />
        <polyline points={points((year) => year.inflationAdjustedSavings)} className="chart__line chart__line--real" />
        <polyline points={points((year) => year.savingsEndOfYear)} className="chart__line chart__line--balance" />
        <circle cx={x(data.length - 1)} cy={y(finalYear.savingsEndOfYear)} r="4" fill="var(--accent)" />
        <text x={LEFT} y={HEIGHT - 6} className="chart__label">{text.year} 1</text>
        <text x={WIDTH - PADDING} y={HEIGHT - 6} textAnchor="end" className="chart__label">{text.year} {finalYear.year}</text>
      </svg>
    </figure>
  );
};

export default GrowthChart;
