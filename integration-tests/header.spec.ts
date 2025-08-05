import { expect } from "@playwright/test";
import { test } from "@/integration-tests/fixtures/pages.fixture";

test.describe("Header Component", () => {
	test("displays header with branding", async ({ homePage }) => {
		await expect(homePage.header.header).toBeVisible();
		await expect(homePage.header.brandingLink).toBeVisible();
		await expect(homePage.header.brandingLink).toHaveText("Jordy van Vorselen");
	});
});