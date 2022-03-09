<template>
	<IonPage>
		<IonContent>
			<h1>Edit Announcement</h1>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useClassModal } from '@app/composable/core/modals'
import { getEditingAnnouncement } from '@app/composable/classes/announcements'
import { IonContent, IonPage } from '@ionic/vue'

export default defineComponent({
	name: 'ClassesClassIdAnnouncementsAnnouncementIdEdit',
	displayName: 'Edit Announcement',
	components: { IonContent, IonPage },
	middlewares: ['isAuthenticated', async ({ from, to }) => {
		const { id } = useAuth()
		const { classId = '', announcementId = '' } = to.params
		const announcement = getEditingAnnouncement()
		if (!announcement || announcement.id !== announcementId) return `/classes/${classId}/announcements/${announcementId}`
		const canEdit = announcement.admins.includes(id.value)
		if (!canEdit) return `/classes/${classId}/announcements/${announcement.id}`
		useClassModal().openEditAnnouncement()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
