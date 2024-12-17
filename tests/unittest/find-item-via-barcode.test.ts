import { test, expect } from '@playwright/test';

/*
1. Test the Find Item via Barcode page should have the correct header.
2. Test the Find Item via Barcode page should have the correct main heading.
3. Test the Find Item via Barcode page should load the barcode text into the input filed once scanned.
4. Test the Find Item via Barcode page should have the results field.
*/

const URL = '/use-case/locate-an-item-with-barcode/index.html';

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test('should have correct title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe("Dynamsoft Barcode Reader Sample - Locate an Item with Barcode");
});

test('should have main heading', async ({ page }) => {
    const h3 = await page.locator('#inputs-container h3');
    expect(h3).not.toBeNull();
    await expect(h3).toHaveText('Locate an Item with Barcode');
});

test('should load barcode text into the input field', async ({ page }) => {
    const inputField = await page.locator("input#item-id");
    await expect(inputField).toBeEmpty();
    await page.locator("button#scan-id-button").click();
    await expect(inputField).not.toBeEmpty();
});

test('should have result containers', async ({ page }) => {
    const resultsContainer = await page.locator('#results');
    expect(resultsContainer).not.toBeNull();
});

