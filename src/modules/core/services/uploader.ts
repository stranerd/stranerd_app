import { apiBases } from '@utils/environment'
import { Media } from '../data/models/base'
import { HttpClient } from './http'

export const UploaderService = {
	single: async (path: string, file: File): Promise<Media> => await uploadFile(path, file),
	multiple: async (path: string, files: File[]): Promise<Media[]> => await uploadFiles(path, files)
}

export const uploadFile = async (path: string, file: File): Promise<Media> => {
	try {
		const data = new FormData()
		data.set('path', path)
		data.set('file', file)
		const utilsClient = new HttpClient(apiBases.UTILS)
		const media = await utilsClient.post<typeof data, Media>('/storage/file', data)
		if (!media.link) media.link = apiBases.UTILS + media.path
		return media
	} catch {
		throw new Error('Error uploading file')
	}
}

export const uploadFiles = async (path: string, files: File[]): Promise<Media[]> => {
	try {
		const data = new FormData()
		data.set('path', path)
		files.forEach((file) => data.append('file', file))
		const utilsClient = new HttpClient(apiBases.UTILS)
		const medias = await utilsClient.post<typeof data, Media[]>('/storage/files', data)
		return medias.map((media) => {
			if (!media.link) media.link = apiBases.UTILS + media.path
			return media
		})
	} catch {
		throw new Error('Error uploading files')
	}
}
