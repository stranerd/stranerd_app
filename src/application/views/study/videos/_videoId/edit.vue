<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEditingVideo } from '@app/composable/study/videos'
import { useAuth } from '@app/composable/auth/auth'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'StudyVideosVideoIdEdit',
	displayName: 'Edit Video',
	middlewares: ['isAuthenticated', async ({ to, from }) => {
		const { id } = useAuth()
		const { videoId } = to.params
		const video = getEditingVideo()
		if (!video || video.id !== videoId) return '/study/videos/'
		const canEdit = video.userId === id.value
		if (!canEdit) return `/study/videos/${video.id}`
		useStudyModal().openEditVideo()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
