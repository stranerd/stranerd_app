<template>
	<component :is="`h${variant}`" :class="noGrow ? 'no-grow' : 'grow'" class="fw-bold m-0">
		<slot />
	</component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Heading',
	props: {
		variant: {
			type: String,
			default: '1',
			validator: (val: string) => parseInt(val) > 0 && parseInt(val) < 7
		},
		noGrow: {
			type: Boolean,
			required: false,
			default: false
		}
	}
})
</script>