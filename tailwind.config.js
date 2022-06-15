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
			colors: {
				// Build your palette here
				...newColors,
				primary: '#162565',
				white: '#FEFEFE',
				black: '#111B25',
				blue: '#1997DE',
				cyan: '#54B5D3',
				gray: '#64778A',
				red: '#FF6666',
				line: '#EBECEE',
				pink: '#FF6496',
				yellow_star: '#FFD11C',
				light_gray: '#F1F3F7',
				dark_gray: '#4D5C6F',
				new_gray: '#F2F3F5',
				icon_inactive: '#8B9EB1',
				faded_gray: '#C7D6E3',
				main_dark: '#05090D',
				purple: '#C864DC',
				orange: '#FFA84B',
				green: '#00D246'
			}
		}
	},
	plugins: []
}
