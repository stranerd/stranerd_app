import { ref, watch, nextTick  } from 'vue'

export const usePassword = () => {
	const show = ref(false)
	const toggle = () => show.value = !show.value

	return { show, toggle }
}

export const useFileInputs = (singleCB: (file: File) => void) => {
	const catchFiles = (e: Event) => {
		const file = (e.target as HTMLInputElement)?.files?.[0] ?? undefined
		if (file) singleCB(file)
	}
	return { catchFiles }
}

export const useMultipleFileInputs = (multipleCB: (files: File[]) => void) => {
	const catchMultipleFiles = (e: Event) => {
		const fileList = (e.target as HTMLInputElement)?.files ?? []
		const files: File[] = []
		for (let i = 0; i < fileList.length; i++) files.push(fileList[i])
		multipleCB(files)
	}
	return { catchMultipleFiles }
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
	const removeTag =  (tag: string) => {

		removeCb(tag.toLowerCase())
		nextTick()
	}
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
