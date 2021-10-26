module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
	rules: {
		'vue/no-v-html': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'no-tabs': 'off',
		'no-var': 'error',
		'accessor-pairs': 'off',
		'no-use-before-define': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		semi: ['error', 'never'],
		quotes: ['error', 'single'],
		'prefer-const': ['error'],
		'arrow-parens': ['error', 'always'],
		'no-return-assign': 'off',
		curly: 'off',
		'vue/html-indent': ['warn', 'tab', {
			attribute: 1,
			baseIndent: 1,
			closeBracket: 0,
			alignAttributesVertically: true,
			ignores: []
		}],
		'vue/no-mutating-props': 'off',
		'object-property-newline': 'off',
		'require-atomic-updates': 'off',
		'require-await': 'off'
	},
	overrides: [
		{
			files: ['tests/**/*.[jt]s?(x)', 'tests/**/*.spec.[jt]s?(x)'],
			env: {
				jest: true
			}
		}
	],
	ignorePatterns: [
		'src/application/static/sw.js'
	]
}
