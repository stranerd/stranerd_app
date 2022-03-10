<template>
	<Modal>
		<template v-slot:title>
			Add a video
		</template>
		<VideoForm :error="error" :factory="factory" :loading="loading" :submit="createVideo"
			class="p-4 md:p-8 bg-white">
			<template v-slot:buttonText>
				Add Video
			</template>
		</VideoForm>
	</Modal> 
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateVideo } from '@app/composable/study/videos'
import VideoForm from '@app/components/study/videos/VideoForm.vue'

export default defineComponent({
	name: 'CreateSetModal',
	components: { VideoForm },
	setup () {
		const { createVideo, factory, error, loading } = useCreateVideo()
		return { error, loading, createVideo, factory }
	}
})
</script>
