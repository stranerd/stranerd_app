<template>
	<div>
		<div class="md:px-4 md:pt-8">
			<SetHeader :set="set" />
		</div>
		<div class="px-4 pb-8">
			<SetStats :set="set" class="mt-3 md:mt-8" />
			<div class="mt-3 md:mt-8">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text>Test Preps</ion-text>
					</div>
					<router-link
						:to="`/study/sets/${set.id}/preps`"
						class="text-primary normalText flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<TestPrepsList :set="set" :sliced="true" :testPreps="testPreps" />
			</div>
			<div class="mt-3 md:mt-8">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text>FlashCards</ion-text>
					</div>
					<router-link
						:to="`/study/sets/${set.id}/flashCards`"
						class="text-primary normalText flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<FlashCardsList :flashCards="flashCards" :set="set" :sliced="true" />
			</div>
			<div class="mt-3 md:mt-8">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text>Notes</ion-text>
					</div>
					<router-link
						:to="`/study/sets/${set.id}/notes`"
						class="text-primary normalText flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<NotesList :notes="notes" :set="set" :sliced="true" />
			</div>
			<div class="mt-3 md:mt-8">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text>Videos</ion-text>
					</div>
					<router-link
						:to="`/study/sets/${set.id}/videos`"
						class="text-primary normalText flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<VideosList :set="set" :sliced="true" :videos="videos" />
			</div>
			<div class="mt-3 md:mt-8">
				<div class="w-full flex justify-between mb-4">
					<div class="heading font-bold text-main_dark flex items-center">
						<ion-text>Study sets</ion-text>
					</div>
					<router-link
						:to="`/study/sets`"
						class="text-primary normalText flex items-center font-bold">
						<span>view all</span>
					</router-link>
				</div>
				<EmptyState v-if="sets.length === 0" info="No sets created." />

				<div v-else class="showcase">
					<SetCard v-for="set in sets" :key="set.hash" :set="set" />
				</div>
			</div>
		</div>
		<PageLoading v-if="loading" />
		<PageLoading v-if="setLoading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { SetEntity } from '@modules/study'
import SetHeader from '@app/components/study/sets/SetHeader.vue'
import SetStats from '@app/components/study/sets/SetStats.vue'
import TestPrepsList from '@app/components/study/testPreps/SetTestPrepsList.vue'
import FlashCardsList from '@app/components/study/flashCards/SetFlashCardsList.vue'
import NotesList from '@app/components/study/notes/SetNotesList.vue'
import VideosList from '@app/components/study/videos/SetVideosList.vue'
import { useMySets, useSet } from '@app/composable/study/sets'
import { useAuth } from '@app/composable/auth/auth'
import SetCard from '@app/components/study/sets/SetListCard.vue'

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
		SetCard
	},
	setup (props) {
		const { id } = useAuth()
		const { listener, loading, error, notes, videos, flashCards, testPreps } = useSet(props.set)
		const { normalSets, loading: setLoading, error: setError, listener: mySetsListener } = useMySets()
		onMounted(async () => {
			await listener.startListener()
			await mySetsListener.startListener()
		})
		onBeforeUnmount(async () => {
			await listener.closeListener()
			await mySetsListener.closeListener()
		})
		const sets = computed({
			get: () => normalSets.value.slice(0, 6),
			set: () => {
			}
		})
		return { id, loading, error, notes, videos, flashCards, testPreps, sets, setLoading, setError }
	}
})
</script>
