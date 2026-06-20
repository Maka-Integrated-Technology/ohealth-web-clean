import { expect, test } from '@playwright/test';

test.describe('App splash', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.removeItem('ohealth-splash-seen'));
  });

  test('shows on first visit and can be skipped', async ({ page }) => {
    await page.goto('/');

    const splash = page.getByRole('dialog', { name: 'Welcome to OHealth+' });
    await expect(splash).toBeVisible();
    await page.getByRole('button', { name: 'Skip' }).click();
    await expect(splash).not.toBeVisible();
  });

  test('does not replay in the same session after skip', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Skip' }).click();
    await page.goto('/contact');
    await page.goto('/');

    await expect(
      page.getByRole('dialog', { name: 'Welcome to OHealth+' }),
    ).not.toBeVisible();
  });
});
