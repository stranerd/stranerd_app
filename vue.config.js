const path = require('path')
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
	}
}
