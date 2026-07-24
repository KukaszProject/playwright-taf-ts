import { test, expect } from '../../fixtures/base.test';
import { CATALOG_DATA } from '../../data/catalog.data';

test.describe('Cart Page Flow', () => {
  test('Should display cart title', async ({ cartWithItems }) => {
    await expect(cartWithItems.getPageTitle()).toBeVisible();
  });

  test('Should display correct items in the cart', async ({ cartWithItems }) => {
    await expect(cartWithItems.getCartItems()).toHaveCount(CATALOG_DATA.multipleItems.length);
  });

  test('Should remove an item from the cart', async ({ cartWithItems }) => {
    const itemToRemove = CATALOG_DATA.multipleItems[0];
    await cartWithItems.removeItemFromCart(itemToRemove);

    await expect(cartWithItems.getCartItems()).toHaveCount(CATALOG_DATA.multipleItems.length - 1);
    await expect(cartWithItems.getCartItem(itemToRemove)).toHaveCount(0);
  });

  test('Should navigate to checkout page', async ({ cartWithItems, page }) => {
    await cartWithItems.goToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });
});
