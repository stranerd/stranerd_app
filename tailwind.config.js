module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
				primary: '#546DD3',
				white: '#FEFEFE',
				black: '#111B25',
				blue: '#1997DE',
				cyan: '#54B5D3',
				gray: '#64778A',
				red: '#FF6666',
				line: '#EBECEE',
				pink: '#FF6496',
				yellow_star: '#FFD11C',
				light_gray: '#FCFCFC',
				dark_gray: '#4D5C6F',
				new_gray: '#F2F3F5',
				icon_inactive: '#8B9EB1',
				faded_gray: '#C7D6E3',
				main_dark: '#132740',
				purple: '#C864DC',
				orange: '#FFA84B',
				green: '#00D246'
			},
			fontFamily: {
				rale: ['Raleway', 'sans-serif']
			}
		}
	},
	plugins: []
}
