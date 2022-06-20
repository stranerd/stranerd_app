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
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'SearchPreps',
	components: { SearchWrapper, SearchTestPrepsList },
	setup () {
		useRouteMeta('Search Preps', { back: true })
	}
})
</script>
