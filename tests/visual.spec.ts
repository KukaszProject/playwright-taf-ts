import { test, expect } from '../fixtures/base.test';

test.describe('Visual Baseline - logged out - @visual', () => {
    test.use({ storageState: {cookies: [], origins: []} });

    test('Login Page', async ({page}) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('login-page.png', {fullPage: true});
    });
});

test.describe('Visual Baseline - logged in - @visual', () => {
    test('Inventory Page', async ({page}) => {
        await page.goto('/inventory.html');
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('inventory-page.png', {fullPage: true});
    });

    test('Cart Page', async ({page, inventoryPage}) => {
        await page.goto('/inventory.html');
        await inventoryPage.addItemsToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
        await inventoryPage.goToShoppingCart();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('cart-page.png', {fullPage: true});
    });

    test('Checkout Page', async ({page, inventoryPage, cartPage}) => {
        await page.goto('/inventory.html');
        await inventoryPage.addItemsToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
        await inventoryPage.goToShoppingCart();
        await cartPage.goToCheckout();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('checkout-page.png', {fullPage: true});
    });
});
