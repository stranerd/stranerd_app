<template>
	<Modal>
		<template v-slot:title>
			Add items from my study
		</template>

		<ion-select v-model="selectedSet" >
			<ion-select-option v-for="set in sets"  :key="set.id" :value="set.id">{{ set.name }}</ion-select-option>   
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
