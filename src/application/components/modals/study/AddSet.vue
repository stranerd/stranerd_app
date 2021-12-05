<template>
	<Modal>
		<template v-slot:title>
			Add items from my study
		</template>

		<ion-select v-model="selectedSet" interface="action-sheet" class="border border-main_dark rounded-xl px-4 lg:mx-4 mt-4" placeholder="FlashCards">
			<ion-select-option v-for="flashcard in flashCards"  :key="flashcard.id" :value="flashcard.id" class="border border-main_dark">{{ flashcard.title }}</ion-select-option>   
		</ion-select>

		<ion-select v-model="selectedSet" interface="action-sheet" class="border border-main_dark rounded-xl px-4 lg:mx-4 mt-4" placeholder="TestPreps">
			<ion-select-option v-for="testPrep in testPreps"  :key="testPrep.id" :value="testPrep.id" class="border border-main_dark">{{ testPrep.name }}</ion-select-option>   
		</ion-select>

		<ion-select v-model="selectedSet" interface="action-sheet" class="border border-main_dark rounded-xl px-4 lg:mx-4 mt-4" placeholder="Notes">
			<ion-select-option v-for="note in notes"  :key="note.id" :value="note.id" class="border border-main_dark">{{ note.title }}</ion-select-option>   
		</ion-select>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Modal from '../../core/Modal.vue'
import { useSetList } from '@root/application/composable/study/sets'
import { useFlashCardList } from '@root/application/composable/study/flashCards'
import { useTestPrepList } from '@root/application/composable/study/testPreps'
import { useNoteList } from '@root/application/composable/study/notes'

export default defineComponent({
	components: { Modal },
	name: 'Add set Modal',
	setup () {
		const {sets} = useSetList()
		const {flashCards} = useFlashCardList()
		const {testPreps} = useTestPrepList()
		const {notes} = useNoteList()



		return {
			sets,
			flashCards,
			testPreps,
			notes,
			selectedSet: null,
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