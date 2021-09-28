<template>
	<div class="layout-page">
		<TopNavigation />
		<section class="layout-body ps-lg-2 pe-lg-1-5 mb-4">
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
import RightSidebar from '@app/components/layouts/sidebars/RightSidebar.vue'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import MobileBottomNavigation from '@app/components/layouts/bottomNavigations/MobileBottomNavigation.vue'

export default defineComponent({
	name: 'JustifiedLayout',
	components: { TopNavigation, RightSidebar, MobileBottomNavigation }
})
</script>

<style lang="scss" scoped>
	.layout-body {
		max-width: 1440px;
	}
</style>
