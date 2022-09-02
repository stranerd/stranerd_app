<template>
	<div class="popover rounded-xl shadow-md flex flex-col p-6 md:p-8">
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
	min-width: 20rem;
}
</style>
