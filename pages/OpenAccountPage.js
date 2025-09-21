import { BasePage } from './BasePage.js'
import { expect } from '../fixtures/baseFixture.js'

export class OpenAccountPage extends BasePage {
  constructor(page) {
    super(page)
    this.uiLocators = {
      heading: page.getByRole('heading', { name: 'Create a personal account' }),
      emailLabel: page.locator('mat-label').filter({ hasText: 'Email' }),
      emailLabelTooltip: page.locator('ngp-tooltip svg'),
      emailInput: page.getByRole('textbox', { name: 'Enter email' }),
      passwordLabel: page.getByText('Password', { exact: true }),
      passwordInput: page.locator('#mat-input-1'),
      passwordInputIcon: page
        .locator('ngp-password-field')
        .filter({ hasText: 'Password Min.8 characters' })
        .locator('mat-form-field svg'),
      confirmPasswordLabel: page
        .locator('mat-label')
        .filter({ hasText: 'Confirm password' }),
      confirmPasswordInput: page.locator('#mat-input-2'),
      confirmPasswordIcon: page
        .locator('ngp-password-field')
        .filter({ hasText: 'Confirm password' })
        .locator('svg'),
      createAccountBtn: page.getByRole('button', { name: 'Create an account' }),
      switchToBusiness: page.getByRole('link', {
        name: 'Switch to create Business',
      }),
      logInBtn: page.getByRole('link', { name: 'Log In' }),
      backToHomeBtn: page.getByRole('link', { name: 'Back to Homepage' }),
      footerTermsText: page.locator('auth-footer'),
      termsLink: page.locator('auth-footer a'),

      //* Password requirements
      reqMin8Text: page.getByText('Min.8 characters'),
      reqMin8Icon: page
        .locator('ngp-field-requirements-item')
        .filter({ hasText: 'Min.8 characters' })
        .locator('path'),
      reqLowerText: page.getByText('Lowercase letter'),
      reqLowerIcon: page
        .locator('ngp-field-requirements-item')
        .filter({ hasText: 'Lowercase letter' })
        .locator('path'),
      reqUpperText: page.getByText('Uppercase letter'),
      reqUpperIcon: page
        .locator('ngp-field-requirements-item')
        .filter({ hasText: 'Uppercase letter' })
        .locator('path'),
      reqNumberText: page.getByText('At least 1 number'),
      reqNumberIcon: page
        .locator('ngp-field-requirements-item')
        .filter({ hasText: 'At least 1 number' })
        .locator('path'),

      //* Banner
      bannerLogo: page.getByRole('link', { name: 'Paydo logo' }),
      bannerText: page.getByText('Personal account', { exact: true }),
    }


    this.sliderRoot = page.locator('.auth-slider-content__slider.swiper');
    this.sliderWrapper = this.sliderRoot.locator('.ngp-gallery-slider__content.swiper-wrapper');
    this.slides = this.sliderWrapper.locator('.swiper-slide');
    this.activeSlide = this.sliderWrapper.locator('.swiper-slide.swiper-slide-active');
    this.pagination = this.sliderRoot.locator('.swiper-pagination');
    this.paginationBullets = this.pagination.locator('.swiper-pagination__bullet');

    this.selTitle = '.ngp-gallery-slider-item-title, .ngp-gallery-slider-title';
    this.selDesc = '.ngp-gallery-slider-item-description, .ngp-gallery-slider-description';
  }

  async expectAllUiVisible() {
    if (!this.uiLocators)
      throw new Error(
        'OpenAccountPage: UI registry is not initialized'
      )
    for (const [name, locator] of Object.entries(this.uiLocators)) {
      await expect(locator, `UI element not visible: ${name}`).toBeVisible()
    }
  }


  slideTitle(slide) {
    return slide.locator(this.selTitle).first();
  }

  slideDescription(slide) {
    return slide.locator(this.selDesc).first();
  }

  async verifySlidesByPagination() {
    await expect(this.pagination).toBeAttached();
    await expect(this.pagination).toBeVisible();

    const bulletCount = await this.paginationBullets.count();
    expect(bulletCount).toBeGreaterThan(0);

    for (let index = 0; index < bulletCount; index++) {
      await this.paginationBullets.nth(index).click();

      const current = this.activeSlide;
      await expect(current).toBeAttached();
      await expect(current).toBeVisible();

      const title = this.slideTitle(current).first();
      const desc = this.slideDescription(current).first();

      await expect(title).toBeVisible();
      await expect(desc).toBeVisible();

      const img = current.locator('img.auth-slide__image').first();

      if (await img.count()) {
        await expect(img).toBeVisible();
        await expect(img).toHaveAttribute('alt', /.+/);
      }
    }
  }

}
