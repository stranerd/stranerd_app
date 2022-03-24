import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { computed, onMounted, ref } from 'vue'
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem'
import { HttpClient, Media } from '@modules/core'

export const useDownloadableLink = (media: Media) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const download = async () => {
		await setError('')
		await setLoading(true)
		try {
			const data = await new HttpClient('').download(media?.link ?? '')
			const a = document.createElement('a')
			a.download = media?.name ?? ''
			a.href = data
			document.body.appendChild(a)
			a.click()
			a.remove()
			await setMessage('Downloaded successfully!')
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}
	return { loading, error, message, download }
}

export const useDownload = (fileName: string, fileLink: string, type: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const content = ref('')
	const base64Content = computed(() => !content.value ? '' : `data:;base64,${btoa(content.value)}`)
	const options = {
		path: `downloads/${type}/${fileName}`,
		encoding: Encoding.UTF8,
		directory: Directory.Library
	}

	const download = async () => {
		if (content.value || loading.value) return
		await setLoading(true)
		try {
			const data = await new HttpClient('').download(fileLink)
			if (!data) return loading.value = false
			await Filesystem.writeFile({
				...options, recursive: true, data
			})
			const contents = await Filesystem.readFile({ ...options })
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
		const contents = await Filesystem.readFile({ ...options }).catch(() => null)
		if (contents?.data) content.value = contents.data
		loading.value = false
	})

	return { error, loading, content, download, deleteFromDownloads, base64Content }
}
