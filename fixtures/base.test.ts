import {test as baseTest} from '@playwright/test';
import {LoginPage} from '../pages/login.page';
import {InventoryPage} from '../pages/inventory.page';
import {CartPage} from '../pages/cart.page';
import {CheckoutPage} from '../pages/checkout.page';
import {HeaderComponent} from '../components/header.component';

type TestFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    headerComponent: HeaderComponent;
};

export const test = baseTest.extend<TestFixtures>({
    page: async ({page}, use) => {
        await use(page);
        await page.close();
    },
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({page}, use) => {
        await use(new InventoryPage(page));
    },
    cartPage: async ({page}, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({page}, use) => {
        await use(new CheckoutPage(page));
    },
    headerComponent: async ({page}, use) => {
        await use(new HeaderComponent(page));
    },
});

export {expect} from '@playwright/test';