<template>
	<PageWrapper>
		<template v-slot:default="{ set, testPreps, notes, videos, flashCards}">
			<div>
				<div class="mb-12">
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">
								TestPreps
							</ion-text>
						</div>
						<router-link :to="`/study/sets/${set.id}/preps`"
							class="text-primary normalText flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SetTestPrepsList :set="set" :sliced="true" :testPreps="testPreps" />
				</div>

				<div class="mb-12">
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">
								FlashCards
							</ion-text>
						</div>

						<router-link :to="`/study/sets/${set.id}/flashCards`"
							class="text-primary normalText flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SetFlashCardsList :flashCards="flashCards" :set="set" :sliced="true" />
				</div>

				<div class="mb-12">
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">
								Notes
							</ion-text>
						</div>
						<router-link :to="`/study/sets/${set.id}/notes`"
							class="text-primary normalText flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SetNotesList :notes="notes" :set="set" :sliced="true" />
				</div>

				<div class="mb-12 hidden">
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">
								Videos
							</ion-text>
						</div>

						<router-link :to="`/study/sets/${set.id}/videos`"
							class="text-primary normalText flex items-center font-bold">
							<span>view all</span>
						</router-link>
					</div>
					<SetVideosList :set="set" :sliced="true" :videos="videos" />
				</div>
			</div>
		</template>
	</PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageWrapper from '@app/components/study/sets/page/PageWrapper.vue'
import SetTestPrepsList from '@app/components/study/testPreps/SetTestPrepsList.vue'
import SetNotesList from '@app/components/study/notes/SetNotesList.vue'
import SetVideosList from '@app/components/study/videos/SetVideosList.vue'
import SetFlashCardsList from '@app/components/study/flashCards/SetFlashCardsList.vue'

export default defineComponent({
	name: 'SetPageIndex',
	displayName: 'Explore',
	components: { PageWrapper, SetTestPrepsList, SetNotesList, SetVideosList, SetFlashCardsList }
})
</script>
