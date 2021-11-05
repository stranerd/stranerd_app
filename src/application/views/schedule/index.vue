<template>
	<ion-page>
		<ion-router-outlet></ion-router-outlet>
	</ion-page>
</template>

<script lang="ts">
import { onMounted } from 'vue'

import { IonPage, IonRouterOutlet } from '@ionic/vue'
import { useStore } from '@app/store'

export default {
	name: 'SchedulePages',
	components: { IonPage, IonRouterOutlet },
	setup () {

		const store = useStore()
		onMounted(() => {
			store.commit('hideIonPage')
		})
		return {}
	}
}
</script>
