<template>
	<IonPage>
		<IonContent :scrollY="false">
			<div class="w-full h-full">
				<slot />
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'OnboardingLayout'
})
</script>
