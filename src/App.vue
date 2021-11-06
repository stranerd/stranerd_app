<template>
	<ion-app>
		<AppLayout>
			<ion-router-outlet class="static h-full" />
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
