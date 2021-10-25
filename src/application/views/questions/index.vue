<template>
	<ion-page>
		<ion-router-outlet></ion-router-outlet>
	</ion-page>
</template>

<script lang="ts">
import { onMounted } from 'vue'


import { IonPage, IonRouterOutlet } from '@ionic/vue'
import { useStore } from '@/application/store'


export default {
	name: 'questionPage',
	components: { IonPage, IonRouterOutlet },
	setup() {

		const store = useStore()
		onMounted(() => {
			store.commit('hideIonPage')
		})
		return {
			
		}
	}
}
</script>
