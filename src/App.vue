<template>
	<ion-app>
		<!-- TODO: Add custom animation for navigation -->
		<router-view />
	</ion-app>
</template>

<script lang="ts">
import { IonApp } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'App',
	components: {
		IonApp
		// IonRouterOutlet
	}
})
</script>
