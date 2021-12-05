const path = require('path')
module.exports = {
	runtimeCompiler: true,
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
         @import '@app/assets/styles/global.scss';
        `
			}
		}
	},
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@root', path.join(__dirname, 'src'))
			.set('@modules', path.join(__dirname, 'src/modules'))
			.set('@app', path.join(__dirname, 'src/application'))
			.set('@utils', path.join(__dirname, 'src/utils'))
			.set('@', path.join(__dirname, 'src/application'))
	},
	devServer: {
		disableHostCheck: true
	}
}
