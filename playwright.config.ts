import { defineConfig, devices } from '@playwright/test';
import * as path from "path";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: [
            "--disable-web-security",
            "--enable-web-rtc",
            "--headless=chrome",
            "--use-fake-device-for-media-stream",
            // "--use-fake-ui-for-media-stream",
            `--use-file-for-fake-video-capture=${path.join(__dirname, './tests/video-src/sample.y4m')}`,
          ],
        },
        contextOptions: {
          /* Camera permission */
          permissions: ["camera"],
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        launchOptions: {
          "devtools": true,
          "headless": true,
          args: [
            "--use-fake-device-for-media-stream", 
            "--use-fake-ui-for-media-stream", 
            "--headless=firefox",
            "--disable-web-security",
            "--enable-web-rtc"],
          firefoxUserPrefs: {
            "permissions.default.camera": 1, // Allow camera access automatically
            "media.navigator.streams.fake": true, // Use fake streams if needed
            "devtools.debugger.remote-enabled": true,
            "devtools.debugger.prompt-connection": false,
            "devtools.chrome.enabled": true,
            "datareporting.policy.firstRunURL": ""
          },
        },
      },
    },
    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //     launchOptions: {
    //       args: ["--disable-web-security", "--enable-web-rtc"],
    //     },
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start",
  },
});
