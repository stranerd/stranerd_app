<template>
	<div ref="element">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDoubleClickGesture } from '@app/composable/core/gestures'

export default defineComponent({
	name: 'DoubleClick',
	setup (_, { emit }) {
		const { element } = useDoubleClickGesture({
			onDoubleClick: async () => emit('doubleClick')
		})
		return { element }
	}
})
</script>
