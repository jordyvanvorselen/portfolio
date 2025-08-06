import { expect } from "@playwright/test";
import { test } from "@/integration-tests/fixtures/pages.fixture";

test.describe("Header Component", () => {
	test("displays header with branding", async ({ homePage }) => {
		await expect(homePage.header.header).toBeVisible();
		await expect(homePage.header.brandingLink).toBeVisible();
		await expect(homePage.header.brandingLink).toHaveText("Jordy van Vorselen");
	});

	test("displays navigation menu", async ({ homePage }) => {
		await expect(homePage.header.aboutLink).toBeVisible();
		await expect(homePage.header.expertiseLink).toBeVisible();
		await expect(homePage.header.projectsLink).toBeVisible();
		await expect(homePage.header.experienceLink).toBeVisible();
		await expect(homePage.header.contactLink).toBeVisible();
	});

	test("displays hire me button", async ({ homePage }) => {
		await expect(homePage.header.hireMeButton).toBeVisible();
		await expect(homePage.header.hireMeButton).toHaveText("Hire Me");
	});
});