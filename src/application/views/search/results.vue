<template>
	<SearchWrapper>
		<BlockLoading v-if="loading" />
		<div v-else-if="!searched" class="flex flex-col">
			<IonText class="font-bold px-4 lg:p-0">Recent searches</IonText>
			<div v-for="r in recent" :key="r" class="flex p-4 items-center gap-4 text-lg">
				<IonIcon :icon="searchOutline" @click="() => {searchTerm = r; search()}" />
				<IonText class="w-full truncate" @click="() => {searchTerm = r; search()}">{{ r }}</IonText>
				<IonIcon :icon="closeOutline" @click.prevent="clearFromRecent(r)" />
			</div>
		</div>
		<div v-else class="flex flex-col">
			<div class="nav-scroll lg:mb-6">
				<a v-for="{ label, value } in [
						{ label: 'All', value: 0 }, { label: 'Questions', value: 1 },
						{ label: 'FlashCards', value: 2 }, { label: 'Notes', value: 3 },
						{ label: 'Users', value: 4 }, { label: 'Classes', value: 5 },
					]" :key="value" :class="{'!text-primaryBg !border-primaryBg': tab === value}"
					@click="tab = value">{{ label }}</a>
			</div>
			<template v-if="tab === 0">
				<EmptyState v-if="!searchCount" info="No results found." />
				<div v-if="results.questions.length" class="border-bottom-line py-6">
					<div class="w-full flex justify-between items-center px-4 lg:px-0 mb-4">
						<IonText class="font-bold">Questions</IonText>
						<a class="text-info" @click="tab = 1">view all</a>
					</div>
					<SearchQuestionsList :questions="results.questions" :sliced="true" />
				</div>
				<div v-if="results.flashCards.length" class="border-bottom-line py-6">
					<div class="w-full flex justify-between items-center px-4 lg:px-0 mb-4">
						<IonText class="font-bold">Flashcards</IonText>
						<a class="text-info" @click="tab = 2">view all</a>
					</div>
					<SearchFlashCardsList :flashCards="results.flashCards" :sliced="true" />
				</div>
				<div v-if="results.notes.length" class="border-bottom-line py-6">
					<div class="w-full flex justify-between items-center px-4 lg:px-0 mb-4">
						<IonText class="font-bold">Notes</IonText>
						<a class="text-info" @click="tab = 3">view all</a>
					</div>
					<SearchNotesList :notes="results.notes" :sliced="true" />
				</div>
				<div v-if="results.users.length" class="border-bottom-line py-6">
					<div class="w-full flex justify-between items-center px-4 lg:px-0 mb-4">
						<IonText class="font-bold">Students</IonText>
						<a class="text-info" @click="tab = 4">view all</a>
					</div>
					<SearchUsersList :sliced="true" :users="results.users" />
				</div>
				<div v-if="results.classes.length" class="border-bottom-line py-6">
					<div class="w-full flex justify-between items-center px-4 lg:px-0 mb-4">
						<IonText class="font-bold">Classes</IonText>
						<a class="text-info" @click="tab = 5">view all</a>
					</div>
					<SearchClassesList :classes="results.classes" :sliced="true" />
				</div>
			</template>
			<template v-if="tab === 1">
				<EmptyState v-if="results.questions.length === 0" info="No results found." />
				<SearchQuestionsList :questions="results.questions" />
			</template>
			<template v-if="tab === 2">
				<EmptyState v-if="results.flashCards.length === 0" info="No results found." />
				<SearchFlashCardsList :flashCards="results.flashCards" />
			</template>
			<template v-if="tab === 3">
				<EmptyState v-if="results.notes.length === 0" info="No results found." />
				<SearchNotesList :notes="results.notes" />
			</template>
			<template v-if="tab === 4">
				<EmptyState v-if="results.users.length === 0" info="No results found." />
				<SearchUsersList :users="results.users" />
			</template>
			<template v-if="tab === 5">
				<EmptyState v-if="results.classes.length === 0" info="No results found." />
				<SearchClassesList :classes="results.classes" />
			</template>
		</div>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchNotesList from '@app/components/study/notes/SearchNotesList.vue'
import SearchFlashCardsList from '@app/components/study/flashCards/SearchFlashCardsList.vue'
import SearchQuestionsList from '@app/components/questions/questions/SearchQuestionsList.vue'
import SearchUsersList from '@app/components/users/SearchUsersList.vue'
import SearchClassesList from '@app/components/classes/classes/SearchClassesList.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { closeOutline, searchOutline } from 'ionicons/icons'
import { useSearch } from '@app/composable/meta/search'

export default defineComponent({
	name: 'SearchResults',
	components: {
		SearchWrapper, SearchNotesList, SearchFlashCardsList,
		SearchUsersList, SearchQuestionsList, SearchClassesList
	},
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
