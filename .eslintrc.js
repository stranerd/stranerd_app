module.exports = {
  root: true,
  env: {
    browser: true,
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
rules: {
		'vue/no-v-html': 'off',
		'vue/no-deprecated-slot-attribute': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'no-tabs': 'off',
		'no-var': 'error',
		'accessor-pairs': 'off',
		'no-use-before-define': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-mixed-spaces-and-tabs': ['off', 'smart-tabs'],
		semi: ['off', 'never'],
		quotes: ['off', 'single'],
		'prefer-const': ['error'],
		'arrow-parens': ['error', 'always'],
		'no-return-assign': 'off',
     "no-use-before-define": "off",
   "@typescript-eslint/no-use-before-define": ["off"],
    "camelcase": "off",
    "@typescript-eslint/camelcase": ["off"],
    '@typescript-eslint/no-non-null-assertion': 'off',
		curly: 'off',
     "no-empty-function": "off",
     "no-empty": "off",
  "@typescript-eslint/no-empty-function": ["off"],
  "@typescript-eslint/ban-ts-ignore": ["off"],
		"@typescript-eslint/member-delimiter-style": ["off", {
      multiline: {
        delimiter: 'none',    // 'none' or 'semi' or 'comma'
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',    // 'semi' or 'comma'
        requireLast: false,
      },
    }],
		'vue/html-indent': ['off', 'tab', {
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
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
