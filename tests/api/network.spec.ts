import { test, expect } from '../../fixtures/base.test';
import { config } from '../../config/environment.config';
import { MOCK_API_DATA } from '../../data/api-mock.data';

test.describe('Network Interception Tests', () => {
  test('API Mocking: Should mock a backend reponse to test UI behavior', async ({
    page,
    inventoryPage,
  }) => {
    await page.route('**/users', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_API_DATA.userResponse),
      });
    });

    await page.goto(`${config.API_BASE_URL}/users`);
    await expect(page.locator('body')).toContainText(MOCK_API_DATA.userResponse.name);
    await expect(page.locator('body')).toContainText(MOCK_API_DATA.userResponse.email);
  });
});
