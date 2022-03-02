import { FlashCardEntity, NoteEntity, SetEntity, TestPrepEntity, VideoEntity } from '@modules/study'
import { computed, ref } from 'vue'
import { useMenuPopover } from '@app/composable/core/modals'
import { share } from '@utils/commons'
import { domain } from '@utils/environment'
import { useDeleteFlashCard } from '@app/composable/study/flashCards'
import { useDeleteTestPrep } from '@app/composable/study/testPreps'
import { useDeleteVideo } from '@app/composable/study/videos'
import { useDeleteNote } from '@app/composable/study/notes'
import { useDeleteSet } from '@app/composable/study/sets'

type SetProp = keyof SetEntity['saved'] | 'sets'
type Entity = NoteEntity | VideoEntity | FlashCardEntity | TestPrepEntity | SetEntity

const global = {
	type: ref(null as SetProp | null),
	entity: ref(null as Entity | null),
	data: ref(null as { set?: SetEntity } | null)
}

export const openStudyEntityMenu = (entity: typeof global['entity']['value'], data: typeof global['data']['value'], event: Event) => {
	global.entity.value = entity
	if (entity instanceof NoteEntity) global.type.value = 'notes'
	else if (entity instanceof FlashCardEntity) global.type.value = 'flashCards'
	else if (entity instanceof VideoEntity) global.type.value = 'videos'
	else if (entity instanceof TestPrepEntity) global.type.value = 'testPreps'
	else if (entity instanceof SetEntity) global.type.value = 'sets'
	global.data.value = data
	useMenuPopover().openStudyEntityMenu(event)
}

export const useStudyMenuData = () => {
	const title = computed({
		get: () => {
			if (global.entity.value instanceof NoteEntity) return global.entity.value.title
			else if (global.entity.value instanceof FlashCardEntity) return global.entity.value.title
			else if (global.entity.value instanceof VideoEntity) return global.entity.value.title
			else if (global.entity.value instanceof TestPrepEntity) return global.entity.value.name
			else if (global.entity.value instanceof SetEntity) return global.entity.value.name
			else return ''
		},
		set: () => {
		}
	})

	if (!global.entity.value || !global.type.value || !global.data.value) useMenuPopover().closeStudyEntityMenu()

	const shareEntity = async () => {
		useMenuPopover().closeStudyEntityMenu()
		const url = domain + global.entity.value!.shareLink
		await share({ url, title: title.value, text: '' })
	}

	return { ...global, share: shareEntity }
}

export const useDeleteStudyEntity = () => {
	const types = {
		notes: useDeleteNote,
		videos: useDeleteVideo,
		flashCards: useDeleteFlashCard,
		testPreps: useDeleteTestPrep,
		sets: useDeleteSet
	}
	const returnValue = types[global.type.value ?? 'notes'](global.entity.value?.id ?? '')
	const { loading, error } = returnValue
	const deleteEntity = async () => {
		const key = {
			notes: 'Note',
			videos: 'Video',
			flashCards: 'FlashCard',
			testPreps: 'TestPrep',
			sets: 'Set'
		}[global.type.value ?? 'notes']
		// @ts-ignore
		await returnValue?.[`delete${key}`]?.()
		useMenuPopover().closeStudyEntityMenu()
	}

	return { deleteEntity, loading, error }
}
