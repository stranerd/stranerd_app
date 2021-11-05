<template>
	<ion-tabs>
		<ion-router-outlet />
		<bottom-nav />
	</ion-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
import { IonRouterOutlet, IonTabs } from '@ionic/vue'

export default defineComponent({
	name: 'Dashboard',
	layout: 'dashboard',
	components: { BottomNav, IonTabs, IonRouterOutlet }
})
</script>
