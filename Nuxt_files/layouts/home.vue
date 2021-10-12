<template>
	<div class="max-w-full grid grid-cols-12">
		<HomeTopNavigation />
		<section class="col-span-12 grid grid-cols-12 mt-20">
			<slot class="col-span-12" />
			<HomeBottomNavigation />
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeTopNavigation from '@app/components/layouts/topNavigations/HomeTopNavigation.vue'
import HomeBottomNavigation from '@app/components/layouts/bottomNavigations/HomeBottomNavigation.vue'

export default defineComponent({
	name: 'HomeLayout',
	components: {
		HomeTopNavigation,
		HomeBottomNavigation
	},
	middleware: 'isNotAuthenticated'
})
</script>
