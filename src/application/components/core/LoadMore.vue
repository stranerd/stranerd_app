<template>
	<div class="text-center py-6 text-info font-semibold">
		<a @click.prevent="load">Load More</a>
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
	load: {
		required: true,
		type: Function as PropType<() => Promise<void>>
	}
})
</script>
