<template>
	<AppLayout>
		<ion-app>
			<ion-router-outlet />
		</ion-app>
	</AppLayout>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { defineComponent } from 'vue'
import AppLayout from '@/application/layouts/AppLayout.vue'

export default defineComponent({
	name: 'App',
	components: {
		IonApp,
		IonRouterOutlet,
		AppLayout 
	}
})
</script>