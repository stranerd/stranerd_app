<template>
	<Justified>
		<VideoForm :error="error" :factory="factory" :loading="loading" :submit="createFlashCard"
			title="Create a Flashcard set">
			<template v-slot:buttonTitle>Create</template>
		</VideoForm>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import VideoForm from '@app/components/study/videos/VideoForm.vue'
import { useCreateFlashCard } from '@app/composable/study/flashCards'

export default defineComponent({
	name: 'StudyVideosCreate',
	displayName: 'Create Flashcard',
	components: { Justified, VideoForm },
	middlewares: ['isAuthenticated'],
	setup () {
		const { createFlashCard, factory, error, loading } = useCreateFlashCard()
		return { error, loading, createFlashCard, factory }
	}
})
</script>
