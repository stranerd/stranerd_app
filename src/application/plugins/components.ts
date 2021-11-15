import { IonButton, IonContent, IonIcon, IonInput, IonPage } from '@ionic/vue'
import { definePlugin } from '@app/plugins/index'

<<<<<<< HEAD
export const registerIonicComponent = definePlugin(async (app) => {
	await app.component('ion-page', IonPage)
	await app.component('ion-content', IonContent)
	await app.component('ion-button', IonButton)
	await app.component('ion-input', IonInput)
	await app.component('ion-icon', IonIcon)
})

export const registerComponents = definePlugin(async (app) => {
=======
export const registerIonicComponent = definePlugin(async ({ app }) => {
	app.component('ion-page', IonPage)
	app.component('ion-content', IonContent)
	app.component('ion-button', IonButton)
	app.component('ion-input', IonInput)
	app.component('ion-icon', IonIcon)
})

export const registerComponents = definePlugin(async ({ app }) => {
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	const contexts = [
		require.context('../components/core', true, /\.vue$/),
		require.context('../layouts/', true, /\.vue$/)
	]

	contexts.forEach((context) => {
		context.keys().map(async (fileName) => {
			const componentConfig = context(fileName)

			const componentName = fileName.split('/').pop()?.replace(/\.\w+$/, '') ?? ''

<<<<<<< HEAD
			await app.component(componentName, componentConfig.default || componentConfig)
=======
			app.component(componentName, componentConfig.default || componentConfig)
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
		})
	})
})
