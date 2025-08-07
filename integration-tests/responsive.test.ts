import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test.describe('Mobile (375px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
    });

    test('header should be mobile-friendly', async ({ page }) => {
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // Header should not overflow
      const headerBox = await header.boundingBox();
      expect(headerBox?.width).toBeLessThanOrEqual(375);
      
      // All navigation links should be accessible
      await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Expertise' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Experience' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    });

    test('hero section should stack vertically', async ({ page }) => {
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();
      
      // Hero content should not overflow
      const heroBox = await heroSection.boundingBox();
      expect(heroBox?.width).toBeLessThanOrEqual(375);
      
      // Hero action buttons should be accessible
      const getInTouchBtn = page.getByRole('button', { name: 'Get in Touch' });
      const downloadResumeBtn = page.getByRole('button', { name: 'Download Resume' });
      
      await expect(getInTouchBtn).toBeVisible();
      await expect(downloadResumeBtn).toBeVisible();
    });
  });

  test.describe('Tablet (768px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
    });

    test('header should show condensed navigation', async ({ page }) => {
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // Header should fit within tablet width
      const headerBox = await header.boundingBox();
      expect(headerBox?.width).toBeLessThanOrEqual(768);
      
      // Navigation should be visible but potentially condensed
      const navigation = page.getByRole('navigation');
      await expect(navigation).toBeVisible();
    });

    test('hero section should be optimized for tablet', async ({ page }) => {
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();
      
      // Hero content should not overflow
      const heroBox = await heroSection.boundingBox();
      expect(heroBox?.width).toBeLessThanOrEqual(768);
    });
  });

  test.describe('Desktop (1200px+)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.goto('/');
    });

    test('header should show full navigation', async ({ page }) => {
      const header = page.getByRole('banner');
      await expect(header).toBeVisible();
      
      // Full navigation should be visible
      const navigation = page.getByRole('navigation');
      await expect(navigation).toBeVisible();
      
      // All navigation items should be visible
      await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Expertise' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Experience' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    });

    test('hero section should use full layout', async ({ page }) => {
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();
      
      // Hero actions should be side by side
      const getInTouchBtn = page.getByRole('button', { name: 'Get in Touch' });
      const downloadResumeBtn = page.getByRole('button', { name: 'Download Resume' });
      
      await expect(getInTouchBtn).toBeVisible();
      await expect(downloadResumeBtn).toBeVisible();
    });
  });
});