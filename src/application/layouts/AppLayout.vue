<template>
	<component :is="layout">
		<slot />
	</component>
</template>

<script lang="ts">
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
	name: 'AppLayout',
	setup () {
		const layout = shallowRef('default')
		const route = useRoute()
		watch(
			() => route.meta,
			async (meta) => layout.value = meta.layout as string || 'default',
			{ immediate: true }
		)
		return { layout }
	}
}
</script>
