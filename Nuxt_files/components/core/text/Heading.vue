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

<style lang="scss" scoped>
	h1 {
		font-size: 1.75em;

		&.grow {
			@media (min-width: $md) {
				font-size: 2em;
			}
			@media (min-width: $lg) {
				font-size: 2.5em;
			}
			@media (min-width: $xl) {
				font-size: 3em;
			}
		}
	}

	h2 {
		font-size: 1.5em;

		&.grow {
			@media (min-width: $md) {
				font-size: 1.75em;
			}
			@media (min-width: $lg) {
				font-size: 2.25em;
			}
			@media (min-width: $xl) {
				font-size: 2.5em;
			}
		}
	}

	h3 {
		font-size: 1.25em;

		&.grow {
			@media (min-width: $md) {
				font-size: 1.5em;
			}
			@media (min-width: $lg) {
				font-size: 2em;
			}
			@media (min-width: $xl) {
				font-size: 2.25em;
			}
		}
	}

	h4 {
		font-size: 1em;

		&.grow {
			@media (min-width: $md) {
				font-size: 1.25em;
			}
			@media (min-width: $lg) {
				font-size: 1.75em;
			}
			@media (min-width: $xl) {
				font-size: 2em;
			}
		}
	}
</style>
