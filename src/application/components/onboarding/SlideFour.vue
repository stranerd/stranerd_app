<template>
	<img alt="" class="mt-4" src="@app/assets/images/onboarding/four.svg" />
	<IonText class="text-2xl text-secondaryText font-bold mt-20">
		Study Materials
	</IonText>
	<IonText class="text-secondaryText max-w-[75vw] text-center text-lg">
		Use test preps, create flashcards, write notes and check archives for more.
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

