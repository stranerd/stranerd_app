const path = require("path");
module.exports = {
	runtimeCompiler: true,
	
	  css: {
		loaderOptions: {
			sass: {
				additionalData: `
         @import '@/application/assets/styles/global.scss';
        `
			}
		}
	},

	  configureWebpack: {
		resolve: {
			alias: {
				"@/*": path.resolve(__dirname, "./src"),
				"@app/*": path.resolve(__dirname, "src/application/*"),
				"@/modules/*": path.resolve(__dirname, "src/modules/*"),
				"@/utils/*": path.resolve(__dirname, "src/utils/*"),
			},
			extensions: ['.js', '.vue', '.json', '.ts']
		}
	}
}