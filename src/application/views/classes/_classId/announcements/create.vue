<template>
	<IonPage>
		<IonContent>
			<h1>Create Announcement</h1>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import { useClassModal } from '@app/composable/core/modals'
import { getAnnouncementClass } from '@app/composable/classes/announcements'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ClassesClassIdAnnouncementsCreate',
	displayName: 'Post Announcement',
	components: { IonContent, IonPage },
	middlewares: ['isAuthenticated', async ({ from }) => {
		const { id } = useAuth()
		const classInst = getAnnouncementClass()
		if (!classInst) return '/classes/'
		if (!classInst.admins.includes(id.value)) return `/classes/${classInst.id}/announcements`
		useClassModal().openCreateAnnouncement()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
