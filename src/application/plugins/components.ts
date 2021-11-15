import { IonButton, IonContent, IonIcon, IonInput, IonPage } from '@ionic/vue'
import { definePlugin } from '@app/plugins/index'

export const registerIonicComponent = definePlugin(async (app) => {
	await app.component('ion-page', IonPage)
	await app.component('ion-content', IonContent)
	await app.component('ion-button', IonButton)
	await app.component('ion-input', IonInput)
	await app.component('ion-icon', IonIcon)
})

export const registerComponents = definePlugin(async (app) => {
	const contexts = [
		require.context('../components/core', true, /\.vue$/),
		require.context('../layouts/', true, /\.vue$/)
	]

	contexts.forEach((context) => {
		context.keys().map(async (fileName) => {
			const componentConfig = context(fileName)

			const componentName = fileName.split('/').pop()?.replace(/\.\w+$/, '') ?? ''

			await app.component(componentName, componentConfig.default || componentConfig)
		})
	})
})
