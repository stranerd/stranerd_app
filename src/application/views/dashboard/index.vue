<template>
	<ion-tabs>
		<ion-router-outlet />
	</ion-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonRouterOutlet, IonTabs } from '@ionic/vue'

export default defineComponent({
	name: 'Dashboard',
	layout: 'dashboard',
	components: { IonTabs, IonRouterOutlet }
})
</script>
