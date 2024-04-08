import { Page, expect } from "@playwright/test";

export default class ComputersPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goto() {
    await this.page.goto("https://computer-database.gatling.io/computers");
  }

  //locators
  addComputerButton = () => this.page.getByText("Add a new computer");
  computerAddedLabel = () =>
    this.page.getByText("Done ! Computer Computer name has been created");
  computerUpdatedLabel = (computerName) =>
    this.page.getByText(`Done ! Computer ${computerName} has been updated`);

  getNameInputField = () => this.page.locator("#name");
  getFilterInputField = () =>
    this.page.locator('input[placeholder="Filter by computer name..."]');
  getSubmitFilterFormButton = () =>
    this.page.getByRole("button", { name: "Filter by name" });

  //actions
  public async clickAddNewComputer() {
    await this.addComputerButton().click();
  }

  public async selectComputerToEdit(computerName: string) {
    await this.page.click(`text=${computerName}`);
  }

  public async fillAndSubmitEnterField(filterQuery: string) {
    await this.getFilterInputField().clear();
    await this.getFilterInputField().fill(filterQuery);
    await this.getSubmitFilterFormButton().click();
  }

  public async checkTableHasContent(content: string) {
    await expect(
      this.page.locator("tbody tr").getByRole("cell").first()
    ).toContainText(content);
  }
}
