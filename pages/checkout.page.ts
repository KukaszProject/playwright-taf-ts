import {Page, Locator} from "@playwright/test";

export class CheckoutPage {
    private readonly page: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;

    private readonly finishButton: Locator;
    private readonly completeHeader: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.locator('[data-test="continue"]');

        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('.complete-header');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillPostalCode(postalCode: string) {
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
        await this.clickContinueButton();
    }

    async completeCheckout() {
        await this.finishButton.click();
    }

    getCompleteHeader(): Locator {
        return this.completeHeader;
    }

    getErrorMessage(): Locator {
        return this.errorMessage;
    }
}