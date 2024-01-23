import { test, expect } from "@playwright/test";

test("Add new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await page.getByText("Add a new computer").click();
  await page.locator("#name").fill("Computer name");
  await page.locator("#introduced").fill("2000-10-11");
  await page.locator("#discontinued").fill("2001-10-11");
  await page.locator("#company").selectOption({ label: "Apple Inc." });
  await page.getByText("Create this computer").click();

  await expect(
    page.getByText("Done ! Computer Computer name has been created")
  ).toBeVisible();
});

test("Edit new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await page.getByRole("link", { name: "AN/FSQ-7" }).click();
  await expect(page.getByText("Edit Computer")).toBeVisible();

  await page.locator("#name").clear();
  await page.locator("#name").fill("Computer name");
  await page.locator("#introduced").fill("2000-10-11");
  await page.locator("#discontinued").clear();
  await page.locator("#discontinued").fill("2001-10-11");
  await page.locator("#company").selectOption({ label: "Apple Inc." });
  await page.getByText("Save this computer").click();

  await expect(
    page.getByText("Done ! Computer Computer Name has been updated")
  ).toBeVisible();
});

test("Search computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await page.getByPlaceholder("Filter by computer name...").click();
  await page.getByPlaceholder("Filter by computer name...").fill("Computer");
  await page.getByRole("button", { name: "Filter by name" }).click();

  await expect(page.getByRole("cell").first()).toContainText("Computer");
});
