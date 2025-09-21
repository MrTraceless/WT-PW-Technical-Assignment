import { BasePage } from './BasePage.js'

export class LoginPage extends BasePage {
  constructor(page) {
    super(page)
    this.getStartedLink = page.locator('a', { hasText: 'Get started' })
    this.emailInput = page.getByPlaceholder('Enter email')
    this.passwordInput = page.getByPlaceholder('Enter password')
    this.logInBtn = page.getByRole('button', { name: 'Log In' })
    this.incorrectEnteredCredentialsErrorBlock = page.locator('auth-title ~ ngp-info-block')
    this.incorrectEnteredCredentialsErrorMessage = page.locator('ngp-info-block ngp-info-block-content')
    this.incorrectEnteredCredentialsErrorIcon = page.locator('ngp-info-block ngp-icon')

    this.emailInputErrorMessage = page.getByText('Please enter correct email')
    this.passwordInputErrorMessage = page.getByText('Please fill in this field to continue')
  }

  async fillingEmailInput(email) {
    await this.emailInput.pressSequentially(email)
  }

  async fillingPasswordInput(password) {
    await this.passwordInput.pressSequentially(password)
  }

  async clickLogInBtn() {
    await this.logInBtn.click()
  }

  async login(email, password) {
    await this.fillingEmailInput(email)
    await this.fillingPasswordInput(password)
    await this.logInBtn.click()
  }
}
