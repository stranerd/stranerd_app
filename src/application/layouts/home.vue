<template>
	<IonPage>
		<IonContent>
			<h2>Help</h2>
			<slot />
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'

export default defineComponent({
	components: { IonContent, IonPage }
})
</script>
