<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassModal } from '@app/composable/core/modals'
import { getAnnouncementClass } from '@app/composable/classes/announcements'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ClassesClassIdAnnouncementsCreate',
	displayName: 'Post Announcement',
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
