
export const registerComponentGlobally = (app: any, folder: string)=>{

	const regex = new RegExp(`/${folder}[A-Z]w+.(vue|js)$/`)
	const requireComponent = require.context(
		'../components',
		true,
		regex
	)

	console.log(requireComponent)


	requireComponent.keys().forEach((fileName: any) => {
		const componentConfig = requireComponent(fileName)

		const componentName: any =
			fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')


		app.component(
			componentName,
			componentConfig.default || componentConfig
		)
	})

}
