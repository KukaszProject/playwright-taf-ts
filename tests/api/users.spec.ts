import { test, expect } from '../../fixtures/base.test';
import { MOCK_API_DATA } from '../../data/api-mock.data';
import { ApiPayloads } from '../../data/api-payloads.data';

test.describe('API Contract Tests', () => {
  test('GET /users - should return a list of users matching the expected schema', async ({
    page,
  }) => {
    await page.route('**/users', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_API_DATA.usersListResponse),
      });
    });

    const responsePromise = page.waitForResponse('**/users');
    await page.goto('/users');
    const response = await responsePromise;

    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('email');
  });

  test('POST /posts - should create a new resource and return it with an id', async ({ page }) => {
    const newPost = ApiPayloads.createNewPost();

    await page.route('/users', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body></body></html>',
      });
    });

    await page.route('**/posts', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ ...JSON.parse(route.request().postData() ?? '{}'), id: 101 }),
      });
    });

    await page.goto('/users');

    const responsePromise = page.waitForResponse('**/posts');
    await page.evaluate(async (data) => {
      await fetch('/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }, newPost);
    const response = await responsePromise;

    const responseBody = await response.json();
    expect(responseBody.title).toBe(newPost.title);
    expect(responseBody).toHaveProperty('id');
  });
});
