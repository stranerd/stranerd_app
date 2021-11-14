<template>
	<ion-app>
		<!-- TODO: Add custom animation for navigation -->
		<ion-router-outlet :animated="false" />
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
