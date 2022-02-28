<template>
	<PageWrapper>
		<template v-slot:default="{ set, testPreps, notes, videos, flashCards, sets }">
			<div class="flex flex-col gap-6">
				<EmptyState v-if="!set.allSaved.length" info="This folder is empty" />

				<div v-if="sets.length">
					<ion-text class="font-semibold block text-main_dark mb-2">Folders</ion-text>
					<div class="showcase">
						<SetListCard v-for="item in sets" :key="item.hash"
							:openMenu="($ev) => openStudyEntityMenu(item, { set }, $ev)"
							:set="item" />
					</div>
				</div>

				<div v-if="testPreps.length + flashCards.length + notes.length + videos.length">
					<ion-text class="font-semibold block text-main_dark mb-2">Others</ion-text>
					<div class="showcase">
						<TestPrepListCard v-for="testPrep in testPreps" :key="testPrep.hash"
							:openMenu="($ev) => openStudyEntityMenu(testPrep, { set }, $ev)"
							:testPrep="testPrep" />
						<FlashCardListCard v-for="flashCard in flashCards" :key="flashCard.hash" :flashCard="flashCard"
							:openMenu="($ev) => openStudyEntityMenu(flashCard, { set }, $ev)" />
						<NoteListCard v-for="note in notes" :key="note.hash" :note="note"
							:openMenu="($ev) => openStudyEntityMenu(note, { set }, $ev)" />
						<VideoListCard v-for="video in videos" :key="video.hash"
							:openMenu="($ev) => openStudyEntityMenu(video, { set }, $ev)"
							:video="video" />
					</div>
				</div>
			</div>
		</template>
	</PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageWrapper from '@app/components/study/sets/page/PageWrapper.vue'
import TestPrepListCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import VideoListCard from '@app/components/study/videos/VideoListCard.vue'
import SetListCard from '@app/components/study/sets/SetListCard.vue'

export default defineComponent({
	name: 'StudySetsSetId',
	displayName: 'Study Folder',
	components: { PageWrapper, TestPrepListCard, FlashCardListCard, NoteListCard, VideoListCard, SetListCard },
	setup () {
		return { openStudyEntityMenu }
	}
})
</script>
