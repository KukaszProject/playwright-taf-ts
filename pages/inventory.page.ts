import { Page, Locator } from "@playwright/test";

export class InventoryPage {
    private readonly page: Page
    private readonly headerTitle: Locator;
    private readonly shoppingCartBadge: Locator;
    private readonly sortDropdown: Locator;
    private readonly itemPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerTitle = page.locator('.title');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('.product_sort_container');
        this.itemPrices = page.locator('.inventory_item_price');
    }

    getHeaderTitle(): Locator {
        return this.headerTitle;
    }

    private getItemButtonLocator(itemName: string): Locator {
        return this.page.locator(`.inventory_item:has-text("${itemName}") button`);
    }

    async addItemsToCart(items: string | string[]) {
        const itemNames = Array.isArray(items) ? items : [items];
        for (const itemName of itemNames) {
            const itemButton = this.getItemButtonLocator(itemName);
            
            await itemButton.scrollIntoViewIfNeeded();
            await itemButton.click();
        }
    }

    async sortItems(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async getItemPrices(): Promise<number[]> {
        const pricesText = await this.itemPrices.allTextContents();
        return pricesText.map(price => parseFloat(price.replace('$', '')));
    }

    async goToShoppingCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    getShoppingCartBadge(): Locator {
        return this.shoppingCartBadge;
    }
}