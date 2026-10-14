import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
	base: mode === 'github' ? '/ccgrowth/' : '/',
	plugins: mode === 'github' ? [] : [cloudflare()],
}));
