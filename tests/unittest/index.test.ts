import { test, Locator, expect } from '@playwright/test';
import exp from 'constants';

/*
1. Test the index page to contain correct links
*/

const URL = '/index.html';


test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

async function verifyLinkText(page, buttonLinks: Locator, n: number, stringToVerify: string) {
  const elementHandle = await buttonLinks.nth(n).elementHandle(); // Get the element handle
  if (elementHandle) { // Check if elementHandle is not null
    let href = await page.evaluate((element) => (element as HTMLAnchorElement).href, elementHandle); // Type assertion to HTMLAnchorElement
    await expect(href).toContain(stringToVerify);
  } else {
    console.error('Element handle is null'); // Handle the null case
  }
}

test('Validate the index page loads with all samples displayed properly', async ({ page }) => {
  await expect(page.locator("h3")).toContainText("Barcode Reader Samples");
  const buttonLinks = await page.locator("div.file a.button");
  const count = await buttonLinks.count();
  await expect(count).toBe(19);

  await expect(buttonLinks.nth(0)).toContainText("Hello World");
  await verifyLinkText(page, buttonLinks, 0, "hello-world/hello-world.html");
 
  await expect(buttonLinks.nth(1)).toContainText("Read an Existing Image");
  await verifyLinkText(page, buttonLinks, 1, "hello-world/read-an-image.html");

  await expect(buttonLinks.nth(2)).toContainText("Hello World in Angular");
  await expect(buttonLinks.nth(3)).toContainText("Hello World in React");
  await expect(buttonLinks.nth(4)).toContainText("Hello World in React(using Hooks)");
  await expect(buttonLinks.nth(5)).toContainText("Hello World in Vue");

  await expect(buttonLinks.nth(6)).toContainText("Hello World in Next.js");
  await verifyLinkText(page, buttonLinks, 6, "https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/next#readme");

  await expect(buttonLinks.nth(7)).toContainText("Hello World in NuxtJS");
  await verifyLinkText(page, buttonLinks, 7, "https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/nuxt#readme");
  
  await expect(buttonLinks.nth(8)).toContainText("Hello World in Electron");
  await verifyLinkText(page, buttonLinks, 8, "https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/electron#readme");

  await expect(buttonLinks.nth(9)).toContainText("Hello World in PWA");
  await verifyLinkText(page, buttonLinks, 9, "hello-world/pwa/helloworld-pwa.html");

  await expect(buttonLinks.nth(10)).toContainText("Hello World with RequireJS");
  await verifyLinkText(page, buttonLinks, 10, "hello-world/requirejs.html");
  
  await expect(buttonLinks.nth(11)).toContainText("Hello World with ES6");
  await verifyLinkText(page, buttonLinks, 11, "hello-world/es6.html");

  await expect(buttonLinks.nth(12)).toContainText("Hello World in WebView");
  await verifyLinkText(page, buttonLinks, 12, "https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/webview");

  await expect(buttonLinks.nth(13)).toContainText("Read Video and Fill a Form");
  await verifyLinkText(page, buttonLinks, 13, "use-case/fill-a-form-with-barcode-reading.html");

  await expect(buttonLinks.nth(14)).toContainText("Read a Driver\'s License");
  await verifyLinkText(page, buttonLinks, 14, "use-case/read-a-drivers-license/index.html");

  await expect(buttonLinks.nth(15)).toContainText("Show Result Texts on the Video");
  await verifyLinkText(page, buttonLinks, 15, "use-case/show-result-texts-on-the-video.html");

  await expect(buttonLinks.nth(16)).toContainText("Find Item via Barcode");
  await verifyLinkText(page, buttonLinks, 16, "use-case/locate-an-item-with-barcode/index.html");

  await expect(buttonLinks.nth(17)).toContainText("Collect Images for Debugging");
  await verifyLinkText(page, buttonLinks, 17, "https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/others/debug");

  await expect(buttonLinks.nth(18)).toContainText("Official Online Demo");
  await verifyLinkText(page, buttonLinks, 18, "https://demo.dynamsoft.com/barcode-reader-js/");
});



test('', async ({ page }) => {

});
