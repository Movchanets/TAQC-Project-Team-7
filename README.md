# GreenCity E2E Test Framework

A clean, scalable end-to-end testing framework for [GreenCity](https://www.greencity.cx.ua/#/greenCity), built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** design pattern.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env and fill credentials
cp .env.example .env

# 3. Install browsers
npx playwright install

# 4. Run tests
npm test
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://www.greencity.cx.ua/#/greenCity` | Target app URL |
| `LOGIN_EMAIL` | — | Test user email |
| `LOGIN_PASSWORD` | — | Test user password |
| `HEADLESS` | `true` | Run headless |
| `RETRIES` | `0` | Retry count |
| `TIMEOUT` | `30000` | Per-test timeout (ms) |

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

## CI/CD

GitHub Actions workflow (`.github/workflows/playwright.yml`):
- Triggers on push/PR to `main`/`master`
- Runs tests on chromium with `RETRIES=1`
- Generates Allure report with history
- Deploys to GitHub Pages

---

## Iteration Roadmap

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Foundation: POM base, fixtures, auth setup | ✅ Done |
| 2 | Core flows: Login, Home, Eco News, Profile | ✅ Done |
| 3 | News CRUD: Create, Preview, Edit, Delete | ✅ Done |
| 4 | Cross-browser: Firefox, WebKit | 🔄 In Progress |
| 5 | API seeding & teardown for test data | ⏳ Planned |
