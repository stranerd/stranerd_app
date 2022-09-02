<template>
	<HomeLayout>
		<div class="bg-primaryBg text-primaryText text-center py-6 w-full">
			<h1>FAQs</h1>
		</div>
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'PageFAQs',
	setup () {
		useRouteMeta('FAQs', {})
	}
})
</script>
