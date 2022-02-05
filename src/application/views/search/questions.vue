<template>
	<SearchWrapper>
		<template v-slot:default="{ questions }">
			<SearchQuestionsList :questions="questions" />
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchQuestionsList from '@app/components/questions/questions/SearchQuestionsList.vue'

export default defineComponent({
	name: 'SearchQuestions',
	displayName: 'Search Questions',
	components: { SearchWrapper, SearchQuestionsList }
})
</script>
