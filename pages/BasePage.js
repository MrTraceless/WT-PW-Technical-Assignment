export class BasePage {
  /**
 * @param {import('playwright').Page} page
 */
  constructor(page) {
    if (new.target === BasePage) {
      throw new Error('BasePage is abstract class and cannot be initialized directly');
    }
    this.page = page;
  }

  async open(path) {
    await this.page.goto(path);
  }
}
