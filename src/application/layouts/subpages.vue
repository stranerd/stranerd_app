<template>
	<top-bar :isNotDashboard="true"></top-bar>
	<side-nav-bar></side-nav-bar>
	<modal></modal>
	<slot />
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'

const TopBar = defineAsyncComponent(() => import('@app/components/layout/topNavigations/Topbar.vue'))
const SideNavBar = defineAsyncComponent(() => import('@app/components/layout/sidebars/DefaultSidebar.vue'))
const Modal = defineAsyncComponent(() => import('@app/components/core/Modal.vue'))

export default defineComponent({
	setup () {
		return {}
	},
	components: {
		TopBar, SideNavBar, Modal
	}
})
</script>
