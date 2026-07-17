import {test, expect} from '../fixtures/base.test';
import {USER_DATA} from '../data/user.data';

test.describe('Login Page Verification', () => {

    test.beforeEach(async ({loginPage}) => {
        await loginPage.navigate();
    });

    test('Should login successfully with valid credentials', async ({page, loginPage}) => {
        await loginPage.login(
            USER_DATA.validUser.username, 
            USER_DATA.validUser.password
        );
        
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('Should display error message for locked user', async ({loginPage}) => {
        await loginPage.login(
            USER_DATA.lockedUser.username, 
            USER_DATA.lockedUser.password
        );

        const errorMessage = loginPage.getErrorMessage();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Sorry, this user has been locked out.');
    });

    test('Should display error message for empty credentials', async ({loginPage}) => {
        await loginPage.login(
            USER_DATA.emptyUser.username, 
            USER_DATA.emptyUser.password
        );

        const errorMessage = loginPage.getErrorMessage();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username is required');
    });

})