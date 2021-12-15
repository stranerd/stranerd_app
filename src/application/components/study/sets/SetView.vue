<template>
	<div>
		<div class="md:px-4 md:pt-8">
			<SetHeader :set="set" />
		</div>
		<div class="px-4 pb-8">
			<SetStats :set="set" class="mt-16" />
			<TestPrepsList :testPreps="testPreps" class="mt-16" />
			<FlashCardsList :flashCards="flashCards" class="mt-16" />
			<NotesList :notes="notes" class="mt-16" />
			<VideosList :videos="videos" class="mt-16" />
		</div>
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
		VideosList
	},
	setup (props) {
		const { listener, loading, error, notes, videos, flashCards, testPreps } = useSet(props.set)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { loading, error, notes, videos, flashCards, testPreps }
	}
})
</script>
