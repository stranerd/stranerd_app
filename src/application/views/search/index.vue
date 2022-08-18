<template>
	<SearchWrapper>
		<IonText class="font-bold px-4 lg:p-0">Latest</IonText>
		<BlockLoading v-if="loading" />
		<EmptyState v-if="!exploreCount" info="Nothing to explore." />
		<SearchQuestionsList :questions="explore.questions" />
		<SearchFlashCardsList :flashCards="explore.flashCards" />
		<SearchNotesList :notes="explore.notes" />
		<SearchUsersList v-if="0" :users="explore.users" />
		<SearchClassesList :classes="explore.classes" />
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchNotesList from '@app/components/study/notes/SearchNotesList.vue'
import SearchFlashCardsList from '@app/components/study/flashCards/SearchFlashCardsList.vue'
import SearchQuestionsList from '@app/components/questions/questions/SearchQuestionsList.vue'
import SearchUsersList from '@app/components/users/SearchUsersList.vue'
import SearchClassesList from '@app/components/classes/classes/SearchClassesList.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { useSearch } from '@app/composable/meta/search'

export default defineComponent({
	name: 'Search',
	components: {
		SearchWrapper, SearchNotesList, SearchFlashCardsList,
		SearchUsersList, SearchQuestionsList, SearchClassesList
	},
	setup () {
		useRouteMeta('Search', { back: true })
		const { explore, exploreCount, loading, fetched, fetchExplore } = useSearch()
		onMounted(async () => {
			if (!loading.value && !fetched.value) await fetchExplore()
		})
		return { explore, exploreCount, loading }
	}
})
</script>
