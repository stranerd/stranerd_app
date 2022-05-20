<template>
	<div class=" modal-content">
		<div class="mb-4 modal-padding-x bg-primary py-2.5">
			<div class="flex justify-center items-center text-white">
				<h3 class="text-base font-bold " >
					<slot name="title">Title</slot>
				</h3>
				<IonIcon v-if="close" :icon="closeOutline" class="text-2xl absolute right-2" @click="close" />
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
