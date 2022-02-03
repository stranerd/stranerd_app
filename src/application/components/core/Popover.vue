<template>
	<div class="rounded-xl bg-white text-gray p-4 md:p-6 md:text-sm text-xs shadow-md min-w-[12rem]">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Popover'
})
</script>
