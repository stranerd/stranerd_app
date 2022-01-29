<template>
	<div class="popover rounded-xl bg-white text-gray p-4 md:text-sm text-xs">
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
		min-width: 12.3rem;
	}
</style>
