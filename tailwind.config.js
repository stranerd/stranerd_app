module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	mode:'jit',
	theme: {
		extend: {
			colors: {
				// Build your palette here
				primary: '#546dd2',
				primaryDark: '#374b99',
				line: '#d7e2ec',
				tags: '#f8f8ff',
				sub: '#4D5C6F',
				dark: '#132740',
				footerDark: '#191c29',
				white: '#fff',
				black: '#000',
		
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
