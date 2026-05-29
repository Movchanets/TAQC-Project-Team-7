# GreenCity E2E Test Automation Framework

Automated end-to-end tests for [GreenCity](https://www.greencity.cx.ua/#/greenCity) platform using **Playwright**, **TypeScript**, and **Allure Report**.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install --with-deps

# 3. Configure environment
cp .env.example .env
# Edit .env with your credentials:
#   BASE_URL=https://www.greencity.cx.ua/#/greenCity
#   LOGIN_EMAIL=your@email.com
#   LOGIN_PASSWORD=yourpassword

# 4. Run tests
npm test
```

## Running Tests

```bash
npm test              # Chromium only (default)
npm run test:all      # All browsers (chromium, firefox, webkit)
npm run test:headed   # With visible browser
npm run test:debug    # Step-by-step debugger
npm run test:ui       # Playwright UI mode
```

## Allure Report

```bash
npm run report        # Generate + open report
npm run report:ci     # Generate only (for CI)
npm run report:open   # Open existing report
```

## Project Structure

```
.
├── tests/
│   ├── auth.setup.ts           # Auth setup — runs once, saves storageState
│   ├── home.spec.ts            # Home page tests
│   ├── profile.spec.ts         # Profile page tests
│   └── createNews.spec.ts      # Create News form tests (TC-01)
│
├── pages/                      # Page Object Model classes
│   ├── base.page.ts            # Abstract base — navigate(), waitForPageReady(), step()
│   ├── home.page.ts
│   ├── login.page.ts
│   ├── createNews.page.ts      # 20+ action methods with Allure steps
│   ├── ecoNews.page.ts
│   ├── profile.page.ts
│   ├── baseNews.page.ts        # Shared base for news detail/preview pages
│   ├── newsPreview.page.ts
│   └── newsDetails.page.ts
│
├── components/                 # Reusable UI component objects
│   ├── base.component.ts       # Abstract base — root locator, waitForReady()
│   └── header.component.ts     # Navigation bar (scoped to <header>)
│
├── fixtures/
│   └── index.ts                # Page object fixtures (test-scoped)
│
├── utils/
│   ├── env.ts                  # Type-safe env loader (dotenv)
│   └── constants.ts            # Shared constants (tags, timeouts, routes)
│
├── test-data/                  # Test fixture files for image upload tests
│
├── playwright.config.ts        # Playwright config with storageState auth
├── tsconfig.json               # TypeScript strict config
└── .github/workflows/
    └── playwright.yml          # CI: tests → Allure report → GitHub Pages
```

## Architecture

### Authentication

Uses Playwright's **storageState** pattern:
1. `auth.setup.ts` logs in once and saves session to `playwright/.auth/user.json`
2. All browser projects load this state automatically via `dependencies: ["setup"]`
3. Tests start already authenticated — no per-test login overhead

### Page Object Model

- **`BasePage`** — abstract base with `navigate()`, `waitForPageReady()`, `step()` (Allure wrapper)
- **`BaseComponent`** — abstract base with `root: Locator` (components scoped to root element, no page reference)
- All page actions wrapped in `this.step()` for detailed Allure reporting

### Cross-Browser Compatibility

- `dispatchEvent('input')` after `fill()` — required for Angular reactive forms on Firefox/WebKit
- `waitForLoadState('load')` instead of `networkidle` — GreenCity has persistent WebSocket (STOMP) connections

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `http://localhost:3000` | GreenCity base URL |
| `LOGIN_EMAIL` | — | Test user email |
| `LOGIN_PASSWORD` | — | Test user password |
| `HEADLESS` | `true` | Run headless |
| `RETRIES` | `0` | Retry count |
| `TIMEOUT` | `30000` | Per-test timeout (ms) |

## CI/CD

GitHub Actions workflow (`.github/workflows/playwright.yml`):
- Triggers on push/PR to `main`/`master`
- Runs tests on chromium with `RETRIES=1`
- Generates Allure report with history
- Deploys to GitHub Pages
