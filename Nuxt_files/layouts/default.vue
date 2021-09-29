<template>
	<div class="layout-page">
		<TopNavigation />
		<section class="layout-body mb-4">
			<main class="layout-main">
				<slot />
			</main>
		</section>
		<MobileBottomNavigation />
		<ModalBase />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import MobileBottomNavigation from '@app/components/layouts/bottomNavigations/MobileBottomNavigation.vue'

export default defineComponent({
	name: 'DefaultLayout',
	components: { TopNavigation, MobileBottomNavigation }
})
</script>

<style lang="scss" scoped>
	.layout-body {
		max-width: 1200px;
	}
</style>
