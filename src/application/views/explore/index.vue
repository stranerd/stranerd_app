<template>
	<ExploreWrapper>
		<div class="py-4 md:py-0 flex flex-col gap-4 md:gap-6">
			<div class="border-bottom-line">
				<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
					<div class="text-secondaryText flex items-center">
						<IonText class="mr-3 text-xl font-bold">
							TestPreps
						</IonText>
					</div>
					<router-link :to="`/explore/preps`"
						class="flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreTestPrepsList :sliced="true" />
			</div>
			<div class="border-bottom-line">
				<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
					<div class="text-secondaryText flex items-center">
						<IonText class="mr-3 font-bold text-xl">
							FlashCards
						</IonText>
					</div>
					<router-link :to="`/explore/flashCards`"
						class="flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreFlashCardsList :sliced="true" />
			</div>
			<div class="border-bottom-line">
				<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
					<div class="text-secondaryText flex items-center">
						<IonText class="text-xl font-bold mr-3">
							Notes
						</IonText>
					</div>
					<router-link :to="`/explore/notes`"
						class="flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreNotesList :sliced="true" />
			</div>
		</div>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'
import ExploreNotesList from '@app/components/study/notes/ExploreNotesList.vue'
import ExploreFlashCardsList from '@app/components/study/flashCards/ExploreFlashCardsList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Explore',
	components: {
		ExploreWrapper,
		ExploreTestPrepsList,
		ExploreNotesList,
		ExploreFlashCardsList
	},
	setup () {
		useRouteMeta('Explore', { back: true })
	}
})
</script>
