import { mkdirSync } from 'fs';
import path from 'path';
import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AUTH_CONFIG } from './environment.config';
import { AUTH_STATE_PATH } from './auth.state';

setup('Setup authentication state', async ({ page }) => {
  mkdirSync(path.dirname(AUTH_STATE_PATH), { recursive: true });

  const loginPage = new LoginPage(page);

  try {
    await loginPage.navigate();
    await loginPage.login(AUTH_CONFIG.SAUCE_USERNAME, AUTH_CONFIG.SAUCE_PASSWORD);

    await page.waitForURL(/.*inventory\.html/, { timeout: 15000 });

    await page.context().storageState({ path: AUTH_STATE_PATH });
  } catch (error) {
    const errorMessage = await loginPage
      .getErrorMessage()
      .textContent()
      .catch(() => null);
    const details = errorMessage?.trim() ? ` SauceDemo displayed: ${errorMessage.trim()}` : '';
    const cause = error instanceof Error ? error.message : String(error);

    throw new Error(
      `Authentication setup failed while creating ${AUTH_STATE_PATH}.${details} Original error: ${cause}`,
    );
  }
});
