import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.TEST_ENV || 'qa';

dotenv.config({ path: path.resolve(__dirname, `.env.${ENV}`) });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['allure-playwright', { resultsDir: process.env.ALLURE_DIR || 'allure-results' }],
  ],
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
        baseURL: process.env.API_BASE_URL,
      },
    },
    {
      name: 'setup',
      testDir: './config',
      testMatch: /.*auth\.setup\.ts/,
      use: {
        baseURL: process.env.UI_BASE_URL,
      },
    },
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
        baseURL: process.env.UI_BASE_URL,
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      testDir: './tests/ui',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: '.auth/user.json',
        baseURL: process.env.UI_BASE_URL,
      },
      dependencies: ['setup']
    },

    {
      name: 'webkit',
      testDir: './tests/ui',
      use: { 
        ...devices['Desktop Safari'],
        storageState: '.auth/user.json',
        baseURL: process.env.UI_BASE_URL,
       },
      
      dependencies: ['setup']
    },

  ],
});
