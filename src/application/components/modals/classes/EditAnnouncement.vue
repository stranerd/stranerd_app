<template>
	<Modal>
		<template v-slot:title>
			Edit Announcement
		</template>
		<AnnouncementForm :error="error" :factory="factory" :loading="loading" :submit="editAnnouncement">
			<template v-slot:buttonText>Update Announcement</template>
		</AnnouncementForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEditAnnouncement } from '@app/composable/classes/announcements'
import AnnouncementForm from '@app/components/classes/announcements/AnnouncementForm.vue'

export default defineComponent({
	name: 'EditAnnouncementModal',
	components: { AnnouncementForm },
	setup () {
		const { editAnnouncement, factory, error, loading } = useEditAnnouncement()
		return { error, loading, editAnnouncement, factory }
	}
})
</script>
