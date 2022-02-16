import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { onMounted, ref } from 'vue'
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem'
import { HttpClient } from '@modules/core'

export const useDownload = (fileName: string, fileLink: string, type: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const content = ref('')
	const options = {
		path: `${type}/${fileName}`,
		directory: Directory.Library
	}

	const download = async () => {
		if (content.value || loading.value) return
		await setLoading(true)
		try {
			const data = await new HttpClient('').download(fileLink)
			if (!data) return loading.value = false
			await Filesystem.writeFile({
				...options, recursive: true, data, encoding: Encoding.UTF8
			})
			const contents = await Filesystem.readFile({ ...options, encoding: Encoding.UTF8 })
			content.value = contents.data
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	const deleteFromDownloads = async () => {
		loading.value = true
		await Filesystem.deleteFile(options).catch(() => null)
		content.value = ''
		loading.value = false
	}

	onMounted(async () => {
		loading.value = true
		const contents = await Filesystem.readFile({ ...options, encoding: Encoding.UTF8 }).catch(() => null)
		if (contents?.data) content.value = contents.data
		loading.value = false
	})

	return { error, loading, content, download, deleteFromDownloads }
}