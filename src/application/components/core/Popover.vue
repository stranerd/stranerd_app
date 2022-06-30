<template>
	<div class="popover rounded-xl text-sm shadow-md flex flex-col">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
	name: 'Popover',
	props: {
		close: {
			type: Function as PropType<() => void>,
			required: false,
			default: () => {
			}
		}
	}
})
</script>

<style lang="scss" scoped>
	.popover {
		min-width: 10rem;
		@media (max-width: $md) {
			// position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>
