<template>
	<IonPage>
		<IonContent>
			<h1>Create Classes</h1>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import { useClassModal } from '@app/composable/core/modals'
import { setQuerySetId } from '@utils/query'

export default defineComponent({
	name: 'ClassesCreate',
	components: { IonContent, IonPage },
	middlewares: ['isAuthenticated', async ({ from }) => {
		setQuerySetId(from)
		useClassModal().openCreateClass()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
