import { apiBases } from '@utils/environment'
import { Media } from '../data/models/base'
import { HttpClient } from './http'

export const UploaderService = {
	call: async (path: string, file: File): Promise<Media> => {
		return await uploadFile(path, file) as Media
	}
}

export const uploadFile = async (path: string, file: File) => {
	try {
		const data = new FormData()
		data.set('path', path)
		data.set('file', file)
		const storageClient = new HttpClient(apiBases.STORAGE)
		const media = await storageClient.post<typeof data, Media>('/file', data)
		if (!media.link) media.link = apiBases.STORAGE + '/' + media.path
		return media
	} catch {
		throw new Error(`Error uploading ${file.name}`)
	}
}
