<template>
	<img alt="" src="@app/assets/images/onboarding/three.svg" />
	<IonText class="text-2xl text-secondaryText font-bold mt-20">
		Community
	</IonText>
	<IonText class="text-secondaryText max-w-[75vw] text-center text-lg">
		Ask a question or Chat with students outside the boundary of your classes.
	</IonText>
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
