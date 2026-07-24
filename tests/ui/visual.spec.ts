import { test, expect } from '../../fixtures/base.test';

test.describe('Visual Baseline - logged out - @visual', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Login Page', async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.waitForReady();

    await expect(page).toHaveScreenshot('login-page.png', { fullPage: true });
  });
});

test.describe('Visual Baseline - logged in - @visual', () => {
  test('Inventory Page', async ({ page, inventoryPage }) => {
    await page.goto('/inventory.html');
    await inventoryPage.waitForReady();

    await expect(page).toHaveScreenshot('inventory-page.png', { fullPage: true });
  });

  test('Cart Page', async ({ page, inventoryPage, cartPage }) => {
    await page.goto('/inventory.html');
    await inventoryPage.waitForReady();
    await inventoryPage.addItemsToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await inventoryPage.goToShoppingCart();
    await cartPage.waitForReady();

    await expect(page).toHaveScreenshot('cart-page.png', { fullPage: true });
  });

  test('Checkout Page', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await page.goto('/inventory.html');
    await inventoryPage.waitForReady();
    await inventoryPage.addItemsToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await inventoryPage.goToShoppingCart();
    await cartPage.waitForReady();
    await cartPage.goToCheckout();
    await checkoutPage.waitForReady();

    await expect(page).toHaveScreenshot('checkout-page.png', { fullPage: true });
  });
});
