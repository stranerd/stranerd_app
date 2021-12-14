module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	mode:'jit',
	theme: {
		screens: {
			'sm': '640px',
 			'md': '768px',
			'lg': '1280px',
			'mmd': '1420px', 
			'2xl': '1536px',

	 
		},
		extend: {
			colors: {
				// Build your palette here
				primary: '#546DD3',
				gray: '#64778A',
				red: '#FF6666',
				pink: '#FF6496',
				butter_yellow: '#FFF7D0',
				yellow_star: '#FFDC00',
				tinted_pink: '#FFECFF',
				light_blue: '#EDF6FF',
				light_gray: '#F7F7FC',
				light_orange: '#FFEEDC',
				light_green: '#E8FFED',
				dark_gray: '#4D5C6F',
				new_gray: '#F2F3F5',
				star_yellow: '#FFD11C',
				icon_inactive: '#8B9EB1',
				faded_gray: '#C7D6E3',
				main_dark: '#132740',
				modal_bg: 'rgba(77, 92, 111, 0.75)',
				delete_red: '#FF6C6C',
				purple: '#C864DC',
				orange: '#FFA84B',
				green: '#00D246'
			},
			  fontFamily: {
				'nuni': ['"Nunito Sans"', 'sans-serif']
			},
	


		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
