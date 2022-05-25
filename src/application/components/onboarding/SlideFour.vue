<template>
	<ion-icon :icon="chatboxEllipses" class=" text-5xl text-cyan" />
	<ion-text class="text-xl text-secondaryText font-bold">
		Expert Answers
	</ion-text>
	<ion-text class="text-secondaryText max-w-[80vw] text-center">
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

