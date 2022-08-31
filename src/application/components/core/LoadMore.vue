<template>
	<div class="text-center py-6 text-info font-semibold">
		<a @click.prevent="load">Load More</a>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
	name: 'LoadMore',
	props: {
		load: {
			required: true,
			type: Function as PropType<() => Promise<void>>
		}
	}
})
</script>
