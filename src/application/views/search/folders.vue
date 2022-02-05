<template>
	<SearchWrapper>
		<template v-slot:default="{ sets }">
			<SearchSetsList :sets="sets" />
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchSetsList from '@app/components/study/sets/SearchSetsList.vue'

export default defineComponent({
	name: 'SearchSets',
	displayName: 'Search Folders',
	components: { SearchWrapper, SearchSetsList }
})
</script>
