import { onMounted, ref } from 'vue'
import { Directory, Filesystem } from '@capacitor/filesystem'
import writeFile from 'capacitor-blob-writer'
import { FileOpener } from '@capacitor-community/file-opener'
import { HttpClient, Media } from '@modules/core'
import { isWeb } from '@utils/constants'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Router } from 'vue-router'

export const openMedia = ref(null as { media: Media, path: string } | null)
export const closeMediaFullScreen = () => {
	openMedia.value = null
}
export const openViewFile = async (media: Media, path: string, router: Router) => {
	openMedia.value = { media, path }
	await router.push('/file/view')
}

const getBase64 = (binary: string) => `data:;base64,${binary}`

export const useDownload = (media: Media, path: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const content = ref('')
	const options = {
		path: `downloaded/${path}/${media.name}`,
		directory: Directory.Library
	}

	const download = async () => {
		if (content.value || loading.value) return
		await setLoading(true)
		try {
			const { blob } = await new HttpClient('').download(media.link)
			if (!blob) return loading.value = false
			await writeFile({ ...options, recursive: true, blob })
			const contents = await Filesystem.readFile(options)
			content.value = getBase64(contents.data)
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	const downloadWeb = async () => {
		await setError('')
		await setLoading(true)
		try {
			const { base64 } = await new HttpClient('').download(media.link)
			const a = document.createElement('a')
			a.download = media.name
			a.href = base64
			document.body.appendChild(a)
			a.click()
			a.remove()
			await setMessage('Downloaded successfully!')
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	const openFile = async () => {
		if (isWeb) return
		if (!content.value) await download()
		const stat = await Filesystem.getUri(options)
		await FileOpener.open({ filePath: stat.uri })
	}

	const deleteFromDownloads = async () => {
		loading.value = true
		await Filesystem.deleteFile(options).catch(() => null)
		content.value = ''
		loading.value = false
	}

	onMounted(async () => {
		await setLoading(true)
		const contents = await Filesystem.readFile(options).catch(() => null)
		if (contents?.data) content.value = getBase64(contents.data)
		await setLoading(false)
	})

	return {
		error, loading, message, content,
		download, deleteFromDownloads, openFile, downloadWeb
	}
}
