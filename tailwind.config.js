const newColors = {
	primaryBg: 'var(--clr-primaryBg)',
	primaryText: 'var(--clr-primaryText)',
	primaryHover: 'var(--clr-primaryHover)',
	bodyBg: 'var(--clr-bodyBg)',
	bodyText: 'var(--clr-bodyText)',
	itemBg: 'var(--clr-itemBg)',
	secondaryText: 'var(--clr-secondaryText)',
	disabled: 'var(--clr-disabled)',
	outlineHover: 'var(--clr-outlineHover)',
	contrast: 'var(--clr-contrast)',
	highlight: 'var(--clr-highlight)',
	success: 'var(--clr-success)',
	danger: 'var(--clr-danger)',
	info: 'var(--clr-info)',
	warning: 'var(--clr-warning)',
	royal: 'var(--clr-royal)'
}

module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'Media',
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1280px',
			xl: '1420px',
			'2xl': '1536px'
		},
		extend: {
			colors: newColors,
			boxShadow: {
				card: '0px 4px 8px rgba(22, 37, 101, 0.1)'
			},
			flex: {
				'2': '2 2 0%',
				'3': '3 3 0%'
			}
		}
	},
	plugins: []
}
