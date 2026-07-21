import {test, expect} from '../../fixtures/base.test';
import {USER_DATA} from '../../data/user.data';
import {CATALOG_DATA} from '../../data/catalog.data';
import {CHECKOUT_DATA} from '../../data/checkout.data';

test.describe('Checkout Page Flow', () => {

    test.beforeEach(async ({page, inventoryPage, cartPage}) => {
        await page.goto('/inventory.html');
        await inventoryPage.addItemsToCart(CATALOG_DATA.multipleItems);
        await inventoryPage.goToShoppingCart();
        await cartPage.goToCheckout();
    });

    test('Should display error when First Name is omitted', async ({checkoutPage}) => {
        await checkoutPage.fillLastName(CHECKOUT_DATA.validCustomer.lastName);
        await checkoutPage.fillPostalCode(CHECKOUT_DATA.validCustomer.postalCode);
        await checkoutPage.clickContinueButton();

        const errorMessage = checkoutPage.getErrorMessage();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Error: First Name is required');
    });

    test('Should display error when Last Name is omitted', async ({checkoutPage}) => {
        await checkoutPage.fillFirstName(CHECKOUT_DATA.validCustomer.firstName);
        await checkoutPage.fillPostalCode(CHECKOUT_DATA.validCustomer.postalCode);
        await checkoutPage.clickContinueButton();

        const errorMessage = checkoutPage.getErrorMessage();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Error: Last Name is required');
    });

    test('Should display error when Postal Code is omitted', async ({checkoutPage}) => {
        await checkoutPage.fillFirstName(CHECKOUT_DATA.validCustomer.firstName);
        await checkoutPage.fillLastName(CHECKOUT_DATA.validCustomer.lastName);
        await checkoutPage.clickContinueButton();
    });

})