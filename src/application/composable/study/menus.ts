import { FlashCardEntity, NoteEntity, SetEntity, SetSaved, TestPrepEntity, VideoEntity } from '@modules/study'
import { computed, ref } from 'vue'
import { useStudyModal } from '@app/composable/core/modals'

type Entity = NoteEntity | VideoEntity | FlashCardEntity | TestPrepEntity | SetEntity

const saveEntity = ref(null as Entity | null)

export const openSaveModal = (entity: Entity | null) => {
	saveEntity.value = entity
	useStudyModal().openSaveEntity()
}

export const useSaveModalData = () => {
	if (!saveEntity.value) useStudyModal().closeSaveEntity()
	const type = computed(() => {
		if (saveEntity.value instanceof NoteEntity) return SetSaved.notes
		else if (saveEntity.value instanceof FlashCardEntity) return SetSaved.flashCards
		else if (saveEntity.value instanceof VideoEntity) return SetSaved.videos
		else if (saveEntity.value instanceof TestPrepEntity) return SetSaved.testPreps
		else return SetSaved.sets
	})

	return { entity: saveEntity!, type }
}
