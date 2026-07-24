import { test, expect } from '../../fixtures/base.test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests - logged out - @a11y', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Login Page Accessibility', async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.waitForReady();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Accessibility Tests - logged in - @a11y', () => {
  test('Inventory Page Accessibility', async ({ page, inventoryPage }) => {
    await page.goto('/inventory.html');
    await inventoryPage.waitForReady();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Cart Page Accessibility', async ({ page, inventoryPage, cartPage }) => {
    await page.goto('/inventory.html');
    await inventoryPage.waitForReady();
    await inventoryPage.addItemsToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await inventoryPage.goToShoppingCart();
    await cartPage.waitForReady();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Checkout Page Accessibility', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await page.goto('/inventory.html');
    await inventoryPage.waitForReady();
    await inventoryPage.addItemsToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await inventoryPage.goToShoppingCart();
    await cartPage.waitForReady();
    await cartPage.goToCheckout();
    await checkoutPage.waitForReady();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
