<template>
	<div ref="element">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSwipeGesture } from '@app/composable/core/gestures'

export default defineComponent({
	name: 'Swipe',
	setup (_, { emit }) {
		const { element } = useSwipeGesture({
			onRight: async () => emit('swipeRight'),
			onLeft: async () => emit('swipeLeft')
		})
		return { element }
	}
})
</script>
