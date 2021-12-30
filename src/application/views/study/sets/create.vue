<template>
	<IonPage>
		<IonContent>
			<h1>Create Set</h1>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'SetsCreatePage',
	components: { IonContent, IonPage },
	middlewares: ['isAuthenticated', async ({ from }) => {
		useStudyModal().openCreateSet()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
