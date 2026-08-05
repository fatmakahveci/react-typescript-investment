# Production and preview deployments

## Recommended deployment

Import this repository into Vercel and keep the detected Next.js settings. The included `vercel.json` identifies the framework. Vercel will create a preview deployment for each pull request and publish the production deployment from `main`.

No environment variable is required for the calculator itself.

## Optional error monitoring

Set `NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT` to an HTTPS endpoint that accepts JSON beacon requests. Uncaught browser errors and unhandled promise rejections are sent to that endpoint. If the variable is absent, monitoring remains disabled and no request is made.

The endpoint should apply rate limiting, avoid storing IP addresses unnecessarily, and never place credentials in this public environment variable.

## Quality gates

GitHub Actions runs the following checks before deployment:

1. Unit and component tests
2. Production dependency audit
3. ESLint
4. Production build
5. Playwright flows on desktop and mobile Chromium
6. Lighthouse performance, accessibility, best-practices, and SEO checks

Dependabot checks npm packages weekly and GitHub Actions monthly.
