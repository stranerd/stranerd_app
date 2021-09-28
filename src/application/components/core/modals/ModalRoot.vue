<template>
	<div :class="backgroundClass" class="sd-modal-background">
		<div v-if="closeOnBackground" class="sd-modal-under" @click="close" />
		<div :class="modalClass" class="sd-modal-inner">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { disableScroll, enableScroll } from '@utils/html'

export default defineComponent({
	name: 'Modal',
	props: {
		close: {
			type: Function as PropType<() => void>,
			required: true
		},
		closeOnBackground: {
			type: Boolean,
			required: false,
			default: false
		},
		backgroundClass: {
			type: String,
			required: false,
			default: ''
		},
		modalClass: {
			type: String,
			required: false,
			default: ''
		}
	},
	setup () {
		onMounted(disableScroll)
		onBeforeUnmount(enableScroll)
	}
})
</script>

<style lang="scss" scoped>
	.sd-modal-background {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		z-index: 100;
		overflow: scroll;

		.sd-modal-under {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
		}

		.sd-modal-inner {
			width: 100%;
			margin: auto;
			max-height: 99.9%;
			max-width: 800px;
			border-radius: 0.5rem;
			overflow-y: auto;
			-ms-overflow-style: none;
			padding: 0.5rem 0.5rem 1rem;
			@media (min-width: $sm) {
				padding: 1rem 1rem 1.5rem;
			}
			@media (min-width: $md) {
				padding: 1.5rem 1.5rem 2rem;
			}
			@media (min-width: $lg) {
				padding: 2rem 2rem 2.5rem;
			}

			&::-webkit-scrollbar {
				display: none;
			}

			position: relative;
		}
		@media (min-width: $sm) {
			.sd-modal-inner {
				width: 95%;
			}
		}
		@media (min-width: $md) {
			.sd-modal-inner {
				width: 90%;
			}
		}
	}
</style>
