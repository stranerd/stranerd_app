<template>
	<div>
		<div class="md:px-4 md:pt-8">
			<SetHeader :set="set" />
		</div>
		<div class="px-4 pb-8">
			<SetStats :set="set" class="mt-16" />
			<TestPrepsList :set="set" :testPreps="testPreps" class="mt-16" />
			<FlashCardsList :flashCards="flashCards" :set="set" class="mt-16" />
			<NotesList :notes="notes" :set="set" class="mt-16" />
			<VideosList :set="set" :videos="videos" class="mt-16" />
			<RootSetList v-if="set.isRoot && set.userId === id" :set="set" :sets="sets" class="mt-16" />
		</div>
		<PageLoading v-if="loading" />
		<PageLoading v-if="setLoading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { SetEntity } from '@modules/study'
import SetHeader from '@app/components/study/sets/SetHeader.vue'
import SetStats from '@app/components/study/sets/SetStats.vue'
import TestPrepsList from '@app/components/study/testPreps/SetTestPrepList.vue'
import FlashCardsList from '@app/components/study/flashCards/SetFlashCardList.vue'
import NotesList from '@app/components/study/notes/SetNotesList.vue'
import VideosList from '@app/components/study/videos/SetVideosList.vue'
import RootSetList from '@app/components/study/sets/RootSetList.vue'
import { useMySets, useSet } from '@app/composable/study/sets'
import { useAuth } from '@app/composable/auth/auth'

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
		RootSetList
	},
	setup (props) {
		const { id } = useAuth()
		const { listener, loading, error, notes, videos, flashCards, testPreps } = useSet(props.set)
		const { normalSets: sets, loading: setLoading, error: setError } = useMySets()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { id, loading, error, notes, videos, flashCards, testPreps, sets, setLoading, setError }
	}
})
</script>
