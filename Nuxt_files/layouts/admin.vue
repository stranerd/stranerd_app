<template>
	<section class="layout-page">
		<TopNavigation />
		<AdminTopNavigation />
		<section class="layout-body mb-4">
			<main class="layout-main">
				<Nuxt />
			</main>
		</section>
		<MobileBottomNavigation />
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
import AdminTopNavigation from '@app/components/layouts/topNavigations/AdminTopNavigation.vue'
import MobileBottomNavigation from '@app/components/layouts/bottomNavigations/MobileBottomNavigation.vue'

export default defineComponent({
	name: 'AdminLayout',
	components: { TopNavigation, AdminTopNavigation, MobileBottomNavigation },
	middleware: ['isAdmin']
})
</script>

<style lang="scss" scoped>
	.layout-body {
		max-width: 1200px;
	}
</style>
