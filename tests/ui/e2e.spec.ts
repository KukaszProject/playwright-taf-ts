import { test, expect } from '../../fixtures/base.test';
import { USER_DATA } from '../../data/user.data';
import { CATALOG_DATA } from '../../data/catalog.data';
import { CHECKOUT_DATA } from '../../data/checkout.data';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('End-to-End Flow', () => {
  test('Should successfully complete the checkout process', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await loginPage.navigate();
    await loginPage.login(USER_DATA.validUser.username, USER_DATA.validUser.password);

    await inventoryPage.addItemsToCart(CATALOG_DATA.multipleItems);
    await inventoryPage.goToShoppingCart();

    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInformation(
      CHECKOUT_DATA.validCustomer.firstName,
      CHECKOUT_DATA.validCustomer.lastName,
      CHECKOUT_DATA.validCustomer.postalCode,
    );

    await checkoutPage.completeCheckout();
    await expect(page).toHaveURL(/.*checkout-complete.html/);

    const successHeader = checkoutPage.getCompleteHeader();
    await expect(successHeader).toBeVisible();
    await expect(successHeader).toHaveText('Thank you for your order!');
  });

  test('Should allow user to cancel checkout and return to inventory', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await loginPage.navigate();
    await loginPage.login(USER_DATA.validUser.username, USER_DATA.validUser.password);

    await inventoryPage.addItemsToCart(CATALOG_DATA.multipleItems);
    await inventoryPage.goToShoppingCart();

    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInformation(
      CHECKOUT_DATA.validCustomer.firstName,
      CHECKOUT_DATA.validCustomer.lastName,
      CHECKOUT_DATA.validCustomer.postalCode,
    );

    await checkoutPage.cancelCheckout();

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.getHeaderTitle()).toBeVisible();
  });
});
