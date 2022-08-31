<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<AnnouncementForm :disabled="{ classId: true }" :error="error" :factory="factory" :loading="loading"
			:submit="editAnnouncement"
			class="page-padding">
			<template v-slot:buttonText>Update Announcement</template>
		</AnnouncementForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { getEditingAnnouncement, useEditAnnouncement } from '@app/composable/classes/announcements'
import { generateMiddlewares } from '@app/middlewares'
import AnnouncementForm from '@app/components/classes/announcements/AnnouncementForm.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ClassesClassIdAnnouncementsAnnouncementIdEdit',
	components: { AnnouncementForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { classId = '', announcementId = '' } = to.params
		const announcement = getEditingAnnouncement()
		if (!announcement || announcement.id !== announcementId) return `/classes/${classId}/announcements/${announcementId}`
		const canEdit = announcement.admins.includes(id.value)
		if (!canEdit) return `/classes/${classId}/announcements/${announcement.id}`
	}]),
	setup () {
		useRouteMeta('Edit announcement', { back: true })
		const { editAnnouncement, factory, error, loading } = useEditAnnouncement()
		return { error, loading, editAnnouncement, factory }
	}
})
</script>
