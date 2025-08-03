import { Page } from "@playwright/test";

import { Navigation } from "@/integration-tests/pages/navigation.page";

export class BasePage {
	readonly navigation: Navigation = new Navigation(this.page);

	constructor(public readonly page: Page) {}
}
