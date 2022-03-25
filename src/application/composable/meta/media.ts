import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { onMounted, ref } from 'vue'
import { Directory, Filesystem } from '@capacitor/filesystem'
import writeFile from 'capacitor-blob-writer'
import { FileOpener } from '@awesome-cordova-plugins/file-opener'
import { HttpClient } from '@modules/core'
import { isWeb } from '@utils/constants'

const getBase64 = (binary: string) => `data:;base64,${binary}`

export const useDownload = (fileName: string, fileLink: string, type: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const content = ref('')
	const options = {
		path: `downloaded/${type}/${fileName}`,
		directory: Directory.Library
	}

	const download = async () => {
		if (content.value || loading.value) return
		await setLoading(true)
		try {
			const { blob } = await new HttpClient('').download(fileLink)
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
			const { base64 } = await new HttpClient('').download(fileLink)
			const a = document.createElement('a')
			a.download = fileName
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
		const stat = await Filesystem.getUri(options)
		await FileOpener.open(stat.uri, '')
	}

	const deleteFromDownloads = async () => {
		loading.value = true
		await Filesystem.deleteFile(options).catch(() => null)
		content.value = ''
		loading.value = false
	}

	onMounted(async () => {
		loading.value = true
		const contents = await Filesystem.readFile(options).catch(() => null)
		if (contents?.data) content.value = getBase64(contents.data)
		loading.value = false
	})

	return {
		error, loading, message, content,
		download, deleteFromDownloads, openFile, downloadWeb
	}
}
