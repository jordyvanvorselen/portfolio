import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
	it("renders branding link with correct text", () => {
		render(<Header />);
		
		const brandingLink = screen.getByRole("link", { name: "Jordy van Vorselen" });
		expect(brandingLink).toBeInTheDocument();
	});
});