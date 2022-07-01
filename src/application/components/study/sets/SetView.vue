<template>
	<div class="showcase-flex">
		<div class="flex flex-col justify-between gap-4 p-4 lg:p-0">
			<div class="flex items-center gap-2">
				<IonIcon :icon="folderOpenOutline" class="text-3xl" />
				<div class="flex flex-col">
					<IonText class="text-xl font-semibold capitalize">{{ set.name }}</IonText>
					<IonText class="text-sm">{{ set.allSaved.length }}
						{{ pluralize(set.allSaved.length, 'item', 'items') }}
					</IonText>
				</div>
			</div>
			<div class="flex gap-2 w-full">
				<div class="flex-grow">
					<IonInput v-model="search" class="w-full" placeholder="Search for items" />
				</div>
				<div class="flex-grow">
					<IonSelect v-model="filter"
						class="w-full font-bold"
						interface="action-sheet"
						placeholder="Filter">
						<IonSelectOption v-for="filter in filters" :key="filter" :value="filter" class="capitalize">
							{{ filter }}
						</IonSelectOption>
					</IonSelect>
				</div>
			</div>
		</div>
		<EmptyState v-if="!set.allSaved.length" info="This folder is empty" />
		<template v-if="['All', 'Test Preps'].includes(filter)">
			<TestPrepListCard v-for="testPrep in filteredTestPreps" :key="testPrep.hash" :testPrep="testPrep"
				class="border-bottom-line" />
		</template>
		<template v-if="['All', 'Flashcards'].includes(filter)">
			<FlashCardListCard v-for="flashCard in filteredFlashCards" :key="flashCard.hash"
				:flashCard="flashCard" class="border-bottom-line" />
		</template>
		<template v-if="['All', 'Notes'].includes(filter)">
			<NoteListCard v-for="note in filteredNotes" :key="note.hash" :note="note"
				class="border-bottom-line" />
		</template>
		<BlockLoading v-if="loading" />
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

export default defineComponent({
	name: 'SetView',
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	components: {
		TestPrepListCard,
		FlashCardListCard,
		NoteListCard
	},
	setup (props) {
		const { loading, error, notes, flashCards, testPreps } = useSet(props.set)
		const filters = ['All', 'Test Preps', 'Flashcards', 'Notes']
		const filter = ref(filters[0])
		const search = ref('')
		const filteredTestPreps = computed(() => testPreps.value.filter((prep) => prep.search(search.value)))
		const filteredFlashCards = computed(() => flashCards.value.filter((flashCard) => flashCard.search(search.value)))
		const filteredNotes = computed(() => notes.value.filter((note) => note.search(search.value)))
		return {
			loading, error, folderOpenOutline, notes, flashCards, testPreps, pluralize,
			filter, filters, search, filteredTestPreps, filteredFlashCards, filteredNotes
		}
	}
})
</script>
