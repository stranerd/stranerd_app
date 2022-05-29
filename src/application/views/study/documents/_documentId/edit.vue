<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEditingDocument } from '@app/composable/study/documents'
import { useAuth } from '@app/composable/auth/auth'
import { useStudyModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudyDocumentsDocumentIdEdit',
	displayName: 'Edit Document',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ from, to }) => {
		const { id } = useAuth()
		const { documentId } = to.params
		const document = getEditingDocument()
		if (!document || document.id !== documentId) return '/study/documents/'
		const canEdit = document.user.id === id.value
		if (!canEdit) return `/study/documents/${document.id}`
		useStudyModal().openEditDocument()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}])
})
</script>
