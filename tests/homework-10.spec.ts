import { test, expect } from "@playwright/test";
import MainPage from "./support/pages/homework-10/main-page";
import ForumPage from "./support/pages/homework-10/forum-page";
import LentaPage from "./support/pages/homework-10/lenta-page";
import JobPage from "./support/pages/homework-10/job-page";

test.describe("DOU Tests", () => {
  let mainPage: MainPage;
  let forumPage: ForumPage;
  let lentaPage: LentaPage;
  let jobPage: JobPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    forumPage = new ForumPage(page);
    lentaPage = new LentaPage(page);
    jobPage = new JobPage(page);

    mainPage.preparePage();
    await mainPage.goto();
  });
  test("Check header pagination on DOU", async ({ page }) => {
    await expect(mainPage.mainHeaderTab().first()).toBeVisible();
    await expect(mainPage.forumHeaderTab().first()).toBeVisible();
    await expect(mainPage.lentaHeaderTab().first()).toBeVisible();
    await expect(mainPage.salariesHeaderTab().first()).toBeVisible();
    await expect(mainPage.jobHeaderTab().first()).toBeVisible();
    await expect(mainPage.calendarHeaderTab().first()).toBeVisible();
  });

  test("Check main sections on main page", async ({ page }) => {
    await expect(mainPage.mainArticlesRecent().first()).toBeVisible();
    await expect(mainPage.mainArticlesPopular().first()).toBeVisible();
    await expect(mainPage.mainTechArticles().first()).toBeVisible();
    await expect(mainPage.mainBlogs().first()).toBeVisible();
    await expect(mainPage.mainHotVacancies().first()).toBeVisible();
    await expect(mainPage.mainJob().first()).toBeVisible();
    await expect(mainPage.mainCalendar().first()).toBeVisible();
  });

  test("Check main sections on Forum page", async ({ page }) => {
    await page.goto("https://dou.ua/forums/");

    await forumPage.clickForumTechArticles();
    await expect(page.url()).toContain(
      "https://dou.ua/forums/tags/tech/?from=fortech"
    );
    await page.goBack();

    await forumPage.clickForumBlogs();
    await expect(page.url()).toContain(
      "https://dou.ua/forums/blogs/?from=forcol"
    );
    await page.goBack();

    await forumPage.clickForumNewDiscussion();
    await expect(page.url()).toContain(
      "https://dou.ua/forums/latest/?from=forlatest"
    );
  });

  test("Check correct displaying of articles by tags on Forum page", async ({
    page,
  }) => {
    await forumPage.goto();

    await forumPage.clickForumCommunityTag();
    await expect(page.url()).toContain(
      "https://dou.ua/forums/tags/QA/?from=toptags_community"
    );
    await expect(forumPage.forumTagResult().first()).toBeVisible();
  });

  test("Check main sections on Lenta page", async ({ page }) => {
    await lentaPage.goto();

    await lentaPage.clickLentaAnalytics();
    await page.waitForTimeout(1000);
    await expect(page.url()).toContain(
      "https://dou.ua/lenta/tags/%D0%B0%D0%BD%D0%B0%D0%BB%D1%96%D1%82%D0%B8%D0%BA%D0%B0/?from=strichan"
    );
    await page.goBack();

    await lentaPage.clickLentaArticles();
    await expect(page.url()).toContain(
      "https://dou.ua/lenta/articles/?from=strichart"
    );
    await page.goBack();

    await lentaPage.clickLentaInterview();
    await expect(page.url()).toContain(
      "https://dou.ua/lenta/interviews/?from=strichart"
    );
    await page.goBack();

    await lentaPage.clickLentaNews();
    await expect(page.url()).toContain(
      "https://dou.ua/lenta/news/?from=strichnews"
    );
  });

  test("Check correct displaying of articles by hashtags on Lenta page", async ({
    page,
  }) => {
    await lentaPage.goto();

    await lentaPage.clickLentaCareer();
    await expect(page.url()).toContain(
      "https://dou.ua/lenta/tags/%D0%BA%D0%B0%D1%80%E2%80%99%D1%94%D1%80%D0%B0/?from=toptags"
    );
    await expect(lentaPage.lentaTagResult().first()).toBeVisible();
  });

  test("Check search on Job page", async ({ page }) => {
    const searchKeyword = "QA";

    await jobPage.goto();

    await jobPage.fillJobSearchField();
    await page.waitForTimeout(2000);
    await jobPage.clickJobSearchButton();

    await expect(page.url()).toContain(
      "https://jobs.dou.ua/vacancies/?search=QA"
    );
    await expect(jobPage.jobSearchResultTitle()).toContainText(searchKeyword);
  });

  test("Check option from dropdown on Job page", async ({ page }) => {
    const dropdownTitle = "Категорія";
    const dropdownOption = "Architect";
    const searchResultTitle = "Architect";

    await jobPage.goto();

    await page.getByLabel(dropdownTitle).selectOption(dropdownOption);

    await expect(page.url()).toContain(
      "https://jobs.dou.ua/vacancies/?category=Architect"
    );
    await expect(jobPage.jobDropdownResultTitle()).toContainText(
      searchResultTitle
    );
  });
});
