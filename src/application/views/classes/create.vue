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

export default defineComponent({
	name: 'ClassesCreate',
	displayName: 'Create Class',
	components: { IonContent, IonPage },
	middlewares: ['isAuthenticated', 'isAccountVerified', async ({ from }) => {
		useClassModal().openCreateClass()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
