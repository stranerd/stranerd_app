<template>
	<div class="flex justify-center items-center flex-col text-center gap-4 my-auto">
		<span class="text-4xl font-light leading-none">404</span>
		<span>{{ title }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NotFound',
	props: {
		title: {
			type: String,
			required: false,
			default: 'Page not found'
		}
	}
})
</script>
