import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
	plugins: [vue()],
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
