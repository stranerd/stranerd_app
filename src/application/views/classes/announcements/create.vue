<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'
import { setAnnouncementClassId } from '@app/composable/classes/announcements'

export default defineComponent({
	name: 'ClassesAnnouncementsCreate',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to, goBackToNonAuth }) => {
		if (to.query.classId) setAnnouncementClassId(to.query.classId as string)
		useClassModal().openCreateAnnouncement()
		return goBackToNonAuth()
	}])
})
</script>
