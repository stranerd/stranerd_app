<template>
	<ion-app>
		<AppLayout>
			<!-- TODO: Add custom animation for navigation -->
			<ion-router-outlet :animated="false" class="static h-full" />
		</AppLayout>
	</ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { defineComponent } from 'vue'
import AppLayout from '@app/layouts/AppLayout.vue'

export default defineComponent({
	name: 'App',
	components: {
		IonApp,
		IonRouterOutlet,
		AppLayout
	}
})
</script>
