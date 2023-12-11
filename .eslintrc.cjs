/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
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
