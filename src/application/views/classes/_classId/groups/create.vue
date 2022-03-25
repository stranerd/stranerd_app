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
import { getGroupClass } from '@app/composable/classes/groups'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ClassesClassIdGroupsCreate',
	displayName: 'Create Discussion Group',
	components: { IonContent, IonPage },
	middlewares: ['isAuthenticated', async ({ from }) => {
		const { id } = useAuth()
		const classInst = getGroupClass()
		if (!classInst) return '/classes/'
		if (!classInst.admins.includes(id.value)) return `/classes/${classInst.id}/groups`
		useClassModal().openCreateGroup()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
