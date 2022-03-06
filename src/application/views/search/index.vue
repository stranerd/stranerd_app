<template>
	<SearchWrapper>
		<template
			v-slot:default="{ count, searchTerm, testPreps, notes, videos, flashCards, sets, questions, users }">
			<div class="flex flex-col gap-4 md:gap-6 py-4 md:py-0">
				<div v-if="questions.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text>Questions</ion-text>
						</div>

						<router-link :to="`/search/questions?search=${searchTerm}`"
							class="text-primary text-body flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchQuestionsList :questions="questions" :sliced="true" />
				</div>
				<div v-if="testPreps.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text>TestPreps</ion-text>
						</div>
						<router-link :to="`/search/preps?search=${searchTerm}`"
							class="text-primary text-body flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchTestPrepsList :sliced="true" :testPreps="testPreps" />
				</div>
				<div v-if="flashCards.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text>FlashCards</ion-text>
						</div>

						<router-link :to="`/search/flashCards?search=${searchTerm}`"
							class="text-primary text-body flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchFlashCardsList :flashCards="flashCards" :sliced="true" />
				</div>
				<div v-if="notes.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text>Notes</ion-text>
						</div>
						<router-link :to="`/search/notes?search=${searchTerm}`"
							class="text-primary text-body flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchNotesList :notes="notes" :sliced="true" />
				</div>
				<div v-if="videos.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text>Videos</ion-text>
						</div>
						<router-link :to="`/search/videos?search=${searchTerm}`"
							class="text-primary text-body flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchVideosList :sliced="true" :videos="videos" />
				</div>
				<div v-if="sets.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text>Folders</ion-text>
						</div>

						<router-link :to="`/search/sets?search=${searchTerm}`"
							class="text-primary text-body flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchSetsList :sets="sets" :sliced="true" />
				</div>
				<div v-if="users.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text>Nerds</ion-text>
						</div>

						<router-link :to="`/search/nerds?search=${searchTerm}`"
							class="text-primary text-body flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchUsersList :sliced="true" :users="users" />
				</div>
				<EmptyState v-if="!count" info="No results found." />
			</div>
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchTestPrepsList from '@app/components/study/testPreps/SearchTestPrepsList.vue'
import SearchNotesList from '@app/components/study/notes/SearchNotesList.vue'
import SearchVideosList from '@app/components/study/videos/SearchVideosList.vue'
import SearchFlashCardsList from '@app/components/study/flashCards/SearchFlashCardsList.vue'
import SearchSetsList from '@app/components/study/sets/SearchSetsList.vue'
import SearchQuestionsList from '@app/components/questions/questions/SearchQuestionsList.vue'
import SearchUsersList from '@app/components/users/SearchUsersList.vue'

export default defineComponent({
	name: 'Search',
	displayName: 'Search',
	components: {
		SearchWrapper,
		SearchTestPrepsList,
		SearchNotesList,
		SearchVideosList,
		SearchFlashCardsList,
		SearchSetsList,
		SearchUsersList,
		SearchQuestionsList
	}
})
</script>
