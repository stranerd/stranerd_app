<template>
	<ExploreWrapper>
		<div>
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
				<ExploreTestPrepsList :sliced="true" :testPreps="testPreps" />
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
				<ExploreFlashCardsList :flashCards="flashCards" :sliced="true" />
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
				<ExploreNotesList :notes="notes" :sliced="true" />
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
				<ExploreVideosList :sliced="true" :videos="videos" />
			</div>

			<PageLoading v-if="flashCardLoading" />
			<PageLoading v-if="noteLoading" />
			<PageLoading v-if="videoLoading" />
			<PageLoading v-if="testPrepLoading" />
		</div>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import ExploreWrapper from '@app/components/study/explore/ExploreWrapper.vue'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'
import ExploreNotesList from '@app/components/study/notes/ExploreNotesList.vue'
import ExploreVideosList from '@app/components/study/videos/ExploreVideosList.vue'
import ExploreFlashCardsList from '@app/components/study/flashCards/ExploreFlashCardsList.vue'
import { useFlashCardList } from '@app/composable/study/flashCards'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { useVideoList } from '@app/composable/study/videos'
import { useNoteList } from '@app/composable/study/notes'

export default defineComponent({
	name: 'ExploreAll',
	displayName: 'Explore',
	components: { ExploreWrapper, ExploreTestPrepsList, ExploreNotesList, ExploreVideosList, ExploreFlashCardsList },
	setup () {
		const {
			flashCards,
			listener: flashCardListener,
			loading: flashCardLoading,
			error: flashCardError
		} = useFlashCardList()
		const { notes, listener: noteListener, loading: noteLoading, error: noteError } = useNoteList()
		const { videos, listener: videoListener, loading: videoLoading, error: videoError } = useVideoList()
		const {
			testPreps,
			listener: testPrepListener,
			loading: testPrepLoading,
			error: testPrepError
		} = useTestPrepList()
		onMounted(async () => {
			await Promise.all([
				flashCardListener.startListener(),
				noteListener.startListener(),
				flashCardListener.startListener(),
				testPrepListener.startListener()
			])
		})
		onBeforeUnmount(async () => {
			await Promise.all([
				flashCardListener.closeListener(),
				noteListener.closeListener(),
				videoListener.closeListener(),
				testPrepListener.closeListener()
			])
		})
		return {
			flashCards, flashCardLoading, flashCardError,
			notes, noteLoading, noteError,
			videos, videoLoading, videoError,
			testPreps, testPrepLoading, testPrepError
		}
	}
})
</script>
