import {test, expect} from '../fixtures/base.test';
import {USER_DATA} from '../data/user.data';
import {CATALOG_DATA} from '../data/catalog.data';

test.describe('Inventory Page Flow', () => {

    test.beforeEach(async ({loginPage}) => {
        await loginPage.navigate();
        await loginPage.login(
            USER_DATA.validUser.username, 
            USER_DATA.validUser.password
        );
    });

    test('Should verify inventory header title', async ({inventoryPage}) => {
        const headerTitle = await inventoryPage.getHeaderTitle();

        await expect(headerTitle).toBeVisible();
        await expect(headerTitle).toHaveText('Products');
    });

    test('Should add a single item to the cart', async ({inventoryPage}) => {
        await inventoryPage.addItemsToCart(CATALOG_DATA.singleItem);
        const shoppingCartBadge = await inventoryPage.getShoppingCartBadge();

        await expect(shoppingCartBadge).toBeVisible();
        await expect(shoppingCartBadge).toHaveText('1');
    });

    test('Should add multiple items to the cart', async ({inventoryPage}) => {
        await inventoryPage.addItemsToCart(CATALOG_DATA.multipleItems);
        const shoppingCartBadge = await inventoryPage.getShoppingCartBadge();

        await expect(shoppingCartBadge).toBeVisible();
        await expect(shoppingCartBadge).toHaveText('4');
    });

    test('Should sort items by price (low to high)', async ({inventoryPage}) => {
        await inventoryPage.sortItems('lohi');

        const actualPrices = await inventoryPage.getItemPrices();
        const sortedPrices = [...actualPrices].sort((a, b) => a - b);

        await expect(actualPrices).toEqual(sortedPrices);
    });

})