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
	}
}