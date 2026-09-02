# Investment Calculator

[![CI](https://github.com/fatmakahveci/react-typescript-investment/actions/workflows/ci.yml/badge.svg)](https://github.com/fatmakahveci/react-typescript-investment/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-React-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE.md)

A Next.js and TypeScript application that produces a year-by-year investment projection with configurable currency, contribution frequency, compounding frequency, and inflation adjustment.

Türkçe kullanım talimatları için [Kullanıcı Rehberi](docs/KULLANICI_REHBERI.md) belgesine bakın.

## Features

- USD, EUR, GBP, and TRY formatting
- Monthly or yearly contributions and compounding
- Inflation-adjusted projections
- Conservative, expected, and optimistic scenario comparison
- English and Turkish interface
- CSV export, print/PDF output, and shareable projection links
- Accessible summary cards, growth chart, and yearly table

Production, preview deployment, monitoring, and quality-gate instructions are in [Production Guide](docs/PRODUCTION.md).

## Calculation model

Returns compound at the selected monthly or yearly frequency. Contributions are added at the end of the selected contribution period. Inflation-adjusted balances show projected purchasing power in today's money.

Accepted input ranges:

- Current savings and contribution: zero or greater
- Expected annual return: -100% to 100%
- Expected annual inflation: 0% to 100%
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
npm run test:e2e
```

Tests use Vitest, jsdom, and React Testing Library. Pull requests and pushes to `main` run all three checks in GitHub Actions.

## Container package

Every push to `main` publishes a production image to GitHub Container Registry. Run the latest image with:

```bash
docker pull ghcr.io/fatmakahveci/react-typescript-investment:latest
docker run --rm -p 3000:3000 ghcr.io/fatmakahveci/react-typescript-investment:latest
```

Then open [http://localhost:3000](http://localhost:3000). Version tags such as `v1.0.0` also publish a matching image tag.

## Technology

- Next.js App Router
- React and TypeScript
- Plain CSS
