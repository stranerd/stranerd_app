import { ref, watch } from 'vue'
import { UploadedFile } from '@modules/core'

export const usePassword = () => {
	const show = ref(false)
	const toggle = () => show.value = !show.value

	return { show, toggle }
}

export const useFileInputCallback = (cb: (medias: UploadedFile[]) => Promise<void>) => {
	return cb
}

type callback = (tag: string) => void
export const useTags = (addCb: callback, removeCb: callback) => {
	const tag = ref('')
	watch(() => tag.value, () => {
		if (tag.value.includes(' ') || tag.value.includes(',')) {
			tag.value
				.toLowerCase()
				.replaceAll(',', ' ')
				.trim()
				.split(' ')
				.filter((tag) => !!tag)
				.forEach(addCb)
			tag.value = ''
		}
	})
	const removeTag = (tag: string) => removeCb(tag.toLowerCase())
	return { tag, removeTag }
}
export const useSubjectAsTags = (addCb: callback, removeCb: callback) => {
	const sTag = ref('')
	watch(() => sTag.value, () => {
		if (sTag.value) {
			addCb(sTag.value)
			sTag.value = ''
		}
	})
	const removeTag = (tag: string) => removeCb(tag)
	return { sTag, removeTag }
}
