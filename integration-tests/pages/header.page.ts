import { Locator, Page } from "@playwright/test";

export class HeaderPage {
	readonly header: Locator = this.page.getByRole("banner");
	readonly brandingLink: Locator = this.header.getByRole("link", { name: "Jordy van Vorselen" });
	readonly aboutLink: Locator = this.header.getByRole("link", { name: "About" });
	readonly expertiseLink: Locator = this.header.getByRole("link", { name: "Expertise" });
	readonly projectsLink: Locator = this.header.getByRole("link", { name: "Projects" });
	readonly experienceLink: Locator = this.header.getByRole("link", { name: "Experience" });
	readonly contactLink: Locator = this.header.getByRole("link", { name: "Contact" });
	readonly hireMeButton: Locator = this.header.getByRole("button", { name: "Hire Me" });
	readonly githubLink: Locator = this.header.getByRole("link", { name: "GitHub" });
	readonly linkedinLink: Locator = this.header.getByRole("link", { name: "LinkedIn" });

	constructor(public readonly page: Page) {}

	async goto(): Promise<HeaderPage> {
		await this.page.goto("/");
		return this;
	}
}