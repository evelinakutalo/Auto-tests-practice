import { expect, Page } from "@playwright/test";

export default class ForumPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goto() {
    await this.page.goto("https://dou.ua/forums/");
  }

  //locators
  forumTechArticles = () => this.page.locator("text=Технічні статті");
  forumBlogs = () => this.page.locator("text=Блоги");
  forumNewDiscussion = () => this.page.locator("text=Нові обговорення");

  forumCommunityTag = () =>
    this.page.getByRole("link", { name: "QA", exact: true });
  forumTagResult = () => this.page.locator("text=QA спільнота");

  //actions
  public async clickForumTechArticles() {
    await this.forumTechArticles().first().click();
  }

  public async clickForumBlogs() {
    await this.forumBlogs().first().click();
  }

  public async clickForumNewDiscussion() {
    await this.forumNewDiscussion().first().click();
  }

  public async clickForumCommunityTag() {
    await this.forumCommunityTag().first().click();
  }
}
