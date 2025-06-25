import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		{ ...threeMinifier(), enforce: 'pre' }, // <=== Add plugin here
		sveltekit(),
		devtoolsJson()
	]
});
