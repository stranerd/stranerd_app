<template>
	<top-bar :isNotDashboard="true"></top-bar>
	<side-nav-bar></side-nav-bar>
	<slot />
</template>

<script lang="ts">

import { defineAsyncComponent, defineComponent } from 'vue'
const TopBar = defineAsyncComponent(() => import('@app/components/layout/topNavigations/Topbar.vue'))
const SideNavBar = defineAsyncComponent(() => import('@app/components/layout/sidebars/DefaultSidebar.vue'))

export default defineComponent({
	setup () {
		return {}
	},
	components: {
		TopBar, SideNavBar
	}
})
</script>
