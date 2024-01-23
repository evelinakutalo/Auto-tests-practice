import { test, expect } from "@playwright/test";
import ComputersPage from "./support/pages/computers.page";
import ModifyComputerPage, {
  ModifyType,
} from "./support/pages/modifyComputerPage";

test("Add new computer", async ({ page }) => {
  const computersPage = new ComputersPage(page);
  const addComputerPage = new ModifyComputerPage({
    page,
    modifyType: ModifyType.add,
  });

  await computersPage.goto();
  await computersPage.clickAddNewComputer();

  await addComputerPage.fillAndSubmitForm({
    name: "Computer name",
    introduced: "2000-10-11",
    discontinued: "2001-10-11",
    companyName: "Apple Inc.",
  });

  await expect(computersPage.computerAddedLabel()).toBeVisible();
});
test("Edit new computer", async ({ page }) => {
  const computersPage = new ComputersPage(page);
  const editComputerPage = new ModifyComputerPage({
    page,
    modifyType: ModifyType.edit,
  });
  const expectedComputerName = "New Computer name";

  await computersPage.goto();
  await computersPage.selectComputerToEdit("AN/FSQ-7");

  await editComputerPage.emptyAllFields();

  await editComputerPage.fillAndSubmitForm({
    name: expectedComputerName,
    introduced: "2000-10-11",
    discontinued: "2001-10-11",
    companyName: "Apple Inc.",
  });

  await expect(
    computersPage.computerUpdatedLabel(expectedComputerName)
  ).toBeVisible();
});

test("Search computer", async ({ page }) => {
  const computersPage = new ComputersPage(page);
  const computerName = "Dell Inspiron 560 Desktop Computer";

  await computersPage.goto();
  await computersPage.fillAndSubmitEnterField(computerName);

  await computersPage.checkTableHasContent(computerName);
});
