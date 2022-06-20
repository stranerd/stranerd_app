<template>
	<SearchWrapper>
		<template v-slot:default="{ flashCards }">
			<SearchFlashCardsList :flashCards="flashCards" />
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchFlashCardsList from '@app/components/study/flashCards/SearchFlashCardsList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'SearchFlashCards',
	components: { SearchWrapper, SearchFlashCardsList },
	setup () {
		useRouteMeta('Search Flashcards', { back: true })
	}
})
</script>
