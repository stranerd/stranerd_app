<template>
	<component :is="`h${variant}`" :class="noGrow ? 'no-grow' : 'grow'" class="font-bold m-0">
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
			default: 'base',
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

<style lang="scss" scoped>

</style>
