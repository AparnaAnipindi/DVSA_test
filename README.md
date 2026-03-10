# MOT API Documentation Automated Test Suite

This project uses Playwright with TypeScript to automate testing of the MOT API documentation website.

## Features
- Verifies quota limits are displayed in the documentation
- Verifies reasons for rejection of application are displayed
- Verifies navigation back to previous pages or homepage works
- Verifies error code MOTH-NP-01 is present and described correctly

## Getting Started

### Install dependencies
```
npm install
```

### Run tests
```
npx playwright test
```


## Project Structure

- `tests/ui/` - UI Playwright test files (one spec per feature)
- `tests/api/` - API Playwright test files
- `pages/` - Page Object Model (POM) classes for UI
- `helpers/` - Custom fixtures, utilities, and authentication helpers
- `data/` - Static test data (e.g., test users)
- `playwright.config.ts` - Playwright configuration

## Conventions
- Use TypeScript for all code (tests, POMs, helpers)
- Use descriptive file and class names
- Group related tests in subfolders
- Store static data in `data/`
- Use POMs for UI test actions
- Document structure and usage in this README

## Website Under Test
[MOT API Documentation](https://documentation.history.mot.api.gov.uk/)

---

Replace or update tests as needed for additional scenarios.
