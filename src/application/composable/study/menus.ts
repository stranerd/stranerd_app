import { FlashCardEntity, NoteEntity, SetEntity, TestPrepEntity, VideoEntity } from '@modules/study'
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
		if (saveEntity.value instanceof NoteEntity) return 'note'
		else if (saveEntity.value instanceof FlashCardEntity) return 'flashCard'
		else if (saveEntity.value instanceof VideoEntity) return 'video'
		else if (saveEntity.value instanceof TestPrepEntity) return 'testPrep'
		else if (saveEntity.value instanceof SetEntity) return 'set'
		return ''
	})

	return { entity: saveEntity!, type }
}
