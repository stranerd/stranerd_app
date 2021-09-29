<template>
	<div class="layout-page">
		<TopNavigation />
		<section class="layout-body mb-4">
			<section class="layout-side-left">
				<Sidebar />
			</section>
			<main class="layout-main">
				<slot />
			</main>
			<section class="layout-side-right">
				<RightSidebar />
			</section>
		</section>
		<MobileBottomNavigation />
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '@app/components/layouts/sidebars/DefaultSidebar.vue'
import RightSidebar from '@app/components/layouts/sidebars/RightSidebar.vue'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import MobileBottomNavigation from '@app/components/layouts/bottomNavigations/MobileBottomNavigation.vue'

export default defineComponent({
	name: 'DashboardLayout',
	components: { Sidebar, TopNavigation, RightSidebar, MobileBottomNavigation }
})
</script>
