# Playwright TypeScript Testing Framework

A clean, scalable end-to-end testing framework built with **Playwright** and **TypeScript**, following the Page Object Model (POM) design pattern.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

---

## Getting Started

### 1. Initialize the project (first-time setup only)

```bash
npm init playwright@latest
```

> When prompted, choose TypeScript and let it generate the base `playwright.config.ts`. You will then overwrite it with the one in this repository.

### 2. Install dependencies

```bash
npm install
```

Install the `dotenv` package (used by `utils/env.ts`):

```bash
npm install dotenv
npm install --save-dev @types/node
```

### 3. Install Playwright browsers

```bash
npx playwright install --with-deps
```

### 4. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
BASE_URL=http://localhost:3000
HEADLESS=true
RETRIES=0
TIMEOUT=30000
```

---

## Running Tests

### Run all tests (all browsers)

```bash
npx playwright test
```

### Run tests on a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run with the Playwright UI (interactive mode)

```bash
npx playwright test --ui
```

### View the HTML report after a run

```bash
npx playwright show-report
```

---

## Project Structure

```
.
├── .env.example              # Template for environment variables (commit this)
├── .env                      # Actual environment values (DO NOT commit)
├── .gitignore
├── playwright.config.ts      # Playwright configuration (uses utils/env.ts)
├── package.json
│
├── tests/                    # Test spec files (*.spec.ts)
│   └── smoke.spec.ts         # Minimal smoke test to verify the framework runs
│
├── pages/                    # Page Object Model classes
│   └── base.page.ts          # Abstract base class — all page objects extend this
│
├── components/               # Reusable UI component objects
│   └── base.component.ts     # Abstract base class — all components extend this
│
├── fixtures/                 # Custom Playwright fixtures (setup/teardown helpers)
│   └── README.md             # Placeholder — no fixtures in Iteration 1
│
└── utils/                    # Shared utility modules
    └── env.ts                # Type-safe environment variable loader (dotenv)
```

### Directory Purposes

| Directory | Purpose |
|---|---|
| `tests/` | All test specification files. Grouped by feature or user flow. |
| `pages/` | Page Object Model classes. One class per application page/route. |
| `components/` | Reusable component objects for shared UI elements (modals, navbars, forms). |
| `fixtures/` | Custom Playwright `test` extensions for authenticated sessions, DB seeds, etc. |
| `utils/` | Generic helper modules: environment config, API clients, data factories, etc. |

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `BASE_URL` | `http://localhost:3000` | The root URL tests navigate to |
| `HEADLESS` | `true` | Run browsers without a visible window |
| `RETRIES` | `0` | Number of times to retry a failed test |
| `TIMEOUT` | `30000` | Per-test timeout in milliseconds |

---

## Architecture Overview

This framework follows the **Page Object Model (POM)** pattern:

- **`BasePage`** — All page classes inherit from this, receiving a typed `page: Page` reference.
- **`BaseComponent`** — All component classes inherit from this, enabling consistent encapsulation of UI fragments.
- **`ENV`** — A single source of truth for all environment configuration, validated at startup.
- **`playwright.config.ts`** — Centrally configured using `ENV`, ensuring no magic strings are scattered across specs.

### Authentication Strategy (Storage State)
This framework avoids the anti-pattern of logging in via UI before every test. 
Instead, it uses Playwright's **Global Setup** (`tests/auth.setup.ts`). 
The setup script runs once, authenticates via the UI, and saves the browser state (Cookies/LocalStorage) to `playwright/.auth/user.json`. All subsequent E2E tests inject this state, starting fully authenticated and reducing server load and execution time.

---

## Iteration Roadmap

| Iteration | Scope |
|---|---|
| **1 (current)** | Framework foundation: structure, config, stubs, env setup |
| 2 | Page Object implementation for core application pages |
| 3 | Component objects for shared UI elements |
| 4 | Fixtures: authenticated sessions, test data factories |
| 5 | Full E2E test suites for all critical user flows |
