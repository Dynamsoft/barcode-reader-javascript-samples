import { test, expect } from '@playwright/test';

/*
1. Test the read an image page should have the correct header.
2. Test the read an image page should have the correct main heading.
3. Test the read an image page should have the results field.
4. Test the read an image page should have input selector to select an image file as input and parsed in the results field..
*/

const URL = '/hello-world/read-an-image.html';

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test('should have correct title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe("Dynamsoft Barcode Reader Sample - Hello World (Read an Image)");
});

test('should have main heading', async ({ page }) => {
    const h1 = await page.locator('h1');
    expect(h1).not.toBeNull();
    await expect(h1).toHaveText('Hello World (Read an Image)');
});

test('should have result containers', async ({ page }) => {
    const resultsContainer = await page.locator('#results');
    expect(resultsContainer).not.toBeNull();
});

test('should be able to select an image file as an input and parsed the Barcodes in the results', async ({ page }) => {
    const fileSelector = await page.locator('input#input-file');
    await expect(fileSelector).toBeVisible();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await fileSelector.click();
    const fileChooser = await fileChooserPromise;
    await expect(fileChooser.isMultiple()).toBe(true);
    await fileChooser.setFiles('./tests/image-src/ABC.png');
    
    const results = await page.locator('#results');
    await expect(results).toContainText("Dynamsoft-948743540084");
    await expect(results).toContainText("Dynamsoft-162323263989");
    await expect(results).toContainText("Dynamsoft-052408584613");

});

