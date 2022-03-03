<template>
	<div class="popover rounded-xl bg-white text-gray p-6 md:text-sm text-xs shadow-md flex flex-col gap-6">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Popover'
})
</script>

<style lang="scss" scoped>
	.popover {
		min-width: 10rem;
		@media (max-width: $md) {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>
