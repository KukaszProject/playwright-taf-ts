import {test, expect} from '../fixtures/base.test';
import {USER_DATA} from '../data/user.data';
import {CATALOG_DATA} from '../data/catalog.data';

test.describe('Cart Page Flow', () => {
    test.beforeEach(async ({loginPage, inventoryPage}) => {
        await loginPage.navigate();
        await loginPage.login(
            USER_DATA.validUser.username, 
            USER_DATA.validUser.password
        );
        await inventoryPage.addItemsToCart(CATALOG_DATA.multipleItems);
        await inventoryPage.goToShoppingCart();
    });

    test('Should display cart title', async ({cartPage}) => {
        const title = cartPage.getPageTitle();
        await expect(title).toBeVisible();
    });

    test('Should display correct items in the cart', async ({cartPage}) => {
        const cartItems = cartPage.getCartItems();
        await expect(cartItems).toHaveCount(CATALOG_DATA.multipleItems.length);
    });

    test('Should remove an item from the cart', async ({cartPage}) => {
        const itemToRemove = CATALOG_DATA.multipleItems[0];
        await cartPage.removeItemFromCart(itemToRemove);

        const cartItems = cartPage.getCartItems();

        await expect(cartItems).toHaveCount(CATALOG_DATA.multipleItems.length - 1);
        await expect(cartPage.getCartItem(itemToRemove)).toHaveCount(0);
    });

    test('Should navigate to checkout page', async ({cartPage, page}) => {
        await cartPage.goToCheckout();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
    });
});