import { test } from '../../fixtures/baseFixture.js';

test.describe('Open Account > Positive', { tag: ['@ui', '@openAccount', '@positive'] }, () => {
    test.beforeEach(async ({ app, page }) => {
        await app.home.open('/');
        await app.home.clickOpenAccountBtn();
        await page.waitForURL('https://account.paydo.com/en/auth/personal/sign-up');
    })

    test('Check whether UI elements are visible on the Open account page', async ({ app }) => {
        await test.step('Check that all UI elements are visible on the Open Account (Main page)', async () => {
            await app.openAccount.expectAllUiVisible();
        })
        await test.step('Check that all UI elements are visible on the Open Account (Banner)', async () => {
            await app.openAccount.verifySlidesByPagination();
        })
    });
});
