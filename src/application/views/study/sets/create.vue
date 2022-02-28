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
import { setQuerySetId } from '@utils/query'

export default defineComponent({
	name: 'StudySetsCreate',
	components: { IonContent, IonPage },
	middlewares: ['isAuthenticated', async ({ from }) => {
		setQuerySetId(from)
		useStudyModal().openCreateSet()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
