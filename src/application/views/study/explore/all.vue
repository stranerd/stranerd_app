<template>
	<ExploreWrapper>
		<div class="p-4 md:w-8/12 w-full mx-auto">
			<div class="mb-12">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text class="mr-3">
							TestPreps
						</ion-text>
						<ion-badge class="uppercase">
							Latest
						</ion-badge>
					</div>
					<router-link class="text-primary normalText flex items-center font-bold"
						to="/study/explore/preps">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreTestPreps :sliced="true" />
			</div>

			<div class="mb-12">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text class="mr-3">
							FlashCards
						</ion-text>
						<ion-badge class="uppercase">
							Latest
						</ion-badge>
					</div>

					<router-link class="text-primary normalText flex items-center font-bold"
						to="/study/explore/flashCards">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreFlashcards :sliced="true" class="mb-8" />
			</div>

			<div class="mb-12">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text class="mr-3">
							Notes
						</ion-text>
						<ion-badge class="uppercase">
							Latest
						</ion-badge>
					</div>
					<router-link class="text-primary normalText flex items-center font-bold"
						to="/study/explore/notes">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreNotes :sliced="true" />
			</div>

			<div class="mb-12">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text class="mr-3">
							Videos
						</ion-text>
						<ion-badge class="uppercase">
							Latest
						</ion-badge>
					</div>

					<router-link class="text-primary normalText flex items-center font-bold"
						to="/study/explore/videos">
						<span>view all</span>
					</router-link>
				</div>
				<ExploreVideos :sliced="true" />
			</div>
		</div>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/study/explore/ExploreWrapper.vue'
import ExploreTestPreps from '@app/components/study/explore/ExploreTestPreps.vue'
import ExploreNotes from '@app/components/study/explore/ExploreNotes.vue'
import ExploreVideos from '@app/components/study/explore/ExploreVideos.vue'
import ExploreFlashcards from '@app/components/study/explore/ExploreFlashcards.vue'

export default defineComponent({
	name: 'ExploreAll',
	displayName: 'Explore',
	components: { ExploreWrapper, ExploreTestPreps, ExploreNotes, ExploreVideos, ExploreFlashcards }
})
</script>

<style lang="scss" scoped>
	.ion-iten-transparent {
		--background: transparent;
	}

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}
</style>
