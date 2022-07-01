<template>
	<SearchWrapper>
		<template
			v-slot:default="{ count, searchTerm, classes, notes, flashCards, questions, users }">
			<div class="flex flex-col">
				<div v-if="questions.length" class="border-bottom-line py-6">
					<div class="w-full flex justify-between items-center px-4 lg:px-0 mb-4">
						<IonText class="font-bold">Questions</IonText>
						<router-link :to="`/search/questions?search=${searchTerm}`" class="text-info">
							view all
						</router-link>
					</div>
					<SearchQuestionsList :questions="questions" :sliced="true" />
				</div>
				<div v-if="flashCards.length" class="border-bottom-line py-6">
					<div class="w-full flex justify-between items-center px-4 lg:px-0 mb-4">
						<IonText class="font-bold">Flashcards</IonText>
						<router-link :to="`/search/flashCards?search=${searchTerm}`" class="text-info">
							view all
						</router-link>
					</div>
					<SearchFlashCardsList :flashCards="flashCards" :sliced="true" />
				</div>
				<div v-if="notes.length" class="border-bottom-line py-6">
					<div class="w-full flex justify-between items-center px-4 lg:px-0 mb-4">
						<IonText class="font-bold">Notes</IonText>
						<router-link :to="`/search/notes?search=${searchTerm}`" class="text-info">
							view all
						</router-link>
					</div>
					<SearchNotesList :notes="notes" :sliced="true" />
				</div>
				<div v-if="users.length" class="border-bottom-line py-6">
					<div class="w-full flex justify-between items-center px-4 lg:px-0 mb-4">
						<IonText class="font-bold">Students</IonText>
						<router-link :to="`/search/users?search=${searchTerm}`" class="text-info">
							view all
						</router-link>
					</div>
					<SearchUsersList :sliced="true" :users="users" />
				</div>
				<div v-if="classes.length" class="border-bottom-line py-6">
					<div class="w-full flex justify-between items-center px-4 lg:px-0 mb-4">
						<IonText class="font-bold">Classes</IonText>
						<router-link :to="`/search/classes?search=${searchTerm}`" class="text-info">
							view all
						</router-link>
					</div>
					<SearchClassesList :classes="classes" :sliced="true" />
				</div>
				<EmptyState v-if="!count" info="No results found." />
			</div>
		</template>
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

export default defineComponent({
	name: 'Search',
	components: {
		SearchWrapper, SearchNotesList, SearchFlashCardsList,
		SearchUsersList, SearchQuestionsList, SearchClassesList
	},
	setup () {
		useRouteMeta('Search', { back: true })
	}
})
</script>
