<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<FileForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editFile"
			class="page-padding">
			<template v-slot:buttonText>
				Save
			</template>
		</FileForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEditingFile, useEditFile } from '@app/composable/study/files'
import { useAuth } from '@app/composable/auth/auth'
import FileForm from '@app/components/study/files/FileForm.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyFilesFileIdEdit',
	components: { FileForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { fileId = '' } = to.params
		const file = getEditingFile()
		if (!file || file.id !== fileId) return `/study/files/${fileId}`
		const canEdit = file.user.id === id.value
		if (!canEdit) return `/study/files/${file.id}`
	}]),
	setup () {
		useRouteMeta('Edit File', { back: true })
		const { factory, error, loading, editFile } = useEditFile()
		return { factory, error, loading, editFile }
	}
})
</script>
