import { Locator, Page } from "@playwright/test";

export class Navigation {
	readonly logo: Locator = this.page.getByRole("banner").getByRole("link");

	constructor(public readonly page: Page) {}
}
