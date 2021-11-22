import { IonButton, IonContent, IonIcon, IonInput, IonPage, IonText, IonLabel } from '@ionic/vue'
import { definePlugin } from '@app/plugins/index'

export const registerIonicComponent = definePlugin(async ({ app }) => {
	app.component('ion-page', IonPage)
	app.component('ion-content', IonContent)
	app.component('ion-button', IonButton)
	app.component('ion-input', IonInput)
	app.component('ion-icon', IonIcon)
	app.component('ion-text', IonText)
	app.component('ion-label', IonLabel)
})

export const registerComponents = definePlugin(async ({ app }) => {
	const contexts = [
		require.context('../components/core', true, /\.vue$/),
		require.context('../layouts/', true, /\.vue$/)
	]

	contexts.forEach((context) => {
		context.keys().map(async (fileName) => {
			const componentConfig = context(fileName)

			const componentName = fileName.split('/').pop()?.replace(/\.\w+$/, '') ?? ''

			app.component(componentName, componentConfig.default || componentConfig)
		})
	})
})
