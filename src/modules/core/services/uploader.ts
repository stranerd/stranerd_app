import { apiBases } from '@utils/environment'
import { Media, UploadedFile } from '../data/models/base'
import { HttpClient } from './http'

export const UploaderService = {
	single: async (path: string, file: UploadedFile): Promise<Media> => await uploadFile(path, file),
	multiple: async (path: string, files: UploadedFile[]): Promise<Media[]> => await uploadFiles(path, files)
}

export const uploadFile = async (path: string, file: UploadedFile): Promise<Media> => {
	try {
		const data = new FormData()
		data.append('path', path)
		data.append('file', file.ref)
		const utilsClient = new HttpClient(apiBases.UTILS)
		const media = await utilsClient.post<any, Media>('/storage/file', data)
		if (!media.link) media.link = apiBases.UTILS + media.path
		return media
	} catch (err: any) {
		throw new Error('Error uploading file')
	}
}

export const uploadFiles = async (path: string, files: UploadedFile[]): Promise<Media[]> => {
	try {
		const data = new FormData()
		data.append('path', path)
		files.forEach((file) => data.append('file', file.ref))
		const utilsClient = new HttpClient(apiBases.UTILS)
		const medias = await utilsClient.post<any, Media[]>('/storage/files', data)
		return medias.map((media) => {
			if (!media.link) media.link = apiBases.UTILS + media.path
			return media
		})
	} catch {
		throw new Error('Error uploading files')
	}
}
