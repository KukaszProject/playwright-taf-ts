import { defineConfig, devices } from '@playwright/test';
import { AUTH_STATE_PATH } from './config/auth.state';
import { config as envConfig } from './config/environment.config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['allure-playwright', { resultsDir: process.env.ALLURE_DIR || 'allure-results' }]],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api-tests',
      testDir: './tests/api',
      use: {
        baseURL: envConfig.API_BASE_URL,
      },
    },
    {
      name: 'setup',
      testDir: './config',
      testMatch: /.*auth\.setup\.ts/,
      use: {
        baseURL: envConfig.UI_BASE_URL,
      },
    },
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_STATE_PATH,
        baseURL: envConfig.UI_BASE_URL,
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Firefox'],
        storageState: AUTH_STATE_PATH,
        baseURL: envConfig.UI_BASE_URL,
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Safari'],
        storageState: AUTH_STATE_PATH,
        baseURL: envConfig.UI_BASE_URL,
      },
      dependencies: ['setup'],
    },
  ],
});
