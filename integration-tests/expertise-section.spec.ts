import { test, expect } from '@playwright/test';

test.describe('Expertise Section', () => {
  test('displays expertise section', async ({ page }) => {
    await page.goto('/');
    
    const expertiseSection = page.getByRole('region', { name: 'Core Expertise' });
    await expect(expertiseSection).toBeVisible();
    
    const heading = expertiseSection.getByRole('heading', { name: 'What I Excel At' });
    await expect(heading).toBeVisible();
  });
});