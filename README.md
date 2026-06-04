# GreenCity E2E Test Framework

A clean, scalable end-to-end testing framework for [GreenCity](https://www.greencity.cx.ua), built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** design pattern.

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
| `BASE_URL` | `https://www.greencity.cx.ua` | Target app URL (no hash) |
| `LOGIN_EMAIL` | — | Test user email |
| `LOGIN_PASSWORD` | — | Test user password |
| `HEADLESS` | `true` | Run headless |
| `RETRIES` | `0` | Retry count |
| `TIMEOUT` | `30000` | Per-test timeout (ms) |

## Architecture Overview

This framework follows the **Page Object Model (POM)** pattern:

- **`BasePage`** — All page classes inherit from this, receiving a typed `page: Page` reference. Handles navigation (`origin + pathname + this.url`), readiness checks, and Allure step logging.
- **`BaseComponent`** — All component classes inherit from this, enabling consistent encapsulation of UI fragments (header, footer, modals).
- **`ENV`** — A single source of truth for all environment configuration, validated at startup.
- **`playwright.config.ts`** — Centrally configured using `ENV`, ensuring no magic strings are scattered across specs.

### Project Structure

```
├── pages/                  # Page Objects
│   ├── base.page.ts        # Abstract base (navigation, waits, Allure steps)
│   ├── createNews.page.ts  # Create News form (fields, buttons, modals)
│   ├── ecoNews.page.ts     # Eco News listing (create button, news items)
│   ├── home.page.ts        # Landing page
│   ├── login.page.ts       # Login modal
│   ├── profile.page.ts     # User profile
│   ├── newsPreview.page.ts # News preview
│   └── newsDetails.page.ts # News details
├── components/             # Reusable UI components
│   ├── base.component.ts   # Abstract base component
│   └── header.component.ts # Site header (nav, auth state)
├── fixtures/               # Playwright fixtures (page object DI)
│   └── index.ts            # AppFixtures: test-scoped page objects
├── tests/                  # Test specs
│   ├── auth.setup.ts       # Global auth setup (runs once, saves storageState)
│   ├── createNews.spec.ts  # TC-01 (form layout), TC-03 (publish & tags)
│   ├── cancelNews.spec.ts  # TC-07 (cancel confirmation modal)
│   ├── home.spec.ts        # Home page tests
│   ├── login.spec.ts       # Login tests
│   └── profile.spec.ts     # Profile tests
├── utils/                  # Shared utilities
│   ├── env.ts              # Environment config loader
│   └── constants.ts        # Tags, timeouts, routes, messages
└── .github/workflows/
    └── playwright.yml      # CI/CD pipeline
```

### Authentication Strategy (Storage State)

This framework avoids the anti-pattern of logging in via UI before every test.
Instead, it uses Playwright's **Global Setup** (`tests/auth.setup.ts`).
The setup script runs once, authenticates via the UI, and saves the browser state (Cookies/LocalStorage) to `playwright/.auth/user.json`. All subsequent E2E tests inject this state, starting fully authenticated and reducing server load and execution time.

### Navigation

`BasePage.navigate()` constructs URLs from `ENV.BASE_URL` origin + pathname + the page's `this.url` route. This avoids issues with hash-based routing when `BASE_URL` contains a hash fragment.

---

## CI/CD

GitHub Actions workflow (`.github/workflows/playwright.yml`):
- Triggers on push/PR to `main`/`master`
- Runs tests on **chromium** with `RETRIES=1`
- Uploads `test-results/` and `playwright-report/` as artifacts (7-day retention)
- Generates Allure report with history (preserved via `keep_files: true`)
- Deploys to GitHub Pages

---

## Test Coverage

| TC | Description | File |
|----|-------------|------|
| TC-01 | Create News form layout, field order, tags, counters. | `TC-01.spec.ts` |
| TC-02 | Title field validation and Publish button state. | `TC-02.spec.ts` |
| TC-03 | Publish news with 1/3 tags, 4th tag blocked. | `TC-03.spec.ts` |
| TC-05 | "Main Text" field validation (min 20, max 63206 chars) and truncation. | `TC-05.spec.ts` |
| TC-07 | Cancel confirmation modal (Yes, cancel / Continue editing). | `TC-07.spec.ts` |
| TC-08 | Preview page displays entered content, dynamic date/author, and "Back to editing" link. | `TC-08.spec.ts` |
| TC-09 | Verify "Edit news" button is visible to the author of the published news post. | `TC-09.spec.ts` |
| TC-10 | Author can edit their own news post; original creation date remains unchanged. | `TC-10.spec.ts` |
| —  | Home page, Login behavior, Profile layout, and basic navigation. | `home.spec.ts`, `login.spec.ts`, `profile.spec.ts` |
| —  | Global Auth Setup (UI login and storageState extraction). | `auth.setup.ts` |
---

## Iteration Roadmap

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Foundation: POM base, fixtures, auth setup | ✅ Done |
| 2 | Core flows: Login, Home, Eco News, Profile | ✅ Done |
| 3 | News CRUD: Create, Preview, Edit, Delete | ✅ Done |
| 4 | Cross-browser: Firefox, WebKit | 🔄 In Progress |
| 5 | API seeding & teardown for test data | ⏳ Planned |
