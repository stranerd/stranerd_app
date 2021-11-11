import { IonPage, } from '@ionic/vue'

export const registerIonicComponent = async (app: any) => {
	await app.component('ion-page', IonPage)
}
