module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	mode:'jit',
	theme: {
		extend: {
			colors: {
				// Build your palette here
				primary: '#546DD3',
				butter_yellow: '#FFF7D0',
				tinted_pink: '#FFECFF',
				light_blue: '#EDF6FF',
				light_gray: '#F7F7FC',
				light_orange: '#FFEEDC',
				light_green: '#E8FFED',
				dark_grey: '#4D5C6F',
				star_yellow: '#FFD11C',
				icon_inactive: '#8B9EB1',
				light_grey: '#C7D6E3'
			},
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
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
