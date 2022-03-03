<template>
	<IonPage>
		<IonContent>
			<h1>Create Group</h1>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import { useClassModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'ClassesClassIdDiscussionsCreate',
	displayName: 'Create Discussion',
	components: { IonContent, IonPage },
	middlewares: ['isAuthenticated', async ({ from }) => {
		useClassModal().openCreateGroup()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
