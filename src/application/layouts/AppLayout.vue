<template>
	<component :is="layout">
		<slot />
	</component>
</template>

<script lang="ts">
import authLayout from './auth.vue'
import dashboardLayout from './dashboard.vue'
import defaultLayout from './default.vue'
import homeLayout from './home.vue'
import justifiedLayout from './justified.vue'
import subpagesLayout from './subpages.vue'
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'

const components = {
	authLayout, dashboardLayout, defaultLayout, homeLayout, justifiedLayout, subpagesLayout
} as any

export default {
	name: 'AppLayout',
	components,
	setup () {
		const layout = shallowRef(defaultLayout)
		const route = useRoute()
		watch(
			() => route.meta,
			async (meta) => {
				let layoutName = (meta.layout as string || 'default') + 'Layout'
				if (!components[layoutName]) layoutName = 'defaultLayout'
				layout.value = components[layoutName]
			},
			{ immediate: true }
		)
		return { layout }
	}
}

</script>
