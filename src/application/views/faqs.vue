<template>
	<HomeLayout>
		<div class="bg-primaryBg text-primaryText text-center py-6 w-full">
			<h1>FAQs</h1>
		</div>

		<div class="flex flex-col w-full md:max-w-7xl mx-auto mt-12 px-4">
			<FaqsList/>
		</div>
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import FaqsList from '@app/components/landing/contact/FaqsList.vue'

export default defineComponent({
	name: 'PageFAQs',
	components:{ FaqsList },
	setup () {
		useRouteMeta('FAQs', {})
	}
})
</script>
