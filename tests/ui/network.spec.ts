import { test, expect } from '../../fixtures/base.test';
import { config } from '../../config/environment.config';
import { AUTH_STATE_PATH } from '../../config/auth.state';

test.describe('Network Interception Tests', () => {
  test.use({
    baseURL: config.UI_BASE_URL,
    storageState: AUTH_STATE_PATH,
  });

  test('Inventory items remain interactive when product images fail to load', async ({
    page,
    inventoryPage,
  }) => {
    await page.route('**/*.jpg', async (route) => {
      await route.abort();
    });

    await page.goto('/inventory.html');
    await inventoryPage.waitForReady();

    await expect(inventoryPage.getHeaderTitle()).toHaveText('Products');

    await inventoryPage.addItemsToCart(['Sauce Labs Backpack']);
    await expect(inventoryPage.getShoppingCartBadge()).toHaveText('1');
  });
});
