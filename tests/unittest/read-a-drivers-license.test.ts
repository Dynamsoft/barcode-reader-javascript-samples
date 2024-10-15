import { test, expect } from '@playwright/test';

/*
1. Test the Read Driver's License page should have the correct header.
2. Test the Read Driver's License page should have the correct heading.
*/

const URL = '/use-case/read-a-drivers-license/index.html';

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test('should have correct title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe("Dynamsoft Barcode Reader Sample - Read a Driver's License");
});

test('should have main heading', async ({ page }) => {
    const h1 = await page.locator('h1');
    expect(h1).not.toBeNull();
    await expect(h1).toHaveText("Read a Driver's License");
});