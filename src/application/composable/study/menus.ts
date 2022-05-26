import { DocumentEntity, FlashCardEntity, SetSaved, TestPrepEntity } from '@modules/study'
import { computed, ref } from 'vue'
import { useStudyModal } from '@app/composable/core/modals'

type Entity = DocumentEntity | FlashCardEntity | TestPrepEntity

const saveEntity = ref(null as Entity | null)

export const openSaveModal = (entity: Entity | null) => {
	saveEntity.value = entity
	useStudyModal().openSaveEntity()
}

export const useSaveModalData = () => {
	if (!saveEntity.value) useStudyModal().closeSaveEntity()
	const type = computed(() => {
		if (saveEntity.value instanceof DocumentEntity) return SetSaved.documents
		else if (saveEntity.value instanceof FlashCardEntity) return SetSaved.flashCards
		else return SetSaved.testPreps
	})

	return { entity: saveEntity!, type }
}
