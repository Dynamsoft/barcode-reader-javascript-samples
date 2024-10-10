import { test, Page, Locator, expect } from '@playwright/test';

/*
1. Test the index page to contain correct links
*/

const URL = '/index.html';



test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test('Validate the index page loads with all samples displayed properly', async ({ page }) => {
  await expect(page.locator("h3")).toContainText("Barcode Reader Samples");
  const buttonLinks = await page.locator(".file a.button");
  const count = await buttonLinks.count();
  await expect(count).toBe(19);

  await expect(buttonLinks.nth(0)).toContainText("Hello World");
  await expect(buttonLinks.nth(0).getAttribute('href')).not.toBeNull();
  await console.log(buttonLinks.nth(0).getAttribute('href'));
  await expect(buttonLinks.nth(1)).toContainText("Read an Existing Image");
  await expect(buttonLinks.nth(2)).toContainText("Hello World in Angular");
  await expect(buttonLinks.nth(3)).toContainText("Hello World in React");
  await expect(buttonLinks.nth(4)).toContainText("Hello World in React(using Hooks)");
  await expect(buttonLinks.nth(5)).toContainText("Hello World in Vue");
  await expect(buttonLinks.nth(6)).toContainText("Hello World in Next.js");
  await expect(buttonLinks.nth(7)).toContainText("Hello World in NuxtJS");
  await expect(buttonLinks.nth(8)).toContainText("Hello World in Electron");
  await expect(buttonLinks.nth(9)).toContainText("Hello World in PWA");
  await expect(buttonLinks.nth(10)).toContainText("Hello World with RequireJS");
  await expect(buttonLinks.nth(11)).toContainText("Hello World with ES6");
  await expect(buttonLinks.nth(12)).toContainText("Hello World in WebView");
  await expect(buttonLinks.nth(13)).toContainText("Read Video and Fill a Form");
  await expect(buttonLinks.nth(14)).toContainText("Read a Driver\'s License");
  await expect(buttonLinks.nth(15)).toContainText("Show Result Texts on the Video");
  await expect(buttonLinks.nth(16)).toContainText("Find Item via Barcode");
  await expect(buttonLinks.nth(17)).toContainText("Collect Images for Debugging");
  await expect(buttonLinks.nth(18)).toContainText("Official Online Demo");
  
});
