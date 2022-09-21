const path = require('path')
const zlib = require('zlib')
const Components = require('unplugin-vue-components/webpack')

module.exports = {
	runtimeCompiler: true,
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import '@app/assets/styles/global.scss';
`
			}
		}
	},
	configureWebpack: {
		plugins: [
			Components({
				dirs: ['src/application/components/core', 'src/application/layouts'],
				dts: true,
				types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
				resolvers: [
					(componentName) => {
						if (componentName.toLowerCase().startsWith('ion')) return {
							name: componentName,
							from: '@ionic/vue'
						}
					}
				]
			})
		]
	},
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@root', path.join(__dirname, 'src'))
			.set('@modules', path.join(__dirname, 'src/modules'))
			.set('@app', path.join(__dirname, 'src/application'))
			.set('@utils', path.join(__dirname, 'src/utils'))
			.set('@', path.join(__dirname, 'src/application'))
	},
	pwa: {
		name: 'Stranerd',
		themeColor: 'rgb(22, 37, 101)',
		msTileColor: '#FFFFFF',
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: './public/service_worker.js'
		},
		manifestOptions: {
			name: 'Stranerd',
			short_name: 'Stranerd',
			start_url: '.',
			theme_color: 'rgb(22, 37, 101)',
			background_color: '#FFFFFF',
			display: 'standalone',
			orientation: 'portrait-primary',
			icons: [
				{
					src: './images/icons/android-chrome-192x192.png',
					size: '192x192',
					type: 'image/png'
				},
				{
					src: './images/icons/android-chrome-512x512.png',
					size: '512x512',
					type: 'image/png'
				},
				{
					src: './images/icons/android-chrome-maskable-192x192.png',
					size: '192x192',
					type: 'image/png',
					purpose: 'maskable'
				},
				{
					src: './images/icons/android-chrome-maskable-512x512.png',
					size: '512x512',
					type: 'image/png',
					purpose: 'maskable'
				},
				{
					src: './images/icons/apple-touch-icon-60x60.png',
					size: '60x60',
					type: 'image/png'
				},
				{
					src: './images/icons/apple-touch-icon-76x76.png',
					size: '76x76',
					type: 'image/png'
				},
				{
					src: './images/icons/apple-touch-icon-120x120.png',
					size: '120x120',
					type: 'image/png'
				},
				{
					src: './images/icons/apple-touch-icon-152x152.png',
					size: '152x152',
					type: 'image/png'
				},
				{
					src: './images/icons/apple-touch-icon-180x180.png',
					size: '180x180',
					type: 'image/png'
				},
				{
					src: './images/icons/apple-touch-icon.png',
					size: '180x180',
					type: 'image/png'
				},
				{
					src: './images/icons/favicon-16x16.png',
					size: '16x16',
					type: 'image/png'
				},
				{
					src: './images/icons/favicon-32x32.png',
					size: '32x32',
					type: 'image/png'
				},
				{
					src: './images/icons/msapplication-icon-144x144.png',
					size: '144x144',
					type: 'image/png'
				},
				{
					src: './images/icons/mstile-150x150.png',
					size: '150x150',
					type: 'image/png'
				}
			]
		}
	},
	pluginOptions: {
		compression: {
			brotli: {
				filename: '[file].br[query]',
				algorithm: 'brotliCompress',
				include: /\.(js|css|html|svg|json)(\?.*)?$/i,
				compressionOptions: {
					params: {
						[zlib.constants.BROTLI_PARAM_QUALITY]: 11
					}
				},
				minRatio: 0.8
			},
			gzip: {
				filename: '[file].gz[query]',
				algorithm: 'gzip',
				include: /\.(js|css|html|svg|json)(\?.*)?$/i,
				minRatio: 0.8
			}
		}
	}
}
