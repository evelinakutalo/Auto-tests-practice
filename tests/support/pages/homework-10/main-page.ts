import { expect, Page } from "@playwright/test";

export default class MainPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goto() {
    await this.page.goto("https://dou.ua/");
  }

  public preparePage() {
    this.page.setViewportSize({ width: 1280, height: 1080 });
  }

  //locators
  mainHeaderTab = () => this.page.locator("text=Головна");
  forumHeaderTab = () => this.page.locator("text=Форум");
  lentaHeaderTab = () => this.page.locator("text=Стрічка");
  salariesHeaderTab = () => this.page.locator("text=Зарплати");
  jobHeaderTab = () => this.page.locator("text=Робота");
  calendarHeaderTab = () => this.page.locator("text=Календар");

  mainArticlesRecent = () => this.page.locator("text=Свіже");
  mainArticlesPopular = () => this.page.locator("text=Популярне");
  mainTechArticles = () => this.page.locator("text=Технічні статті");
  mainBlogs = () => this.page.locator("text=Блоги");
  mainHotVacancies = () => this.page.locator("text=Гарячі вакансії");
  mainJob = () => this.page.locator("text=Робота");
  mainCalendar = () => this.page.locator("text=Календар");
}
