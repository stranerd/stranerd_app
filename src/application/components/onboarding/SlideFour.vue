<template>
	<ion-icon :icon="chatboxEllipses" class=" text-5xl text-cyan" />
	<ion-text class="text-xl text-main_dark font-bold">
		Expert Answers
	</ion-text>
	<ion-text class="text-base text-main_dark max-w-[80vw] text-center">
		Ask questions & get expert answers and detailed explanations to help with your homework and studying.
	</ion-text>
</template>

<script lang="ts">
import { chatboxEllipses } from 'ionicons/icons'

export default {
	name: 'SlideFour',
	setup () {
		return {
			chatboxEllipses
		}
	}
}
</script>

