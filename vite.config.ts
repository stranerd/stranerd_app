import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import Compression from 'vite-plugin-compression'
import Checker from 'vite-plugin-checker'
import { VitePWA } from 'vite-plugin-pwa'
import * as path from 'path'

const isDev = process.env.NODE_ENV === 'development'
const skipCompression = !!process.env.SKIP_COMPRESSION

const cacheableResponse = { statuses: [0, 200] }
const pwa = VitePWA({
	injectRegister: 'auto',
	registerType: 'autoUpdate',
	includeAssets: ['*'],
	manifest: {
		name: 'Stranerd',
		short_name: 'Stranerd',
		description: 'My Awesome App description',
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
	},
	workbox: {
		runtimeCaching: [
			{
				urlPattern: '/',
				handler: 'NetworkFirst',
				options: { cacheName: 'src', cacheableResponse }
			},
			{
				urlPattern: ({ request }) => request.destination === 'style',
				handler: 'NetworkFirst',
				options: { cacheName: 'styles', cacheableResponse }
			},
			{
				urlPattern: ({ request }) => request.destination === 'script',
				handler: 'NetworkFirst',
				options: { cacheName: 'scripts', cacheableResponse }
			},
			{
				urlPattern: ({ request }) => request.destination === 'image',
				handler: 'CacheFirst',
				options: {
					cacheName: 'images',
					expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
					cacheableResponse
				}
			},
			{
				urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'google-fonts-cache',
					expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
					cacheableResponse
				}
			},
			{
				urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
				handler: 'CacheFirst',
				options: {
					cacheName: 'gstatic-fonts-cache',
					expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
					cacheableResponse
				}
			}
		]
	}
})

pwa

export default defineConfig({
	plugins: [
		{
			name: 'singleHMR',
			handleHotUpdate: ({ modules }) => modules.map((m) => {
				m.importedModules = new Set()
				m.importers = new Set()
				return m
			})
		},
		vue(),
		Pages({
			dirs: 'src/application/views',
			routeStyle: 'nuxt',
			extendRoute: (route: any) => {
				const path = route.path.split('/')
				const lastIndex = path.length - 1
				if (path[lastIndex] && path[lastIndex].includes(':')) path[lastIndex] = path[lastIndex] + '/'
				return { ...route, path: path.join('/') }
			}
		}),
		Components({
			dirs: ['src/application/components/core', 'src/application/layouts'],
			dts: 'src/types/components.d.ts',
			types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
			resolvers: [
				(componentName) => {
					if (componentName.toLowerCase().startsWith('ion')) return {
						name: componentName,
						from: '@ionic/vue'
					}
				}
			]
		}),
		...(!skipCompression ? [Compression({ algorithm: 'brotliCompress' })] : []),
		...(isDev ? [
			Checker({
				typescript: true,
				// vueTsc: true,
				eslint: { lintCommand: 'eslint ./src/**/*.{js,ts,vue}' }
				// stylelint: { lintCommand: 'stylelint ./src/**/*.{css,scss,vue}' }
			})
		] : [])
		// pwa
	],
	build: {
		minify: 'terser'
	},
	resolve: {
		alias: {
			'@root': path.join(__dirname, 'src'),
			'@modules': path.join(__dirname, 'src/modules'),
			'@app': path.join(__dirname, 'src/application'),
			'@utils': path.join(__dirname, 'src/utils'),
			'@': path.join(__dirname, 'src/application')
		}
	},
	server: {
		port: 8080
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import '@app/assets/styles/global.scss';
`
			}
		}
	}
})
