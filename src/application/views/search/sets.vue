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
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'SearchSets',
	components: { SearchWrapper, SearchSetsList },
	setup () {
		useRouteMeta('Search Folders')
	}
})
</script>
