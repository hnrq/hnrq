import { fileURLToPath, URL } from 'url';

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'@mocks': fileURLToPath(new URL('./__mocks__', import.meta.url)),
			'@src': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	plugins: [sveltekit()],
	test: {
		environment: 'happy-dom',
		setupFiles: ['tests/setup.ts'],
		globals: true
	}
});
