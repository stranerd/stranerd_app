<template>
	<DefaultLayout>
		<ComingSoon class="h-full" title="We are building a digital classroom. Stay tuned!" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Classes',
	setup () {
		useRouteMeta('Classes', {})
	}
})
</script>
