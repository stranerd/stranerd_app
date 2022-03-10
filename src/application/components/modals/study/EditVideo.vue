<template>
	<Modal>
		<template v-slot:title>
			Edit Video
		</template>
		<VideoForm :error="error" :factory="factory" :loading="loading" :submit="editVideo">
			<template v-slot:buttonText>Update folder</template>
		</VideoForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEditVideo } from '@app/composable/study/videos'
import VideoForm from '@app/components/study/videos/VideoForm.vue'

export default defineComponent({
	name: 'EditVideoModal',
	components: { VideoForm },
	setup () {
		const { editVideo, factory, error, loading } = useEditVideo()
		return { error, loading, editVideo, factory }
	}
})
</script>
