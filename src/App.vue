<template>
	<ion-app>
<<<<<<< HEAD
		<AppLayout>
			<!-- TODO: Add custom animation for navigation -->
			<ion-router-outlet :animated="false" class="static h-full" />
		</AppLayout>
=======
		<!-- TODO: Add custom animation for navigation -->
		<ion-router-outlet :animated="false" />
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	</ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { defineComponent } from 'vue'
<<<<<<< HEAD
import AppLayout from '@app/layouts/AppLayout.vue'
=======
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c

export default defineComponent({
	name: 'App',
	components: {
		IonApp,
<<<<<<< HEAD
		IonRouterOutlet,
		AppLayout
=======
		IonRouterOutlet
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	}
})
</script>
