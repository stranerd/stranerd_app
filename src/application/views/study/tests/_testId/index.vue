<template>
	<IonPage>
		<IonContent>
			<h1 />
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'

export default defineComponent({
	name: 'TestIndex',
	components: { IonContent, IonPage },
	middlewares: ['isAuthenticated', async ({ to }) => `/study/tests/${to.params.testId}/take`]
})
</script>
