<template>
	<div class="rounded-t-3xl py-8 bg-white">
		<div class="mb-6 modal-padding-x">
			<div class="flex justify-between text-main_dark">
				<h3 class="text-heading2" style="font-weight: 500;">
					<slot name="title">Title</slot>
				</h3>
				<IonIcon v-if="close" :icon="closeOutline" class="text-2xl" @click="close" />
			</div>
			<slot name="subtext" />
		</div>
		<div :class="{'modal-padding-x': !noPaddingX}">
			<slot>
				<p>This is the default content of the modal</p>
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { closeOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Modal',
	props: {
		close: {
			type: Function as PropType<() => void>,
			required: false,
			default: () => {
			}
		},
		noPaddingX: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup () {
		return { closeOutline }
	}
})
</script>
