<template>
	<span
		:class="{
			'truncate': truncate,
			'text-wrap text-break': !noWrap
		}"
		class="d-inline-block"
	>
		<slot />
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DynamicText',
	props: {
		truncate: {
			required: false,
			type: Boolean,
			default: false
		},
		noWrap: {
			required: false,
			type: Boolean,
			default: false
		}
	}
})
</script>

