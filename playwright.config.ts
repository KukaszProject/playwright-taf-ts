import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

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
        baseURL: 'https://jsonplaceholder.typicode.com',
      },
    },
    {
      name: 'setup',
      testDir: './config',
      testMatch: /.*auth\.setup\.ts/,
      use: {
        baseURL: 'http://www.saucedemo.com',
      },
    },
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
        baseURL: 'http://www.saucedemo.com',
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      testDir: './tests/ui',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: '.auth/user.json',
        baseURL: 'http://www.saucedemo.com',
      },
      dependencies: ['setup']
    },

    {
      name: 'webkit',
      testDir: './tests/ui',
      use: { 
        ...devices['Desktop Safari'],
        storageState: '.auth/user.json',
        baseURL: 'http://www.saucedemo.com',
       },
      
      dependencies: ['setup']
    },

  ],
});
