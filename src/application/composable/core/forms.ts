import { ref } from 'vue'
import { UploadedFile } from '@modules/core'

export const usePassword = () => {
	const show = ref(false)
	const toggle = () => show.value = !show.value

	return { show, toggle }
}

export const useFileInputCallback = (cb: (medias: UploadedFile[]) => Promise<void>) => {
	return cb
}
