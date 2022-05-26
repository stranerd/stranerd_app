<template>
	<Modal>
		<template v-slot:title>
			Edit Document
		</template>
		<DocumentForm :error="error" :factory="factory" :loading="loading" :submit="editDocument">
			<template v-slot:buttonText>Update document</template>
		</DocumentForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEditDocument } from '@app/composable/study/documents'
import DocumentForm from '@app/components/study/documents/DocumentForm.vue'

export default defineComponent({
	name: 'EditDocumentModal',
	components: { DocumentForm },
	setup () {
		const { editDocument, factory, error, loading } = useEditDocument()
		return { error, loading, editDocument, factory }
	}
})
</script>
