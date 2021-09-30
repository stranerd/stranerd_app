<template>
	<ion-app class="font-nuni">
		<ion-router-outlet />
	</ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'App',
	components: {
		IonApp,
		IonRouterOutlet
	}
})
</script>