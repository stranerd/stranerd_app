<template>
	<div class="layout-page">
		<TopNavigation :show-left-menu="true" :show-right-menu="true" />
		<section class="layout-body p-0 py-lg-3 mb-4">
			<section class="layout-side-left">
				<ProfileLeftSidebar />
			</section>
			<main class="layout-main p-0">
				<ProfileLeftSidebar class="d-lg-none border-bottom-sm" />
				<ProfileRightSidebar class="d-lg-none border-bottom-sm" />
				<slot class="py-1-5 px-1 p-lg-0" />
			</main>
			<section class="layout-side-right">
				<ProfileRightSidebar />
			</section>
		</section>
		<MobileBottomNavigation />
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProfileLeftSidebar from '@app/components/layouts/sidebars/ProfileLeftSidebar.vue'
import ProfileRightSidebar from '@app/components/layouts/sidebars/ProfileRightSidebar.vue'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import MobileBottomNavigation from '@app/components/layouts/bottomNavigations/MobileBottomNavigation.vue'

export default defineComponent({
	name: 'ProfileLayout',
	components: { TopNavigation, ProfileRightSidebar, ProfileLeftSidebar, MobileBottomNavigation }
})
</script>

<style lang="scss" scoped>
	.layout-side-left {
		width: 30% !important;
		border: none !important;
		margin-left: 3rem;
	}

	.layout-side-right {
		width: 25% !important;
	}

	.border-bottom-sm {
		border-bottom: 0.5rem solid $color-line;
	}
</style>
