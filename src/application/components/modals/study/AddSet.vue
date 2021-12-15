<template>
	<Modal>
		<template v-slot:title>
			Add items from my study
		</template>


		<ion-select v-model="selectedSet" class="border border-main_dark rounded-xl px-4 lg:mx-4 mt-4"
			interface="action-sheet" placeholder="Select Set">
			<ion-select-option v-for="set in sets" :key="set.id" :value="set.id" class="border border-main_dark">
				{{ set.name }}
			</ion-select-option>
		</ion-select>

		<ion-select v-model="selectedSet" class="border border-main_dark rounded-xl px-4 lg:mx-4 mt-4"
			interface="action-sheet" placeholder="FlashCards">
			<ion-select-option v-for="flashcard in flashCards" :key="flashcard.id" :value="flashcard.id"
				class="border border-main_dark">{{ flashcard.title }}
			</ion-select-option>
		</ion-select>

		<ion-select v-model="selectedSet" class="border border-main_dark rounded-xl px-4 lg:mx-4 mt-4"
			interface="action-sheet" placeholder="TestPreps">
			<ion-select-option v-for="testPrep in testPreps" :key="testPrep.id" :value="testPrep.id"
				class="border border-main_dark">{{ testPrep.name }}
			</ion-select-option>
		</ion-select>

		<ion-select v-model="selectedSet" class="border border-main_dark rounded-xl px-4 lg:mx-4 mt-4"
			interface="action-sheet" placeholder="Notes">
			<ion-select-option v-for="note in notes" :key="note.id" :value="note.id" class="border border-main_dark">
				{{ note.title }}
			</ion-select-option>
		</ion-select>

		<div class="flex flex-row  mt-5  text-white gap-4">
			<div class="w-1/2 flex flex-row justify-center items-center">
				<ion-button class=" btn-secondary w-full"
					@click="closeAddSet">
					Cancel
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</ion-button>
			</div>
			<div class="w-1/2 flex flex-row justify-center items-center">
				<ion-button class=" btn-primary w-full">
					Add to set
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</ion-button>
			</div>
		</div>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Modal from '../../core/Modal.vue'
import { useMySets, useSaveToSet } from '@app/composable/study/sets'
import { useFlashCardList } from '@app/composable/study/flashCards'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { useNoteList } from '@app/composable/study/notes'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	components: { Modal },
	name: 'Add set Modal',
	setup () {
		const closeAddSet = () => {
			useStudyModal().closeAddSet()
		}

		const { loading, error, saveNotes, saveVideos } = useSaveToSet()
		const { sets } = useMySets()
		const { flashCards } = useFlashCardList()
		const { testPreps } = useTestPrepList()
		const { notes } = useNoteList()

		return {
			sets,
			closeAddSet,
			flashCards,
			testPreps,
			notes,
			selectedSet: null
		}

	}
})
</script>


<style scoped>
	ion-textarea {
		--placeholder-color: #8B9EB1;
	}

	ion-select {

		/* Set a different placeholder color */
		--placeholder-color: #132740;
		font-weight: bold;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

	ion-input {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}


</style>
