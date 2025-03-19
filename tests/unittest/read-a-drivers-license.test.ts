import { test, expect } from '@playwright/test';

/*
1. Test the Read Driver's License page should have the correct header.
2. Test the Read Driver's License page should have the correct heading.
3. Test the Read Driver's License page should have the camera icon to activate the video streaming.
*/

const URL = '/use-case/read-a-drivers-license/index.html';

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test('should have correct title', async ({ page }) => {
    const title = await page.title();
    await expect(title).toBe("Dynamsoft Barcode Reader Sample - Read a Driver's License");
});

test('should have main heading', async ({ page }) => {
    const h1 = await page.locator('h1');
    await expect(h1).not.toBeNull();
    await expect(h1).toHaveText("Read a Driver's License");
});


test('should be able to click on the start scanning camera icon and load the video container', async ({ page }) => {
  await page.locator("svg#svg-start").click();
  const videoContainer = await page.locator(".dce-video-container");
  await expect(videoContainer).not.toBeNull();

})