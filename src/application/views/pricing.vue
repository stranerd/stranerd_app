<template>
	<HomeLayout>
		<div class="bg-primaryBg text-primaryText text-center py-6 w-full">
			<h1>Pricing</h1>
		</div>
		<Pricing />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import Pricing from '@app/components/landing/pricing/index.vue'

export default defineComponent({
	name: 'SolutionsSchools',
	components: { Pricing },
	setup () {
		useRouteMeta('Pricing', {})
	}
})
</script>
