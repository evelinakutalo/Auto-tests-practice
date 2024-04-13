import { expect, Page } from "@playwright/test";

export default class LentaPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goto() {
    await this.page.goto("https://dou.ua/lenta/");
  }

  //locators
  lentaAnalytics = () => this.page.getByRole("link", { name: "Аналітика" });
  lentaArticles = () => this.page.getByText("Статті");
  lentaInterview = () => this.page.getByText("Інтервʼю");
  lentaNews = () => this.page.getByText("Новини");

  lentaCareer = () => this.page.getByRole("link", { name: "#Кар’єра" });
  lentaTagResult = () => this.page.locator("text=кар’єра");

  //actions
  public async clickLentaAnalytics() {
    await this.lentaAnalytics().first().click();
  }

  public async clickLentaArticles() {
    await this.lentaArticles().first().click();
  }

  public async clickLentaInterview() {
    await this.lentaInterview().first().click();
  }

  public async clickLentaNews() {
    await this.lentaNews().first().click();
  }

  public async clickLentaCareer() {
    await this.lentaCareer().first().click();
  }
}
