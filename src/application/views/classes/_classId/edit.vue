<template>
	<IonPage>
		<IonContent>
			<h1>Edit Class</h1>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useClassModal } from '@app/composable/core/modals'
import { getEditingClass } from '@app/composable/classes/classes'
import { IonContent, IonPage } from '@ionic/vue'

export default defineComponent({
	name: 'ClassesClassIdEdit',
	displayName: 'Edit Class',
	components: { IonContent, IonPage },
	middlewares: ['isAuthenticated', async ({ from, to }) => {
		const { id } = useAuth()
		const { classId = '' } = to.params
		const classInst = getEditingClass()
		if (!classInst || classInst.id !== classId) return `/classes/${classId}`
		const canEdit = classInst.admins.includes(id.value)
		if (!canEdit) return `/classes/${classInst.id}`
		useClassModal().openEditClass()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
