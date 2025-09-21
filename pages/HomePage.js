import { BasePage } from './BasePage.js'

export class HomePage extends BasePage {
  constructor(page) {
    super(page)
    this.logInBtn = page.getByRole('link', { name: 'Log In' })
    this.openAccountBtn = page.locator('div.banner-section__header div.banner-section__actions').getByRole('link', { name: 'Open account' })
  }

  async clickLogInBtn() {
    await this.logInBtn.click()
  }

  async clickOpenAccountBtn() {
    await this.openAccountBtn.click()
  }
}
