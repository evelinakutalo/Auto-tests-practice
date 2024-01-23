import { expect, Page } from "@playwright/test";

export enum ModifyType {
  add = "add",
  edit = "edit",
}

interface ComputerForm {
  name: string;
  introduced: string;
  discontinued: string;
  companyName: string;
}

export default class ModifyComputerPage {
  page: Page;
  modifyType: ModifyType;

  constructor({
    page,
    modifyType = ModifyType.add,
  }: {
    page: Page;
    modifyType?: ModifyType;
  }) {
    this.page = page;
    this.modifyType = modifyType;
  }

  public async goto() {
    await this.page.goto("https://computer-database.gatling.io/computers/new");
  }

  // locators
  nameTextBox = () => this.page.locator("#name");
  introducedTextBox = () => this.page.locator("#introduced");
  discontinuedTextBox = () => this.page.locator("#discontinued");
  companySelect = () => this.page.locator("#company");
  getSubmitButton = () => {
    if (this.modifyType === ModifyType.add) {
      return this.page.getByRole("button", { name: "Create this computer" });
    } else {
      return this.page.getByRole("button", { name: "Save this computer" });
    }
  };

  // actions
  public async enterComputerDetails({
    name,
    introduced,
    discontinued,
    companyName,
  }: ComputerForm) {
    await this.nameTextBox().fill(name);
    await this.introducedTextBox().fill(introduced);
    await this.discontinuedTextBox().fill(discontinued);
    await this.companySelect().selectOption({ label: companyName });
  }

  public async emptyAllFields() {
    // ['nameTextBox', 'introducedTextBox', 'discontinuedTextBox', 'companySelect'].forEach(item => {
    //   this[item]().clear();
    // });
    this.nameTextBox().clear();
    this.introducedTextBox().clear();
    this.discontinuedTextBox().clear();
    // No need to clear, since it's select-field and it cannot be cleared
    // this.companySelect().clear();
  }

  public async submitForm() {
    await this.getSubmitButton().click();
  }

  public async fillAndSubmitForm(formData: ComputerForm) {
    await this.enterComputerDetails(formData);
    await this.submitForm();
  }
}
