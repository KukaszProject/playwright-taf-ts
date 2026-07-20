import { test, expect } from '../fixtures/base.test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests - logged out', () => {
    test.use({ storageState: {cookies: [], origins: []} });

    test('Login Page Accessibility', async ({page}) => {
        await page.goto('/');
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

});

test.describe('Accessibility Tests - logged in', () => {
    test('Inventory Page Accessibility', async ({page}) => {
        await page.goto('/inventory.html');

        const accessibilityScanResults = await new AxeBuilder({ page }).exclude('.known-bad-components').analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Cart Page Accessibility', async ({page, inventoryPage}) => {
        await page.goto('/inventory.html');
        await inventoryPage.addItemsToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
        await inventoryPage.goToShoppingCart();

        const accessibilityScanResults = await new AxeBuilder({ page }).exclude('.known-bad-components').analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Checkout Page Accessibility', async ({page, inventoryPage, cartPage}) => {
        await page.goto('/inventory.html');
        await inventoryPage.addItemsToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
        await inventoryPage.goToShoppingCart();
        await cartPage.goToCheckout();
        
        const accessibilityScanResults = await new AxeBuilder({ page }).exclude('.known-bad-components').analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

});