<template>
	<Modal>
		<template v-slot:title>
			Post an announcement
		</template>
		<AnnouncementForm :error="error" :factory="factory" :loading="loading" :submit="createAnnouncement">
			<template v-slot:buttonText>Post Announcement</template>
		</AnnouncementForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateAnnouncement } from '@app/composable/classes/announcements'
import AnnouncementForm from '@app/components/classes/announcements/AnnouncementForm.vue'

export default defineComponent({
	name: 'CreateAnnouncementModal',
	components: { AnnouncementForm },
	setup () {
		const { createAnnouncement, factory, error, loading } = useCreateAnnouncement()
		return { error, loading, createAnnouncement, factory }
	}
})
</script>
