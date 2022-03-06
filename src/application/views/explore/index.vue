<template>
	<ExploreWrapper>
		<div class="flex flex-col gap-4 md:gap-6 py-4 md:py-0">
			<div>
				<div class="w-full flex justify-between p-4 md:p-0 md:mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text class="mr-3">
							TestPreps
						</ion-text>
					</div>
					<router-link :to="`/explore/preps`"
						class="text-primary text-body flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreTestPrepsList :sliced="true" />
			</div>
			<div>
				<div class="w-full flex justify-between p-4 md:p-0 md:mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text class="mr-3">
							FlashCards
						</ion-text>
					</div>
					<router-link :to="`/explore/flashCards`"
						class="text-primary text-body flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreFlashCardsList :sliced="true" />
			</div>
			<div>
				<div class="w-full flex justify-between p-4 md:p-0 md:mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text class="mr-3">
							Notes
						</ion-text>
					</div>
					<router-link :to="`/explore/notes`"
						class="text-primary text-body flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreNotesList :sliced="true" />
			</div>
			<div>
				<div class="w-full flex justify-between p-4 md:p-0 md:mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text class="mr-3">
							Videos
						</ion-text>
					</div>
					<router-link :to="`/explore/videos`"
						class="text-primary text-body flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreVideosList :sliced="true" />
			</div>
		</div>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'
import ExploreNotesList from '@app/components/study/notes/ExploreNotesList.vue'
import ExploreVideosList from '@app/components/study/videos/ExploreVideosList.vue'
import ExploreFlashCardsList from '@app/components/study/flashCards/ExploreFlashCardsList.vue'

export default defineComponent({
	name: 'Explore',
	displayName: 'Explore',
	components: {
		ExploreWrapper,
		ExploreTestPrepsList,
		ExploreNotesList,
		ExploreVideosList,
		ExploreFlashCardsList
	}
})
</script>
