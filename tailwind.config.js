const newColors = {
	primaryBg: 'var(--clr-primaryBg)',
	primaryText: 'var(--clr-primaryText)',
	primaryHover: 'var(--clr-primaryHover)',
	bodyBg: 'var(--clr-bodyBg)',
	bodyText: 'var(--clr-bodyText)',
	headerBg: 'var(--clr-headerBg)',
	headerText: 'var(--clr-headerText)',
	itemBg: 'var(--clr-itemBg)',
	secondaryText: 'var(--clr-secondaryText)',
	disabled: 'var(--clr-disabled)',
	outlineHover: 'var(--clr-outlineHover)',
	success: 'var(--clr-success)',
	danger: 'var(--clr-danger)',
	info: 'var(--clr-info)',
	warning: 'var(--clr-warning)'
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
			colors: newColors
		}
	},
	plugins: []
}
