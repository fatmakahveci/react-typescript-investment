# Security Policy

This policy covers the Investment Calculator application, its dependencies,
and the build and deployment configuration maintained in this repository.

## Supported Versions

Security fixes are maintained on the latest `main` branch. Older commits,
release tags, and container images are not maintained separately. Deployments
should update to a version containing the relevant fix and rebuild their
application or container image.

## Reporting a Vulnerability

Report suspected vulnerabilities through
[GitHub private vulnerability reporting](https://github.com/fatmakahveci/react-typescript-investment/security/advisories/new).
Do not publish exploit details, credentials, or personal information in public
issues, discussions, or pull requests.

If private reporting is unavailable, use the contact options on the
[maintainer's GitHub profile](https://github.com/fatmakahveci) to request a
private reporting channel before sharing sensitive details.

Include the following where available:

- Affected commit, release, dependency version, or deployment.
- A description of the issue, its impact, and any required conditions.
- Minimal reproduction steps or a proof of concept using synthetic data.
- Relevant logs or screenshots with secrets and personal information removed.
- Suggested mitigations or a patch, if available.

Reports do not need to include a proposed fix.

## Review and Disclosure

The maintainer will review the report, investigate reproducible issues, and
coordinate fixes and disclosure through the private reporting channel.
Please allow time for a fix to be evaluated before publishing technical
details. Response and resolution times depend on severity, reproducibility,
and maintainer availability; no fixed response time is guaranteed.

## Responsible Testing

Use a local instance or an environment you control. Do not access another
person's data, disrupt shared services, or perform high-volume testing against
a public deployment without the operator's permission. Stop testing once you
have enough evidence to demonstrate the issue.

Shared projection URLs contain the entered financial values. Use synthetic
values in reports and remove sensitive query parameters from screenshots,
logs, and example URLs.

## Dependency Security

Dependabot checks npm dependencies weekly and GitHub Actions monthly. CI runs
`npm audit --audit-level=high` for both production and development dependencies
and blocks high- or critical-severity findings reported by the registry.

These checks help identify known dependency vulnerabilities; a passing audit
does not guarantee that the application has no security issues. Report
application vulnerabilities privately using the process above.
