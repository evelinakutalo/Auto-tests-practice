import { test, expect } from "@playwright/test";
import ComputersPage from "./fixtures/computers-page";
import ModifyComputerPage, {
  ModifyType,
} from "./fixtures/modify-computer-page";

test.describe("Computer Management", () => {
  let computersPage;
  let modifyComputerPage;

  test.beforeEach(async ({ page }) => {
    computersPage = new ComputersPage(page);
    modifyComputerPage = new ModifyComputerPage({ page });
    await computersPage.goto();
  });

  test("Add new computer", async () => {
    await computersPage.clickAddNewComputer();
    await modifyComputerPage.fillAndSubmitForm({
      name: "Computer name",
      introduced: "2000-10-11",
      discontinued: "2001-10-11",
      companyName: "Apple Inc.",
    });
    await expect(computersPage.computerAddedLabel()).toBeVisible();
  });

  test("Edit computer", async () => {
    const expectedComputerName = "New Computer name";
    await computersPage.selectComputerToEdit("AN/FSQ-7");
    await modifyComputerPage.emptyAllFields();
    await modifyComputerPage.fillAndSubmitForm({
      name: expectedComputerName,
      introduced: "2000-10-11",
      discontinued: "2001-10-11",
      companyName: "Apple Inc.",
    });
    await expect(
      computersPage.computerUpdatedLabel(expectedComputerName)
    ).toBeVisible();
  });

  test("Search computer", async () => {
    const computerName = "Dell Inspiron 560 Desktop Computer";
    await computersPage.fillAndSubmitEnterField(computerName);
    await computersPage.checkTableHasContent(computerName);
  });
});
