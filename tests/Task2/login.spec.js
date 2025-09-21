import { test, expect } from '../../fixtures/baseFixture.js';

test.describe('Log In > Negative', { tag: ['@ui', '@login', '@negative'] }, () => {
  test.beforeEach(async ({ app }) => {
    await app.login.open('/');
    await app.home.clickLogInBtn();
  })
  test('Check error message while entering incorrect password', async ({ app }) => {
    const creds = { email: 'testEmail@test.com', password: '123' }

    await app.login.login(creds.email, creds.password);

    await expect(app.login.incorrectEnteredCredentialsErrorBlock).toBeVisible();
    await expect(app.login.incorrectEnteredCredentialsErrorMessage).toHaveText('The email address or password you entered is incorrect');
    await expect(app.login.incorrectEnteredCredentialsErrorIcon).toBeVisible();
  })

  test('Check error message while entering incorrect email and password', async ({ app }) => {
    const creds = { email: 'error', password: 'error' }
    await app.login.fillingEmailInput(creds.email);
    await app.login.fillingPasswordInput(creds.password);

    await expect(app.login.emailInputErrorMessage).toBeVisible();
    await expect(app.login.logInBtn).toBeDisabled();
  })

  test('Check error message while entering incorrect email and left password field empty', async ({ app }) => {
    const creds = { email: 'error', password: '' }

    await app.login.fillingEmailInput(creds.email);
    await app.login.fillingPasswordInput(creds.password);
    await app.login.passwordInput.blur();

    await expect(app.login.emailInputErrorMessage).toBeVisible();
    await expect(app.login.passwordInputErrorMessage).toBeVisible();
    await expect(app.login.logInBtn).toBeDisabled();
  })
})
