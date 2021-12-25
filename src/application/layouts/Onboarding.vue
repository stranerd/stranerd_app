<template>
	<IonPage>
		<IonContent>
			<div class="!w-full layout-body">
				<slot />
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'

export default defineComponent({
	name: 'OnboardingLayout',
	components: { IonPage, IonContent }
})
</script>
