<template>
	<HomeLayout>
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
