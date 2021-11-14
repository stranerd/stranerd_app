<template>
	<div class="flex h-screen">
		<Sidebar />
		<div class="layout">
			<TopBar />
			<div class="layout-page">
				<div class="layout-body">
					<slot />
				</div>
				<div class="layout-side-right">
					<RightSidebar />
				</div>
			</div>
			<BottomNav class="mt-auto" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
import Sidebar from '@app/components/layout/sidebars/DefaultSidebar.vue'
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'
import TopBar from '@app/components/layout/topNavigations/Topbar.vue'

export default defineComponent({
	name: 'DashboardLayout',
	components: {
		BottomNav,
		Sidebar,
		TopBar,
		RightSidebar
	}
})
</script>
