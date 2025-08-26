import { browser } from 'k6/browser';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  scenarios: {
    browser_and_protocol: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  // Go to the login page
  await page.goto('https://app-dev.auditmypayroll.com.au/')
  await page.locator('button[type="button"]').click();
  console.log('Navigated to login page');

  // Fill in login form (update selectors as needed)
  await page.locator('input[name="Email Address"]').fill('pkyaw@dight.ai');
  await page.locator('input[name="Password"]').fill('Def@u1tPW');
  await page.locator('button[type="submit"]').click();
  console.log('Submitted login form');

  // Wait for dashboard to load (update selector as needed)
  await page.waitForSelector('//h3[@class="sub-title"]', { timeout: 60000 });

  // Check dashboard content
  const title = page.locator('//h3[@class="sub-title"]');
  check(title, {
    'is visible' : (t) => t.isVisible()
  });
  const text = await title.textContent();
  check(text, {
    'contains Payroll': (txt) => txt && txt.includes('Payroll'),
  });
  console.log('Page title: ' + text);
  await page.close();
}

export function handleSummary(data) {
  return {
    "../reports/browser-summary.html": htmlReport(data, { title: "Browser Performance Test Report" }),
  };
}
