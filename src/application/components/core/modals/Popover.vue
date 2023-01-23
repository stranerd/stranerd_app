<template>
	<div class="popover rounded-xl shadow-md flex flex-col p-6 md:p-8">
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: false,
		default: () => {
		}
	}
})
</script>

<style lang="scss" scoped>
.popover {
	width: clamp(20rem, 90vw, 600px);
}
</style>
