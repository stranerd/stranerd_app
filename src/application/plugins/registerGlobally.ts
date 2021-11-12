import { IonPage, IonContent, IonButton, IonInput, IonIcon } from '@ionic/vue'

export const registerIonicComponent = async (app: any) => {
	await app.component('ion-page', IonPage)
	await app.component('ion-content', IonContent)
	await app.component('ion-button', IonButton)
	await app.component('ion-input', IonInput)
	await app.component('ion-icon', IonIcon)
}


export const registerComponents = async (app: any)=>{
	const requireComponent = require.context(
		'../components/core',
		true,
		/\.vue$/,
	)


	requireComponent.keys().forEach(async (fileName: any) => {
		const componentConfig = requireComponent(fileName)

		const componentName =fileName
			.split('/')
			.pop()
			.replace(/\.\w+$/, '')

		await app.component(
			componentName,
			componentConfig.default || componentConfig
		)
	})
}
