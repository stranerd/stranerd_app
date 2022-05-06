<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEditingNote } from '@app/composable/study/notes'
import { useAuth } from '@app/composable/auth/auth'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'StudyNotesNoteIdEdit',
	displayName: 'Edit Note',
	middlewares: ['isAuthenticated', async ({ to, from }) => {
		const { id } = useAuth()
		const { noteId } = to.params
		const note = getEditingNote()
		if (!note || note.id !== noteId) return '/study/notes/'
		const canEdit = note.user.id === id.value
		if (!canEdit) return `/study/notes/${note.id}`
		useStudyModal().openEditNote()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
