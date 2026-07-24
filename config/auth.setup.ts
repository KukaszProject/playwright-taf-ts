import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AUTH_CONFIG } from './environment.config';

const authFile = '.auth/user.json';

setup('Setup authentication', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(AUTH_CONFIG.SAUCE_USERNAME, AUTH_CONFIG.SAUCE_PASSWORD);

  await page.waitForURL(/.*inventory.html/);
  await page.context().storageState({ path: authFile });
});
