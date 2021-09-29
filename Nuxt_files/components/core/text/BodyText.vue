<template>
	<span :class="variant">
		<slot />
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'BodyText',
	props: {
		variant: {
			type: String,
			default: 'normal',
			validator: (val: string) => ['large', 'normal', 'sub'].includes(val)
		}
	}
})
</script>

<style lang="scss" scoped>
	.large {
		font-size: 18px;
		@media (min-width: $md) {
			font-size: 20px;
		}
		@media (min-width: $lg) {
			font-size: 22px;
		}
	}

	.normal {
		font-size: 16px;
		@media (min-width: $md) {
			font-size: 18px;
		}
		@media (min-width: $lg) {
			font-size: 20px;
		}
	}

	.sub {
		font-size: 14px;
		@media (min-width: $md) {
			font-size: 16px;
		}
		@media (min-width: $lg) {
			font-size: 18px;
		}
	}
</style>
