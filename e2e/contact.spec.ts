import { expect, test, type Page } from '@playwright/test';

async function waitForContactForm(page: Page) {
  await expect(page.getByRole('button', { name: 'Send Message' })).toBeEnabled({
    timeout: 15_000,
  });
}

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await waitForContactForm(page);
  });

  test('shows validation errors when submitted empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Full name is required.')).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByText('Email address is required.')).toBeVisible();
    await expect(page.getByText('Message is required.')).toBeVisible();
  });

  test('shows email validation error for invalid address', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Jane Doe');
    await page.getByLabel('Email Address').fill('not-an-email');
    await page.getByLabel('Message').fill('Hello from Playwright.');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  });

  test('keeps honeypot field out of the tab order', async ({ page }) => {
    const honeypot = page.locator('input[name="_hp"]');
    await expect(honeypot).toBeHidden();
    await expect(honeypot).toHaveAttribute('tabindex', '-1');
  });

  test('preserves filled fields when validation fails', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Jane Doe');
    await page.getByLabel('Email Address').fill('jane@example.com');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Message is required.')).toBeVisible();
    await expect(page.getByLabel('Full Name')).toHaveValue('Jane Doe');
    await expect(page.getByLabel('Email Address')).toHaveValue('jane@example.com');
  });

  test('accepts a mononym full name', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Madonna');
    await page.getByLabel('Email Address').fill('madonna@example.com');
    await page.getByLabel('Message').fill('Hello from Playwright.');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText(/we've received your message/i)).toBeVisible({
      timeout: 15_000,
    });
  });

  test('submits successfully with mocked Resend', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Jane Doe');
    await page.getByLabel('Email Address').fill('jane@example.com');
    await page.getByLabel('Message').fill('Hello from Playwright E2E.');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText(/we've received your message/i)).toBeVisible({
      timeout: 15_000,
    });
  });
});

test.describe('Contact rate limit', () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ extraHTTPHeaders: { 'x-forwarded-for': '203.0.113.42' } });

  test('shows rate-limit message after repeated submissions', async ({ page }) => {
    await page.goto('/contact');
    await waitForContactForm(page);

    for (let i = 0; i < 5; i++) {
      await page.getByLabel('Full Name').fill('Jane Doe');
      await page.getByLabel('Email Address').fill(`jane${i}@example.com`);
      await page.getByLabel('Message').fill(`Rate limit probe ${i}`);
      await page.getByRole('button', { name: 'Send Message' }).click();
      await expect(page.getByText(/we've received your message/i)).toBeVisible({
        timeout: 15_000,
      });
      await page.reload();
      await waitForContactForm(page);
    }

    await page.getByLabel('Full Name').fill('Jane Doe');
    await page.getByLabel('Email Address').fill('jane6@example.com');
    await page.getByLabel('Message').fill('One too many');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(
      page.getByText('Too many messages sent. Please wait an hour and try again.'),
    ).toBeVisible({ timeout: 15_000 });
  });
});
