<template>
	<HomeLayout>
		<div class="bg-primaryBg text-primaryText text-center py-6 w-full">
			<h1>Contact</h1>
		</div>
		<Contact />

	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import Contact from '@app/components/landing/contact/index.vue'

export default defineComponent({
	name: 'PageContact',
	components: { Contact },
	setup () {
		useRouteMeta('Contact', {})
	}
})
</script>
