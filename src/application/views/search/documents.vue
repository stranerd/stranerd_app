<template>
	<SearchWrapper>
		<template v-slot:default="{ documents }">
			<SearchDocumentsList :documents="documents" />
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchDocumentsList from '@app/components/study/documents/SearchDocumentsList.vue'

export default defineComponent({
	name: 'SearchDocuments',
	displayName: 'Search Documents',
	components: { SearchWrapper, SearchDocumentsList }
})
</script>
