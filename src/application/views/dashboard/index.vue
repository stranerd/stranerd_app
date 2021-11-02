<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<bottom-nav></bottom-nav>
		</ion-tabs>
	</ion-page>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'

import BottomNav from '@/application/components/layout/bottomNavigations/BottomNav.vue'

import { IonPage, IonTabs, IonRouterOutlet } from '@ionic/vue'

export default {
	name: 'dashboard',
	components: { BottomNav, IonPage, IonTabs, IonRouterOutlet },
	setup() {
		return {}
	}
}
</script>
