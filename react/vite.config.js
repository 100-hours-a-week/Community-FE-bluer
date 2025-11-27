import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindCSS from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindCSS()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
