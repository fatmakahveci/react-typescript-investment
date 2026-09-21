# Production and preview deployments

## Automated delivery

GitHub Actions runs the `CI` workflow for pull requests, pushes to `main`,
version tags (`v*.*.*`), and manual runs. The `quality` job runs:

1. Unit and component tests
2. Production and development dependency audit
3. ESLint and the production build (including TypeScript checks)
4. Playwright tests against the production server on desktop/mobile Chromium,
   Firefox and WebKit, including accessibility, keyboard, CSV, sharing and error reporting
5. A Docker build and HTTP smoke test of the production container
6. Lighthouse performance, accessibility, best-practices, and SEO checks

Browser and Lighthouse reports are retained as workflow artifacts for seven
days, including when a check fails. New commits cancel outdated pull-request
runs. Runs on `main` and release tags are serialized per ref.

After `quality` passes, the same workflow calls `publish-container.yml` to
publish to GitHub Container Registry. Pull requests never publish images.
Publishing uses the repository's `GITHUB_TOKEN`; no custom registry secret is
required. The image includes provenance and an SBOM.

### Image tags

- Successful `main` runs publish `ghcr.io/fatmakahveci/react-typescript-investment:latest`.
- Every published build receives a `sha-<full-commit-sha>` tag.
- Version tags such as `v1.0.0` publish a matching image tag, provided the commit
  is already part of `main`. Version tags do not replace `latest`.

To retry delivery, rerun the failed CI workflow or select **Actions → CI → Run
workflow** on `main`. The publisher has no independent manual trigger, so the
quality checks cannot be skipped through that workflow.

### Running and rolling back an image

```bash
docker pull ghcr.io/fatmakahveci/react-typescript-investment:latest
docker run --rm -p 3000:3000 ghcr.io/fatmakahveci/react-typescript-investment:latest
```

For a reproducible deployment or rollback, select a known-good `sha-` tag or
image digest from the package history and redeploy it using your hosting
platform. Publishing an image does not automatically replace a container
running on an external server.

## Website hosting

No external hosting credentials are required for container delivery. To host
the website on Vercel, import this repository and use the detected Next.js
settings. The included `vercel.json` identifies the framework. Configure the
Vercel Git integration separately for previews and production deployments;
that integration is not controlled by the container publishing workflow.

No environment variable is required for the calculator itself.

## Error monitoring

Uncaught browser errors and unhandled promise rejections are sent to the same-origin `/api/errors` endpoint by default. Reports are size-limited, sanitized, and written to the server's deployment logs without recording form values.

To use an external monitoring provider later, set `NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT` to an HTTPS endpoint that accepts JSON beacon requests.

The endpoint should apply rate limiting, avoid storing IP addresses unnecessarily, and never place credentials in this public environment variable.

Shared projection query parameters and fragments are excluded from the browser
report URL. Error messages and stacks still need appropriate retention and
access controls in the hosting provider's logs. No external alert destination
has been configured.

## Availability monitoring

The `Availability monitoring` workflow checks `/api/health` and the calculator
page twice an hour when the repository variable `MONITOR_URL` contains the
site's HTTPS origin. It can also be run manually. Without this variable the job
is skipped; no site has been deployed or active uptime monitor claimed.

The workflow fails for HTTP errors, timeouts, unhealthy JSON or a missing
calculator page. Enable GitHub Actions failure notifications in your account
to receive these failures. Scheduled workflows are best-effort and are not an
uptime SLA. External error alert routing requires a hosting/monitoring provider.

## Dependency maintenance

Dependabot checks npm packages weekly and GitHub Actions monthly. Keep the
`quality` and security checks required in branch protection before merging.
