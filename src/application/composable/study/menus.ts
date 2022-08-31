import { FlashCardEntity, NoteEntity, SetSaved, TestPrepEntity } from '@modules/study'
import { computed, ref } from 'vue'
import { useStudyModal } from '@app/composable/core/modals'
import { QuestionEntity } from '@modules/questions'

type Entity = NoteEntity | FlashCardEntity | TestPrepEntity | QuestionEntity

const saveEntity = ref(null as Entity | null)

export const openSaveModal = (entity: Entity) => {
	saveEntity.value = entity
	useStudyModal().openSaveEntity()
}

export const useSaveModalData = () => {
	if (!saveEntity.value) useStudyModal().closeSaveEntity()
	const type = computed(() => {
		if (saveEntity.value instanceof QuestionEntity) return SetSaved.questions
		else if (saveEntity.value instanceof NoteEntity) return SetSaved.notes
		else if (saveEntity.value instanceof FlashCardEntity) return SetSaved.flashCards
		else return SetSaved.testPreps
	})

	return { entity: saveEntity, type }
}
