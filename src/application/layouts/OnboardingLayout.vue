<template>
	<IonPage>
		<IonContent :scrollY="false">
			<div class="layout">
				<IonHeader>
					<IonToolbar class="h-0" />
				</IonHeader>
				<div class="layout-page">
					<slot />
				</div>
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
