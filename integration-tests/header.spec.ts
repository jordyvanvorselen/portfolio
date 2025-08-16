import { expect } from '@playwright/test'
import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Header Component', () => {
  test('displays header with branding', async ({ homePage }) => {
    await expect(homePage.header.section).toBeVisible()
    await expect(homePage.header.brandingLink).toBeVisible()
    await expect(homePage.header.brandingLink).toHaveText('Jordy van Vorselen')
  })

  test('displays navigation menu', async ({ homePage }) => {
    await expect(homePage.header.homeLink).toBeVisible()
    await expect(homePage.header.blogLink).toBeVisible()
    await expect(homePage.header.projectsLink).toBeVisible()
    await expect(homePage.header.experienceLink).toBeVisible()
    await expect(homePage.header.contactLink).toBeVisible()
  })

  test('displays hire me button', async ({ homePage }) => {
    await expect(homePage.header.hireMeButton).toBeVisible()
    await expect(homePage.header.hireMeButton).toContainText('Hire')
  })

  test('displays social icons', async ({ homePage }) => {
    await expect(homePage.header.githubLink).toBeVisible()
    await expect(homePage.header.linkedinLink).toBeVisible()
  })

  test('branding link navigates to home page', async ({ homePage }) => {
    await homePage.header.brandingLink.click()
    await expect(homePage.page).toHaveURL('/')
  })

  test('navigation links navigate to correct pages', async ({ homePage }) => {
    await homePage.header.homeLink.click()
    await expect(homePage.page).toHaveURL('/')

    await homePage.header.blogLink.click()
    await expect(homePage.page).toHaveURL('/blog')

    await homePage.page.goBack()
    await homePage.header.projectsLink.click()
    await expect(homePage.page).toHaveURL('/projects')

    await homePage.page.goBack()
    await homePage.header.experienceLink.click()
    await expect(homePage.page).toHaveURL('/experience')

    await homePage.page.goBack()
    await homePage.header.contactLink.click()
    await expect(homePage.page).toHaveURL('/contact')
  })

  test('external social links open in new tab', async ({
    homePage,
    context,
  }) => {
    const [githubPage] = await Promise.all([
      context.waitForEvent('page'),
      homePage.header.githubLink.click(),
    ])

    await expect(githubPage).toHaveURL('https://github.com/jordyvanvorselen')
    await githubPage.close()

    const [linkedinPage] = await Promise.all([
      context.waitForEvent('page'),
      homePage.header.linkedinLink.click(),
    ])

    await expect(linkedinPage.url()).toContain('linkedin.com')
    await expect(linkedinPage.url()).toContain('jordy-van-vorselen')
    await linkedinPage.close()
  })

  test('hire me button is clickable', async ({ homePage }) => {
    await expect(homePage.header.hireMeButton).toBeEnabled()
    await homePage.header.hireMeButton.click()
  })

  test('header visual regression', async ({ homePage }) => {
    await expect(homePage.header.section).toHaveScreenshot('header.png')
  })
})
