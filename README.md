# Investment Calculator

A small Next.js and TypeScript application that produces a year-by-year investment projection from an initial balance, annual contribution, expected annual return, and duration.

## Calculation model

Interest is calculated annually from the balance at the beginning of the year. The annual contribution is added at the end of that year and therefore starts earning interest in the following year.

Accepted input ranges:

- Current savings and annual contribution: zero or greater
- Expected annual return: -100% to 100%
- Duration: a whole number from 1 to 100 years

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm test
npm run lint
npm run build
```

Tests use Vitest, jsdom, and React Testing Library. Pull requests and pushes to `main` run all three checks in GitHub Actions.

## Technology

- Next.js App Router
- React and TypeScript
- Plain CSS
