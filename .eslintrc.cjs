module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint', 'simple-import-sort', 'import'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'internal', 'unknown'],
				pathGroups: [
					{
						pattern: 'svelte*',
						group: 'external',
						position: 'before'
					},
					{ pattern: '@src', group: 'internal', position: 'after' },
					{ pattern: '@mocks', group: 'internal', position: 'after' }
				],
				pathGroupsExcludedImportTypes: ['svelte'],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true
				}
			}
		]
	}
};
