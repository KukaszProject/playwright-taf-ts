import {test as baseTest} from '@playwright/test';
import {LoginPage} from '../pages/login.page';
import {InventoryPage} from '../pages/inventory.page';

type TestFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;

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
});

export {expect} from '@playwright/test';