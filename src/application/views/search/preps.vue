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
	name: 'SearchTestPreps',
	displayName: 'Search',
	components: { SearchWrapper, SearchTestPrepsList }
})
</script>
