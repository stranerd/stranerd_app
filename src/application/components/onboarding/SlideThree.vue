<template>
	<IonIcon :icon="reader" />
	<IonText class="text-xl text-secondaryText font-bold">
		Notes
	</IonText>
	<IonText class="text-secondaryText max-w-[80vw] text-center">
		Read beautiful and concise notes that cover every important aspects in topics under different subjects.
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
