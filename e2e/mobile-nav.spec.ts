import { expect, test } from '@playwright/test';

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => sessionStorage.setItem('ohealth-splash-seen', '1'));
    await page.reload();
  });

  test('hides page content behind the menu and closes with Escape', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Open menu' });
    await toggle.click();

    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#main-content')).toHaveAttribute('aria-hidden', 'true');
    await expect(page.locator('#site-footer')).toHaveAttribute('aria-hidden', 'true');
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#main-content')).not.toHaveAttribute(
      'aria-hidden',
      'true',
    );
    await expect(page.locator('#site-footer')).not.toHaveAttribute('aria-hidden', 'true');
  });
});
