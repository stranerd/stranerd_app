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
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'SearchDocuments',
	components: { SearchWrapper, SearchDocumentsList },
	setup () {
		useRouteMeta('SearchDocuments', { back: true })
	}
})
</script>
