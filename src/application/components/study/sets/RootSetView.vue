<template>
	<div>
		<div class="md:px-4 md:py-8 pb-12">
			<SetHeader :set="set" />
		</div>
		<div class="p-4">
			<SetStats :set="set" class="mb-4 md:mb-8" />
			<div class="mb-4 md:mb-8">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text>Test Preps</ion-text>
					</div>
					<router-link
						:to="`/study/sets/${set.id}/preps`"
						class="text-primary text-body flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<TestPrepsList :set="set" :sliced="true" :testPreps="testPreps" />
			</div>
			<div class="mb-4 md:mb-8">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text>FlashCards</ion-text>
					</div>
					<router-link
						:to="`/study/sets/${set.id}/flashCards`"
						class="text-primary text-body flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<FlashCardsList :flashCards="flashCards" :set="set" :sliced="true" />
			</div>
			<div class="mb-4 md:mb-8">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text>Notes</ion-text>
					</div>
					<router-link
						:to="`/study/sets/${set.id}/notes`"
						class="text-primary text-body flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<NotesList :notes="notes" :set="set" :sliced="true" />
			</div>
			<div class="mb-4 md:mb-8">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text>Videos</ion-text>
					</div>
					<router-link
						:to="`/study/sets/${set.id}/videos`"
						class="text-primary text-body flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<VideosList :set="set" :sliced="true" :videos="videos" />
			</div>
			<div class="mb-4 md:mb-8">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text>Sets</ion-text>
					</div>
					<router-link
						:to="`/study/sets/${set.id}/sets`"
						class="text-primary text-body flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<SetsList :set="set" :sets="sets" :sliced="true" />
			</div>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SetEntity } from '@modules/study'
import SetHeader from '@app/components/study/sets/SetHeader.vue'
import SetStats from '@app/components/study/sets/SetStats.vue'
import TestPrepsList from '@app/components/study/testPreps/SetTestPrepsList.vue'
import FlashCardsList from '@app/components/study/flashCards/SetFlashCardsList.vue'
import NotesList from '@app/components/study/notes/SetNotesList.vue'
import VideosList from '@app/components/study/videos/SetVideosList.vue'
import SetsList from '@app/components/study/sets/SetChildrenList.vue'
import { useSet } from '@app/composable/study/sets'

export default defineComponent({
	name: 'SetView',
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	components: {
		SetHeader,
		SetStats,
		TestPrepsList,
		FlashCardsList,
		NotesList,
		VideosList,
		SetsList
	},
	setup (props) {
		const { loading, error, notes, videos, flashCards, testPreps, sets } = useSet(props.set)
		return { loading, error, notes, videos, flashCards, testPreps, sets }
	}
})
</script>
