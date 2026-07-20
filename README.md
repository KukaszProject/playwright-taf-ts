# Playwright TAF TS

Senior-level TypeScript Playwright automation framework for the SauceDemo application.

[![View Latest Test Report](https://img.shields.io/badge/View%20Latest%20Test%20Report-Live%20Playwright%20Report-0f766e?style=for-the-badge)](https://kukaszproject.github.io/playwright-taf-ts/)

The project is organized around the Page Object Model, reusable fixtures, and domain-specific test data. It covers functional end-to-end flows, accessibility checks, and visual regression coverage across Chromium, Firefox, and WebKit.

## Tech Stack

- Playwright Test
- TypeScript
- Axe accessibility scanning with `@axe-core/playwright`
- Faker for dynamic test data
- dotenv for environment configuration

## Repository Structure

| Path | Purpose |
| --- | --- |
| `components/` | Shared UI building blocks used by page objects. |
| `config/` | Authentication bootstrap and test setup. |
| `data/` | Test data for users, catalog items, and checkout payloads. |
| `fixtures/` | Custom fixtures that expose page objects to tests. |
| `pages/` | Page Object Model layer for login, inventory, cart, and checkout. |
| `tests/` | Functional, accessibility, end-to-end, and visual regression specs. |
| `playwright-report/` | Latest HTML report and trace artifacts from the pipeline. |
| `test-results/` | Execution artifacts, failure context, screenshots, and videos. |
| `.auth/` | Persisted authenticated storage state used by browser projects. |

## Test Design

- Tests stay thin and describe business intent.
- Page objects own selectors and UI actions.
- Fixtures compose the page objects into the test layer.
- Data files centralize inputs instead of hard-coding values in specs.
- The setup project prepares authenticated state before browser projects run.

## CI Pipeline

The GitHub Actions workflow is defined in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).

It performs these steps:

- installs dependencies
- installs Playwright browsers
- runs functional tests with `--grep-invert "@a11y|@visual"`
- runs non-functional tests with `--grep "@a11y|@visual"`
- uploads the Playwright HTML report as a pipeline artifact
- publishes the same report to GitHub Pages for live browser access

## Latest CI Result Snapshot

[![View Latest Test Report](https://img.shields.io/badge/View_Latest_Report-Playwright_HTML-2EAD33?logo=playwright&logoColor=white)](https://KukaszProject.github.io/playwright-taf-ts/)

The latest captured run shows 12 accessibility failures across 4 pages and 3 browsers. The reported issues are consistent across the suite: missing main landmark, missing level-one heading, and page content not fully contained by landmarks.

## Running Locally

Run the full suite directly with Playwright:

```bash
npx playwright test
```

Useful commands:

```bash
npx playwright test tests/login.spec.ts
npx playwright test --project=chromium
npx playwright test --grep @a11y
npx playwright test --grep @visual
npx playwright show-report
```

## Working Notes

- Keep page object APIs intention-revealing and stable.
- Prefer reusable fixtures over repeated setup in individual specs.
- Keep test data in `data/` rather than inlined in test bodies.
- Refresh the CI snapshot section after a new pipeline run if you want the README to reflect the latest status.
