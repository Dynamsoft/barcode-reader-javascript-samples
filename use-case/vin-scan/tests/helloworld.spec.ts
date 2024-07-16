import { test, expect } from "@playwright/test";

const URL =
  "https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/hello-world.html";

test.describe("Vanilla Hellow World Page", () => {
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

    // Navigate to the barcode scanning test site
    await page.goto(URL);
  });

  test("should open the page and have correct title", async ({ page }) => {
    // Verify title
    const title = await page.title();
    await expect(title).toBe(
      `Dynamsoft Barcode Reader Sample - Hello World (Decode via Camera)`
    );
  });

  test("should have correct resolution selected", async ({ page }) => {
    await page.waitForTimeout(2000);

    const isDefined = await page.evaluate(() => {
      return typeof cameraEnhancer !== "undefined";
    });

    console.log(
      isDefined ? "cameraEnhancer is defined" : "cameraEnhancer is not defined"
    );

    const resolution = await page.evaluate(() => {
      const res = cameraEnhancer.getResolution();
      return { width: res.width, height: res.height };
    });

    console.log(
      `Current Resolution: ${resolution.height} x ${resolution.width} `
    );

    const allResolutions = await page.evaluate(async () => {
      if (typeof cameraEnhancer.getAvailableResolutions === "function") {
        const availableResolutions =
          await cameraEnhancer.getAvailableResolutions();

        return availableResolutions;
        // return [{ width: 1920, height: 1080 }, { width: 1280, height: 720 }];
      } else {
        throw new Error(
          "getAvailableResolutions method is not defined on cameraEnhancer"
        );
      }
    });

    console.log(`All Res: ${JSON.stringify(allResolutions)}`);
  });
});
