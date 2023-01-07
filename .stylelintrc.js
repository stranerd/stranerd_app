const ignoreAtRules = [
	"each",
	"tailwind",
	"extend",
	"apply",
	"variants",
	"responsive",
	"screen"
]

module.exports = {
	"extends": [
		"stylelint-config-standard",
		"stylelint-config-standard-scss",
		"stylelint-config-recommended-vue"
	],
	"plugins": [
		"stylelint-scss"
	],
	"rules": {
		"at-rule-empty-line-before": [
			"always",
			{
				"except": "inside-block"
			}
		],
		"selector-list-comma-newline-before": "never-multi-line",
		"selector-list-comma-newline-after": "never-multi-line",
		"selector-list-comma-space-after": "always",
		"at-rule-no-unknown": [true, { ignoreAtRules }],
		"scss/at-rule-no-unknown": [true, { ignoreAtRules }],
		"no-descending-specificity": null,
		"selector-class-pattern": null,
		"custom-property-pattern": null,
		"scss/dollar-variable-pattern": null,
		"indentation": ["tab", { "baseIndentLevel": 0 }],
		"scss/at-extend-no-missing-placeholder": null,
		"max-line-length": 150
	}
}
