import { test, expect } from '../../fixtures/base.test';
import { CHECKOUT_DATA } from '../../data/checkout.data';

test.describe('Checkout Page Flow', () => {
  test('Should display error when First Name is omitted', async ({ checkoutStepOne }) => {
    await checkoutStepOne.fillLastName(CHECKOUT_DATA.validCustomer.lastName);
    await checkoutStepOne.fillPostalCode(CHECKOUT_DATA.validCustomer.postalCode);
    await checkoutStepOne.clickContinueButton();

    await expect(checkoutStepOne.getErrorMessage()).toBeVisible();
    await expect(checkoutStepOne.getErrorMessage()).toHaveText('Error: First Name is required');
  });

  test('Should display error when Last Name is omitted', async ({ checkoutStepOne }) => {
    await checkoutStepOne.fillFirstName(CHECKOUT_DATA.validCustomer.firstName);
    await checkoutStepOne.fillPostalCode(CHECKOUT_DATA.validCustomer.postalCode);
    await checkoutStepOne.clickContinueButton();

    await expect(checkoutStepOne.getErrorMessage()).toBeVisible();
    await expect(checkoutStepOne.getErrorMessage()).toHaveText('Error: Last Name is required');
  });

  test('Should display error when Postal Code is omitted', async ({ checkoutStepOne }) => {
    await checkoutStepOne.fillFirstName(CHECKOUT_DATA.validCustomer.firstName);
    await checkoutStepOne.fillLastName(CHECKOUT_DATA.validCustomer.lastName);
    await checkoutStepOne.clickContinueButton();

    await expect(checkoutStepOne.getErrorMessage()).toBeVisible();
    await expect(checkoutStepOne.getErrorMessage()).toHaveText('Error: Postal Code is required');
  });
});
