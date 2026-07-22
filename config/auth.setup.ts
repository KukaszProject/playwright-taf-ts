import {test as setup} from '@playwright/test';
import {LoginPage} from '../pages/login.page';
import {USER_DATA} from '../data/user.data';
import {config} from './environment.config';

const authFile = '.auth/user.json';

setup('Setup authentication', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
        config.SAUCE_USERNAME, 
        USER_DATA.validUser.password
    );

    await page.waitForURL(/.*inventory.html/);
    await page.context().storageState({path: authFile});
});