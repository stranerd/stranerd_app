<template>
	<div ref="element">
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { useSwipeGesture } from '@app/composable/core/gestures'

const emit = defineEmits(['swipeRight', 'swipeLeft'])
const { element } = useSwipeGesture({
	onRight: async () => emit('swipeRight'),
	onLeft: async () => emit('swipeLeft')
})
</script>
