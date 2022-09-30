import { fileURLToPath, URL } from 'url';

import preprocess from 'svelte-preprocess';

import adapter from '@sveltejs/adapter-auto';

const scssAliases = (aliases) => (url) => {
	for (const [alias, aliasPath] of Object.entries(aliases)) {
		if (url.indexOf(alias) === 0) {
			return {
				file: url.replace(alias, aliasPath)
			};
		}
	}
	return url;
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			importer: [
				scssAliases({
					'@src': fileURLToPath(new URL('./src', import.meta.url))
				})
			]
		}
	}),

	kit: {
		adapter: adapter(),
		alias: {
			'@src/*': 'src/*',
			'@mocks/*': '__mocks__/*'
		}
	}
};

export default config;
