import { expect, Page } from "@playwright/test";

export default class JobPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goto() {
    await this.page.goto("https://jobs.dou.ua/");
  }

  //locators
  jobSearchField = () =>
    this.page.getByPlaceholder(/.*Посада, мова, компанія, місто, країна.*/);
  jobSearchButton = () =>
    this.page.getByRole("button", { name: "Знайти", exact: true });
  jobSearchResultTitle = () => this.page.locator(".b-vacancies-head");
  jobDropdownResultTitle = () => this.page.locator(".b-inner-page-header");

  //actions
  public async fillJobSearchField() {
    await this.jobSearchField().fill("QA");
  }

  public async clickJobSearchButton() {
    await this.jobSearchButton().click();
  }
}
