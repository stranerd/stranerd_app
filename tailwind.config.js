module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	mode:'jit',
	theme: {
		colors: {
			// Build your palette here
			primary: '#546dd2',
			primaryDark: '#374b99',
			line: '#d7e2ec',
			tags: '#f8f8ff',
			sub: '#d7e2ec',
			dark: '#132740',
			footerDark: '#191c29',
    
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
