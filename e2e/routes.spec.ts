import { expect, test } from '@playwright/test';

const PUBLIC_ROUTES = [
  '/',
  '/for-professionals',
  '/faq',
  '/contact',
  '/privacy',
  '/terms',
] as const;

const STUB_ROUTES = ['/blog', '/careers'] as const;

for (const path of PUBLIC_ROUTES) {
  test(`public route renders: ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('#main-content')).toBeVisible();
  });
}

for (const path of STUB_ROUTES) {
  test(`stub route renders: ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('#main-content')).toBeVisible();
  });
}
