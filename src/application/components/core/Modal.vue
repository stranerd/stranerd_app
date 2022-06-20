<template>
	<div class="modal-content">
		<div class="bg-headerBg text-headerText py-4 text-center">
			<div class="flex justify-between items-center text-xl gap-4">
				<span />
				<span class="font-bold">
					<slot name="title">Title</slot>
				</span>
				<IonIcon v-if="close" :icon="closeOutline" @click="close" />
			</div>
			<slot name="subtext" />
		</div>
		<div class="px-4 md:px-8 py-4 md:py-8">
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
		}
	},
	setup () {
		return { closeOutline }
	}
})
</script>
