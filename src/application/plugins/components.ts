import { IonButton, IonContent, IonIcon, IonInput, IonLabel, IonPage, IonText } from '@ionic/vue'
import { definePlugin } from '@app/plugins/index'

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
		...Object.entries(import.meta.glob('../components/core/**/*.vue')),
		...Object.entries(import.meta.glob('../layouts/**/*.vue'))
	]

	await Promise.all(contexts.map(async ([key, importFn]) => {
		const componentName = key.split('/').pop()?.replace(/\.\w+$/, '') ?? ''
		const componentConfig = await importFn()
		app.component(componentName, componentConfig.default || componentConfig)
	}))
})
