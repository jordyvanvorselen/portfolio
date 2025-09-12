import react from "@vitejs/plugin-react"

import path from "node:path"
import { defineConfig as defineViteConfig } from "vite"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig, mergeConfig } from "vitest/config"

// Create a base Vite config with plugins
const viteConfig = defineViteConfig({
	plugins: [react(), svgr(), tsconfigPaths()],
})

// Merge with Vitest config
export default mergeConfig(
	viteConfig,
	defineConfig({
		resolve: {
			alias: {
				// Ignore server-only imports
				"server-only": path.resolve(__dirname, "package.json"),
			},
		},
		test: {
			environment: "jsdom",
			globals: true,
			setupFiles: ["./test/setup.tsx"],

			include: [
				"./src/**/*.spec.tsx",
				"./src/**/*.spec.ts",
				"./test/msw/**/*.spec.tsx",
				"./test/msw/**/*.spec.ts",
			],
			coverage: {
				enabled: true,
				provider: "v8",
				reporter: ["text", "lcov"],
				exclude: [
					// Dot and config files
					".*",
					"*.config.{ts,tsx,js,cjs,mjs}",
					"*rc.{cjs,js,mjs,ts,tsx}",

					// TS definition
					"**/*.d.ts",

					// Testing
					"**/*.spec.{ts,tsx}",
					"test/**",
					"integration-tests/**",

					// Project specific
					"public/**",
					"src/app/**",
					"src/i18n/**",
					"src/test/**",
				],
			},
		},
	}),
)