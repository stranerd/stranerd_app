<template>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col md:flex-row justify-between gap-2 px-4 md:py-4 bg-white rounded-xl">
			<div class="flex items-center gap-2">
				<IonIcon :icon="folderOpenOutline" class="text-6xl" />
				<div class="flex flex-col">
					<ion-text class="text-heading font-semibold capitalize">{{ set.name }}</ion-text>
					<ion-text class="text-sub">{{ set.allSaved.length }}
						{{ pluralize(set.allSaved.length, 'item', 'items') }}
					</ion-text>
				</div>
			</div>
			<div class="flex gap-2 w-full md:w-auto">
				<ion-input v-model="search" class="flex-grow md:w-auto bg-new_gray text-gray"
					placeholder="Search for items" />
				<ion-select v-model="filter"
					class="bg-new_gray !text-gray flex-grow md:w-auto font-bold select-primary"
					interface="action-sheet"
					placeholder="Filter">
					<ion-select-option v-for="filter in filters" :key="filter" :value="filter" class="capitalize">
						{{ filter }}
					</ion-select-option>
				</ion-select>
			</div>
		</div>
		<EmptyState v-if="!set.allSaved.length" info="This folder is empty" />
		<div v-if="set.allSaved.length" class="showcase">
			<template v-if="false && ['All', 'Sets'].includes(filter)">
				<SetListCard v-for="item in filteredSets" :key="item.hash" :set="item" />
			</template>
			<template v-if="['All', 'Test Preps'].includes(filter)">
				<TestPrepListCard v-for="testPrep in filteredTestPreps" :key="testPrep.hash" :testPrep="testPrep" />
			</template>
			<template v-if="['All', 'Flashcards'].includes(filter)">
				<FlashCardListCard v-for="flashCard in filteredFlashCards" :key="flashCard.hash"
					:flashCard="flashCard" />
			</template>
			<template v-if="['All', 'Notes'].includes(filter)">
				<NoteListCard v-for="note in filteredNotes" :key="note.hash" :note="note" />
			</template>
			<template v-if="['All', 'Videos'].includes(filter)">
				<VideoListCard v-for="video in filteredVideos" :key="video.hash" :video="video" />
			</template>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { SetEntity } from '@modules/study'
import { useSet } from '@app/composable/study/sets'
import { pluralize } from '@utils/commons'
import { folderOpenOutline } from 'ionicons/icons'
import TestPrepListCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import VideoListCard from '@app/components/study/videos/VideoListCard.vue'
import SetListCard from '@app/components/study/sets/SetListCard.vue'
import { IonSelect, IonSelectOption } from '@ionic/vue'

export default defineComponent({
	name: 'SetWrapper',
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	components: {
		IonSelect,
		IonSelectOption,
		TestPrepListCard,
		FlashCardListCard,
		NoteListCard,
		VideoListCard,
		SetListCard
	},
	setup (props) {
		const { loading, error, notes, flashCards, testPreps, videos, sets } = useSet(props.set)
		const filters = ['All', 'Test Preps', 'Flashcards', 'Notes', 'Videos']
		const filter = ref(filters[0])
		const search = ref('')
		const filteredSets = computed(() => sets.value.filter((set) => set.search(search.value)))
		const filteredTestPreps = computed(() => testPreps.value.filter((prep) => prep.search(search.value)))
		const filteredFlashCards = computed(() => flashCards.value.filter((flashCard) => flashCard.search(search.value)))
		const filteredNotes = computed(() => notes.value.filter((note) => note.search(search.value)))
		const filteredVideos = computed(() => videos.value.filter((video) => video.search(search.value)))
		return {
			loading, error, folderOpenOutline, notes, flashCards, testPreps, videos, pluralize, sets,
			filter, filters, search, filteredSets, filteredTestPreps, filteredFlashCards, filteredNotes, filteredVideos
		}
	}
})
</script>
