module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	mode:'jit',
	theme: {
		extend: {
			colors: {
				// Build your palette here
				primary: '#546DD3',
				green: '#3DFF64',
				butter_yellow: '#FFF7D0',
				tinted_pink: '#FFECFF',
				light_blue: '#EDF6FF',
				light_gray: '#F7F7FC',
				light_orange: '#FFEEDC',
				light_green: '#E8FFED',
				dark_gray: '#4D5C6F',
				star_yellow: '#FFD11C',
				icon_inactive: '#8B9EB1',
				faded_gray: '#C7D6E3',
				main_dark: '#132740',
				modal_bg: 'rgba(77, 92, 111, 0.75)'
			},
			  fontFamily: {
				'nuni': ['"Nunito Sans"', 'sans-serif']
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
