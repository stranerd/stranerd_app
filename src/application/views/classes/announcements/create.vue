<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<AnnouncementForm :error="error" :factory="factory" :loading="loading" :submit="createAnnouncement"
			class="page-padding">
			<template v-slot:buttonText>Post Announcement</template>
		</AnnouncementForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { setAnnouncementClassId, useCreateAnnouncement } from '@app/composable/classes/announcements'
import AnnouncementForm from '@app/components/classes/announcements/AnnouncementForm.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ClassesAnnouncementsCreate',
	components: { AnnouncementForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => {
		if (to.query.classId) setAnnouncementClassId(to.query.classId as string)
	}]),
	setup () {
		useRouteMeta('Post an announcement', { back: true })
		const { createAnnouncement, factory, error, loading } = useCreateAnnouncement()
		return { error, loading, createAnnouncement, factory }
	}
})
</script>
