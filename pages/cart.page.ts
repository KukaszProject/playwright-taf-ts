import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly headerTitle: Locator;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;

  private readonly cartList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.cartList = page.locator('.cart_list');
  }

  async waitForReady() {
    await this.cartList.waitFor();
  }

  getPageTitle(): Locator {
    return this.headerTitle;
  }

  getCartItems(): Locator {
    return this.cartItems;
  }

  getCartItem(itemName: string): Locator {
    return this.page.locator(`.cart_item:has-text("${itemName}")`);
  }

  async removeItemFromCart(itemName: string) {
    const removeButton = this.page.locator(`.cart_item:has-text("${itemName}") button`);

    await removeButton.scrollIntoViewIfNeeded();
    await removeButton.click();
  }

  async goToCheckout() {
    await this.checkoutButton.scrollIntoViewIfNeeded();
    await this.checkoutButton.click();
  }
}
