import { test, expect } from "@playwright/test";

// URL for the test site
const URL = "https://tst.dynamsoft.com/temp/vin-scan-dlr-dbr/index.html";

test.describe("Verify the VIN Scanner Page title and veirfy user can select different settings", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the camera
    await page.addScriptTag({
      content: `
        navigator.mediaDevices.getUserMedia = async () => {
          return {
            getVideoTracks: () => [{
              applyConstraints: () => {},
              stop: () => {},
            }],
            getAudioTracks: () => [],
          };
        };
      `,
    });

    // test.info().context = context; // Store the context for the test
    await page.goto(URL); // Update the path to your HTML file
  });

  test("should display the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Dynamsoft Capture Vision - VIN Scanner");
  });

  test("should have a Settings Button", async ({ page }) => {
    const settingsButton = await page.locator("#settings-button");
    await expect(settingsButton).toBeVisible();
  });

  test("should contain 3 scan mode buttons in the Settings", async ({
    page,
  }) => {
    const settingsButton = await page.locator("#settings-button");
    await settingsButton.click();

    const settingsModal = await page.locator("#settings-modal-content");
    await expect(settingsModal).toBeVisible();

    const scanBothButton = await page.locator("#scan-both-button");
    const scanTextButton = await page.locator("#scan-text-button");
    const scanBarcodeButton = await page.locator("#scan-barcode-button");

    await expect(scanBothButton).toBeVisible();
    await expect(scanTextButton).toBeVisible();
    await expect(scanBarcodeButton).toBeVisible();
  });

  test('should be able to select "Scan Text Only" option in the Settings', async ({
    page,
  }) => {
    // Open Settings modal view
    const settingsButton = await page.locator("#settings-button");
    await settingsButton.click();
    const settingsModal = await page.locator("#settings-modal-content");
    await expect(settingsModal).toBeVisible();

    // Click on Scan Text Only button and verify title
    const scanTextButton = await page.locator("#scan-text-button");
    await scanTextButton.click();
    await page.waitForTimeout(1000);
    const scanTitle = await page.locator("#scan-title");
    await expect(scanTitle).toHaveText("Scanning by Text");
  });

  test('should be able to select "Scan Barcode Only" option in the Settings', async ({
    page,
  }) => {
    // Open Settings modal view
    const settingsButton = await page.locator("#settings-button");
    await settingsButton.click();
    const settingsModal = await page.locator("#settings-modal-content");
    await expect(settingsModal).toBeVisible();

    // Click on Scan Barcode Only button and verify title
    const scanBarcodeButton = await page.locator("#scan-barcode-button");
    await scanBarcodeButton.click();
    await page.waitForTimeout(1000);
    const scanTitle = await page.locator("#scan-title");
    await expect(scanTitle).toHaveText("Scanning by Barcode");
  });

  test('should be able to select "Scan by Both" option in the Settings', async ({
    page,
  }) => {
    // Open Settings modal view
    const settingsButton = await page.locator("#settings-button");
    await settingsButton.click();
    const settingsModal = await page.locator("#settings-modal-content");
    await expect(settingsModal).toBeVisible();

    // Click on Scan Both button and verify title
    const scanBothButton = await page.locator("#scan-both-button");
    await scanBothButton.click();
    await page.waitForTimeout(1000);
    const scanTitle = await page.locator("#scan-title");
    await expect(scanTitle).toHaveText("Scanning Text and Barcode");
  });
});
