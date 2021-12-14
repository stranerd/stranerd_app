<template>
	<div
		class="rounded-xl bg-white md:py-6 md:px-6 py-4 px-3 md:text-sm text-xs flex flex-col overflow-y-auto">
		<div class="h-full overflow-y-auto">

	

			<div class="flex flex-col gap-1 text-center justify-center items-center ">
				<h3 class="text-xl font-semibold text-main_dark mt-3">
					<slot name="title">
						Title
					</slot>
				</h3>
				<span
					class="text-icon_inactive px-10 mt-1 md:px-12">

					<slot name="subtext">
					</slot>

				</span>
			</div>

			<slot>
				<p>This is the default content of the modal</p>
			</slot>

		</div>

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

	},
	setup () {

		return {}
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
