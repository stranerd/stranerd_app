<template>
	<ion-icon :icon="reader" class=" text-5xl text-pink" />
	<ion-text class="text-xl text-secondaryText font-bold">
		Notes
	</ion-text>
	<ion-text class="text-secondaryText max-w-[80vw] text-center">
		Read beautiful and concise notes that cover every important aspects in topics under different subjects.
	</ion-text>
</template>

<script lang="ts">
import { reader } from 'ionicons/icons'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'SlideThree',
	setup () {
		return {
			reader
		}
	}
})
</script>
