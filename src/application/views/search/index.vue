<template>
	<SearchWrapper>
		<template
			v-slot:default="{ count, searchTerm, testPreps, documents, flashCards, sets, questions, users }">
			<div class="py-4 md:py-0 flex flex-col gap-4 md:gap-6">
				<div v-if="questions.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="text-secondaryText flex items-center">
							<ion-text class="text-heading font-bold">Questions</ion-text>
						</div>

						<router-link :to="`/search/questions?search=${searchTerm}`"
							class="text-primary flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchQuestionsList :questions="questions" :sliced="true" />
				</div>
				<div v-if="testPreps.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="text-secondaryText flex items-center">
							<ion-text class="text-heading font-bold">TestPreps</ion-text>
						</div>
						<router-link :to="`/search/preps?search=${searchTerm}`"
							class="text-primary flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchTestPrepsList :sliced="true" :testPreps="testPreps" />
				</div>
				<div v-if="flashCards.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="text-secondaryText flex items-center">
							<ion-text class="text-heading font-bold">FlashCards</ion-text>
						</div>

						<router-link :to="`/search/flashCards?search=${searchTerm}`"
							class="text-primary flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchFlashCardsList :flashCards="flashCards" :sliced="true" />
				</div>
				<div v-if="documents.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="text-secondaryText flex items-center">
							<ion-text class="text-heading font-bold">Documents</ion-text>
						</div>
						<router-link :to="`/search/documents?search=${searchTerm}`"
							class="text-primary flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchDocumentsList :documents="documents" :sliced="true" />
				</div>
				<div v-if="sets.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="text-secondaryText flex items-center">
							<ion-text class="text-heading font-bold">Folders</ion-text>
						</div>

						<router-link :to="`/search/sets?search=${searchTerm}`"
							class="text-primary flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchSetsList :sets="sets" :sliced="true" />
				</div>
				<div v-if="users.length" class="border-bottom-line">
					<div class="w-full flex justify-between px-4 md:px-0 md:mb-4">
						<div class="text-secondaryText flex items-center">
							<ion-text class="text-heading font-bold">Nerds</ion-text>
						</div>

						<router-link :to="`/search/nerds?search=${searchTerm}`"
							class="text-primary flex items-center font-bold">
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
import SearchDocumentsList from '@app/components/study/documents/SearchDocumentsList.vue'
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
		SearchDocumentsList,
		SearchFlashCardsList,
		SearchSetsList,
		SearchUsersList,
		SearchQuestionsList
	}
})
</script>
