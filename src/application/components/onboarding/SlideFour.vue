<template>
	<IonIcon :icon="chatboxEllipses" />
	<IonText class="text-xl text-secondaryText font-bold">
		Expert Answers
	</IonText>
	<IonText class="text-secondaryText max-w-[80vw] text-center">
		Ask questions & get expert answers and detailed explanations to help with your homework and studying.
	</IonText>
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

