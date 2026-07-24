import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { HeaderComponent } from '../components/header.component';
import { CATALOG_DATA } from '../data/catalog.data';

type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  headerComponent: HeaderComponent;
  cartWithItems: CartPage;
  checkoutStepOne: CheckoutPage;
};

export const test = baseTest.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  cartWithItems: async ({ page, inventoryPage, cartPage }, use) => {
    await page.goto('/inventory.html');
    await inventoryPage.waitForReady();
    await inventoryPage.addItemsToCart(CATALOG_DATA.multipleItems);
    await inventoryPage.goToShoppingCart();
    await cartPage.waitForReady();
    await use(cartPage);
  },
  checkoutStepOne: async ({ cartWithItems, checkoutPage }, use) => {
    await cartWithItems.goToCheckout();
    await checkoutPage.waitForReady();
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';
