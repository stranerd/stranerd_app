import { definePlugin } from '@app/plugins/index';
import { IonButton, IonContent, IonIcon, IonInput, IonLabel, IonPage, IonText } from '@ionic/vue';

export const registerIonicComponent = definePlugin(async ({ app }) => {
	app.component('IonPage', IonPage)
	app.component('IonContent', IonContent)
	app.component('IonButton', IonButton)
	app.component('IonInput', IonInput)
	app.component('IonIcon', IonIcon)
	app.component('IonText', IonText)
	app.component('IonLabel', IonLabel)
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
