<template>
	<top-bar :isNotDashboard="false"></top-bar>
	<side-nav-bar />
	<modal />
	<ion-page>
		<slot />
	</ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage } from '@ionic/vue'
import TopBar from '@app/components/layout/topNavigations/Topbar.vue'
import SideNavBar from '@app/components/layout/sidebars/DefaultSidebar.vue'
import Modal from '@app/components/core/Modal.vue'

export default defineComponent({
	setup () {
		return {}
	},
	components: {
		TopBar, SideNavBar, Modal, IonPage
	}
})
</script>

