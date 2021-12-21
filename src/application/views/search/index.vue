<template>
	<SearchWrapper>
		<template v-slot:default="{ searchTerm, testPreps, notes, videos, flashCards }">
			<div>
				<div class="mb-12">
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">
								TestPreps
							</ion-text>
						</div>
						<router-link :to="`/search/preps?search=${searchTerm}`"
							class="text-primary normalText flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchTestPrepsList :sliced="true" :testPreps="testPreps" />
				</div>

				<div class="mb-12">
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">
								Notes
							</ion-text>
						</div>
						<router-link :to="`/search/notes?search=${searchTerm}`"
							class="text-primary normalText flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchNotesList :notes="notes" :sliced="true" />
				</div>

				<div class="mb-12 hidden">
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">
								Videos
							</ion-text>
						</div>

						<router-link :to="`/search/videos?search=${searchTerm}`"
							class="text-primary normalText flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchVideosList :sliced="true" :videos="videos" />
				</div>

				<div class="mb-12">
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">
								FlashCards
							</ion-text>
						</div>

						<router-link :to="`/search/flashCards?search=${searchTerm}`"
							class="text-primary normalText flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SearchFlashCardsList :flashCards="flashCards" :sliced="true" />
				</div>
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

export default defineComponent({
	name: 'SearchAll',
	displayName: 'Search',
	components: {
		SearchWrapper,
		SearchTestPrepsList,
		SearchNotesList,
		SearchVideosList,
		SearchFlashCardsList
	}
})
</script>
