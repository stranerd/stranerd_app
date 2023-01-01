<template>
	<DefaultLayout>
		<div>
			Chat
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Chat',
	setup () {
		useRouteMeta('Chat', {})
		return {}
	}
})
</script>
