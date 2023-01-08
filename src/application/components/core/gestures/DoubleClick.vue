<template>
	<div ref="element">
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { useDoubleClickGesture } from '@app/composable/core/gestures'

const emit = defineEmits(['doubleClick'])

const { element } = useDoubleClickGesture({
	onDoubleClick: async () => emit('doubleClick')
})
</script>
