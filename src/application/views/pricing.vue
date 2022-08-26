<template>
	<HomeLayout>
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
