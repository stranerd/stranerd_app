<template>
	<ion-page>
		<ion-content>
			<h1>404</h1>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'

export default defineComponent({
	name: 'Auth404',
	displayName: '404',
	components: { IonContent, IonPage },
	middlewares: [async () => '/auth/signin']
})
</script>
