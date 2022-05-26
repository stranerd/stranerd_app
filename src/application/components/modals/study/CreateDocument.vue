<template>
	<Modal>
		<template v-slot:title>
			Create a document
		</template>
		<DocumentForm :error="error" :factory="factory" :loading="loading" :submit="createDocument">
			<template v-slot:buttonText>
				Create Document
			</template>
		</DocumentForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateDocument } from '@app/composable/study/documents'
import DocumentForm from '@app/components/study/documents/DocumentForm.vue'

export default defineComponent({
	name: 'CreateDocumentModal',
	components: { DocumentForm },
	setup () {
		const { createDocument, factory, error, loading } = useCreateDocument()
		return { error, loading, createDocument, factory }
	}
})
</script>
