import {Page, Locator} from '@playwright/test';

export class HeaderComponent {
    private readonly page: Page;
    private readonly menuButton: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }
}