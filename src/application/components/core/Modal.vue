d<template>
	<div class="rounded-3xl md:p-8 p-4 md:text-sm text-xs">
		<div class="flex flex-col gap-1 text-center justify-center items-center mb-4">
			<h3 class="text-xl font-semibold text-main_dark">
				<slot name="title">Title</slot>
			</h3>
			<span class="text-icon_inactive mt-2">
				<slot name="subtext" />
			</span>
		</div>
		<slot>
			<p>This is the default content of the modal</p>
		</slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
	name: 'Modal',
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
