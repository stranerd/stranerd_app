<template>
	<SearchWrapper baseRoute="/search/results">
		<template v-slot="{ tab }">
			<div class="showcase-flex">
				<BlockLoading v-if="loading" />
				<template v-else-if="!searched">
					<div v-for="r in recent" :key="r" class="flex p-4 card-sm items-center gap-4 text-lg">
						<IonIcon :icon="searchOutline" @click="() => {searchTerm = r; search()}" />
						<IonText class="w-full truncate" @click="() => {searchTerm = r; search()}">{{ r }}</IonText>
						<IonIcon :icon="closeOutline" @click.prevent="clearFromRecent(r)" />
					</div>
				</template>
				<SearchQuestionsList v-else-if="tab === 'questions'" :questions="results.questions" />
				<SearchFlashCardsList v-else-if="tab === 'flashCards'" :flashCards="results.flashCards" />
				<SearchUsersList v-else-if="tab === 'users'" :users="results.users" />
				<template v-else>
					<div class="flex flex-col gap-2">
						<span class="flex gap-4 justify-between gap-4">
							<IonText class="font-bold">Questions</IonText>
							<router-link class="text-info" to="/search/results?tab=questions">view all</router-link>
						</span>
						<SearchQuestionsList :questions="results.questions.slice(0, 3)" :sliced="true" />
					</div>
					<div class="flex flex-col gap-2">
						<span class="flex gap-4 justify-between gap-4">
							<IonText class="font-bold">Flashcards</IonText>
							<router-link class="text-info" to="/search/results?tab=flashCards">view all</router-link>
						</span>
						<SearchFlashCardsList :flashCards="results.flashCards.slice(0, 3)" :sliced="true" />
					</div>
					<div class="flex flex-col gap-2">
						<span class="flex gap-4 justify-between gap-4">
							<IonText class="font-bold">Students</IonText>
							<router-link class="text-info" to="/search/results?tab=users">view all</router-link>
						</span>
						<SearchUsersList :sliced="true" :users="results.users.slice(0, 3)" />
					</div>
				</template>
				<SuggestedActions />
			</div>
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchFlashCardsList from '@app/components/search/SearchFlashCardsList.vue'
import SearchQuestionsList from '@app/components/search/SearchQuestionsList.vue'
import SearchUsersList from '@app/components/search/SearchUsersList.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { closeOutline, searchOutline } from 'ionicons/icons'
import { useSearch } from '@app/composable/meta/search'

export default defineComponent({
	name: 'SearchResults',
	components: { SearchWrapper, SearchFlashCardsList, SearchUsersList, SearchQuestionsList },
	setup () {
		useRouteMeta('Search', { back: true })
		const {
			results, tab, searched, searchCount, recent, searchTerm, loading,
			clearFromRecent, search
		} = useSearch()
		return {
			closeOutline, searchOutline,
			results, tab, searched, searchCount, recent, searchTerm, loading,
			clearFromRecent, search
		}
	}
})
</script>
