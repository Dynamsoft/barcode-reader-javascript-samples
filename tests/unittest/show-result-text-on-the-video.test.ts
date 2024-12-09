import { test, expect } from '@playwright/test';

/*
1. Test the Display Barcode Results as Video Overlay page should have the correct header.
2. Test the Display Barcode Results as Video Overlay page should have the correct main heading.
3. Test the Display Barcode Results as Video Overlay page should have the camera view container.
4. Test the Display Barcode Results as Video Overlay page should have the results field.
*/

const URL = '/use-case/show-result-texts-on-the-video.html';

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test('should have correct title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe("Dynamsoft Barcode Reader Sample - Display Barcode Results as Video Overlays");
});

test('should have main heading', async ({ page }) => {
    const h1 = await page.locator('h1');
    expect(h1).not.toBeNull();
    await expect(h1).toHaveText('Display Barcode Results as Video Overlays');
});

test('should have camera view container', async ({ page }) => {
    const cameraViewContainer = await page.locator('#camera-view-container');
    await expect(cameraViewContainer).toBeVisible();

    const boundingBox = await cameraViewContainer.boundingBox();

    const viewportSize = page.viewportSize();
    expect(boundingBox?.height).toBeCloseTo(viewportSize!.height * 0.9, -1);
});

test('should have result containers', async ({ page }) => {
    const resultsContainer = await page.locator('#results');
    expect(resultsContainer).not.toBeNull();
});
