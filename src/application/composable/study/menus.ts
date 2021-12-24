import { FlashCardEntity, NoteEntity, SetEntity, TestPrepEntity, VideoEntity } from '@modules/study'
import { computed, ref } from 'vue'
import { useMenuPopover } from '@app/composable/core/modals'
import { copyToClipboard } from '@utils/commons'
import { Notify } from '@app/composable/core/notifications'
import { domain } from '@utils/environment'
import { useDeleteFlashCard } from '@app/composable/study/flashCards'
import { useDeleteTestPrep } from '@app/composable/study/testPreps'
import { useDeleteVideo } from '@app/composable/study/videos'
import { useDeleteNote } from '@app/composable/study/notes'

type SetProp = keyof SetEntity['saved']
type Entity = NoteEntity | VideoEntity | FlashCardEntity | TestPrepEntity

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
	global.data.value = data
	useMenuPopover().openStudyEntityMenu(event)
}

export const useStudyMenuData = () => {
	const type = global.type.value === 'testPreps' ? 'preps' : global.type.value
	const shareLink = computed({
		get: () => `/study/${type}/${global.entity.value?.id}`,
		set: () => {
		}
	})
	const title = computed({
		get: () => {
			if (global.entity.value instanceof NoteEntity) return global.entity.value.title
			else if (global.entity.value instanceof FlashCardEntity) return global.entity.value.title
			else if (global.entity.value instanceof VideoEntity) return global.entity.value.title
			else if (global.entity.value instanceof TestPrepEntity) return global.entity.value.name
			else return ''
		},
		set: () => {
		}
	})

	if (!global.entity.value || !global.type.value || !global.data.value) useMenuPopover().closeStudyEntityMenu()

	const share = async () => {
		useMenuPopover().closeStudyEntityMenu()
		const url = domain + shareLink.value
		if (window.navigator.share) {
			try {
				await window.navigator.share({
					url,
					title: title.value,
					text: ''
				})
			} catch {
				const res = await copyToClipboard(url)
				await Notify({
					title: `something went wrong somewhere.${res ? ' The link has been copied to your clipboard instead' : ''}`,
					icon: 'info'
				})
			}
		} else {
			const res = await copyToClipboard(url)
			await Notify({
				title: `Your current device is unable to share links.${res ? ' The link has been copied to your clipboard instead' : ''}`,
				icon: 'info'
			})
		}
	}

	return { ...global, shareLink, share }
}

export const useDeleteStudyEntity = () => {
	const types = {
		notes: useDeleteNote,
		videos: useDeleteVideo,
		flashCards: useDeleteFlashCard,
		testPreps: useDeleteTestPrep
	}
	const returnValue = types[global.type.value ?? 'notes'](global.entity.value?.id ?? '')
	const { loading, error } = returnValue
	const deleteEntity = async () => {
		const key = {
			notes: 'Note',
			videos: 'Video',
			flashCards: 'FlashCard',
			testPreps: 'TestPrep'
		}[global.type.value ?? 'notes']
		// @ts-ignore
		await returnValue?.[`delete${key}`]?.()
		useMenuPopover().closeStudyEntityMenu()
	}

	return { deleteEntity, loading, error }
}
