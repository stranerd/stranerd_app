<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<FileForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createFile"
			class="page-padding">
			<template v-slot:buttonText>
				Upload
			</template>
		</FileForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import FileForm from '@app/components/study/files/FileForm.vue'
import { useCreateFile } from '@app/composable/study/files'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'FilesCreate',
	components: { FileForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Upload a file', { back: true })
		const { factory, error, loading, createFile } = useCreateFile()
		return { factory, error, loading, createFile }
	}
})
</script>
