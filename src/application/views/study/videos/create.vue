<template>
	<Justified>
		<div class="p-4 lg:w-8/12 w-full mx-auto">
			<VideoForm :error="error" :factory="factory" :loading="loading" :submit="createVideo"
				class="p-4 md:p-8 bg-white">
				<template v-slot:buttonText>
					Add Video
				</template>
			</VideoForm>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateVideo } from '@app/composable/study/videos'
import VideoForm from '@app/components/study/videos/VideoForm.vue'
import Justified from '@app/layouts/Justified.vue'

export default defineComponent({
	name: 'StudyVideosCreate',
	displayName: 'Create Video',
	components: { Justified, VideoForm },
	middlewares: ['isAuthenticated'],
	setup () {
		const { loading, error, factory, createVideo } = useCreateVideo()
		return { loading, error, factory, createVideo }
	}
})
</script>
