<template>
	<ModalRoot
		:close="closeModal"
		:close-on-background="closeOnBackground"
		background-class="modal-background"
		modal-class="modal-inner"
	>
		<div class="d-flex justify-content-end">
			<a class="fas fa-times" style="font-size: 1.5rem;" @click.prevent="closeModal" />
		</div>
		<Heading class="my-1" variant="3">
			<slot name="title">
				Title
			</slot>
		</Heading>
		<hr v-if="!hideSeparator">
		<slot>
			<p>This is the default content of the modal</p>
		</slot>
	</ModalRoot>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import ModalRoot from '@app/components/core/modals/ModalRoot.vue'
import { modal } from '@app/hooks/core/modals'

export default defineComponent({
	name: 'Modal',
	components: { ModalRoot },
	props: {
		modal: {
			type: String,
			required: true
		},
		close: {
			type: Function as PropType<() => void>,
			required: false,
			default: () => {
			}
		},
		hideSeparator: {
			type: Boolean,
			required: false,
			default: false
		},
		closeOnBackground: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup (props) {
		const closeModal = () => {
			modal.close(props.modal)
			props.close?.()
		}
		return { closeModal }
	}
})
</script>

<style lang="scss">
	.modal-background {
		background: rgba($color-dark, 0.9);
	}

	.modal-inner {
		border-radius: 0.5rem;
		background: $color-white;
		box-shadow: 0 4px 8px $color-black;
		animation: slide-up 0.25s;
	}

	@media (min-width: $md) {
		.modal-inner {
			border-radius: 1rem;
		}
	}

	@keyframes slide-up {
		from {
			bottom: -100px;
		}

		to {
			bottom: 0;
		}
	}
</style>
