<template>
	<Justified>
		<div class="p-4 lg:w-8/12 w-full mx-auto">
			<VideoForm :error="error" :factory="factory" :loading="loading" :submit="editVideo"
				class="p-4 md:p-8 bg-white">
				<template v-slot:buttonText>
					Update Video
				</template>
			</VideoForm>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEditingVideo, useEditVideo } from '@app/composable/study/videos'
import VideoForm from '@app/components/study/videos/VideoForm.vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'

export default defineComponent({
	name: 'StudyVideosVideoIdEdit',
	displayName: 'Edit Video',
	components: { Justified, VideoForm },
	middlewares: ['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { videoId } = to.params
		const video = getEditingVideo()
		if (!video || video.id !== videoId) return '/study/videos/'
		const canEdit = video.userId === id.value
		if (!canEdit) return `/study/videos/${video.id}`
	}],
	setup () {
		const route = useRoute()
		const { loading, error, factory, editVideo } = useEditVideo(route.params.videoId as string)
		return { loading, error, factory, editVideo }
	}
})
</script>
