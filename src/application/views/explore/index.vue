<template>
	<ExploreWrapper>
		<div class="py-4 md:py-0 flex flex-col gap-4 md:gap-6">
			<div class="border-bottom-line">
				<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
					<div class="text-secondaryText flex items-center">
						<IonText class="mr-3 text-heading font-bold">
							TestPreps
						</IonText>
					</div>
					<router-link :to="`/explore/preps`"
						class="text-primary flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreTestPrepsList :sliced="true" />
			</div>
			<div class="border-bottom-line">
				<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
					<div class="text-secondaryText flex items-center">
						<IonText class="mr-3 font-bold text-heading">
							FlashCards
						</IonText>
					</div>
					<router-link :to="`/explore/flashCards`"
						class="text-primary flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreFlashCardsList :sliced="true" />
			</div>
			<div class="border-bottom-line">
				<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
					<div class="text-secondaryText flex items-center">
						<IonText class="text-heading font-bold mr-3">
							Documents
						</IonText>
					</div>
					<router-link :to="`/explore/documents`"
						class="text-primary flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreDocumentsList :sliced="true" />
			</div>
		</div>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'
import ExploreDocumentsList from '@app/components/study/documents/ExploreDocumentsList.vue'
import ExploreFlashCardsList from '@app/components/study/flashCards/ExploreFlashCardsList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Explore',
	components: {
		ExploreWrapper,
		ExploreTestPrepsList,
		ExploreDocumentsList,
		ExploreFlashCardsList
	},
	setup () {
		useRouteMeta('Explore')
	}
})
</script>
