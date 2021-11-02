<template>
	<top-bar :isNotDashboard="false"></top-bar>
	<side-nav-bar></side-nav-bar>
	<modal></modal>
	<slot />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import TopBar from '@/application/components/layout/topNavigations/Topbar.vue'
import SideNavBar from '@/application/components/layout/sidebars/DefaultSidebar.vue'
import Modal from '@/application/components/core/Modal.vue'

export default defineComponent({
	setup() {
		return {}
	},
	components: {
		 TopBar, SideNavBar, Modal
	}
})
</script>

