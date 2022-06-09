import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import * as path from 'path'

export default defineConfig({
	plugins: [
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
	],
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
