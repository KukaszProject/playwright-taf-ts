import {test, expect} from '@playwright/test';
import { ApiPayloads } from '../../data/api-payloads.data';

test.describe('Backend API Validation Suite - JSONPlaceholder', () => {

    test('GET - should validate the list of users', async ({ request }) => {
        const response = await request.get('/users');
        expect(response.status()).toBe(200);

        const users = await response.json();

        expect(Array.isArray(users)).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]).toHaveProperty('id');
        expect(users[0]).toHaveProperty('email');
    });

    test('POST - should create a new user', async ({ request }) => {
        const newUser = ApiPayloads.createNewPost();

        const response = await request.post('/posts', { data: newUser });
        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        expect(responseBody.title).toBe(newUser.title);
        expect(responseBody).toHaveProperty('id');
    });

});