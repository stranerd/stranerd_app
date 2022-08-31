<template>
	<HomeLayout>
		<div class="bg-primaryBg text-primaryText text-center py-6 w-full">
			<h1>About</h1>
		</div>
		<About />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import About from '@app/components/landing/about/index.vue'

export default defineComponent({
	name: 'PageAbout',
	components: { About },
	setup () {
		useRouteMeta('About', {})
	}
})
</script>
