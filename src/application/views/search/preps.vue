<template>
	<SearchWrapper>
		<template v-slot:default="{ testPreps }">
			<SearchTestPrepsList :testPreps="testPreps" />
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchTestPrepsList from '@app/components/study/testPreps/SearchTestPrepsList.vue'

export default defineComponent({
	name: 'SearchPreps',
	displayName: 'Search Preps',
	components: { SearchWrapper, SearchTestPrepsList }
})
</script>
