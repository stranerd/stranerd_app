<template>
	<div class="flex h-screen">
		<div class="layout">
			<InnerTopBar />
			<div class="layout-page">
				<div class="!w-full layout-body">
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InnerTopBar from '@app/components/layout/topNavigations/InnerTopBar.vue'

export default defineComponent({
	name: 'JustifiedLayout',
	components: { InnerTopBar }
})
</script>
