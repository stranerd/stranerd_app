import { Media, UploadedFile } from '../data/models/base'
import { HttpClient } from './http'

export const uploadFile = async (path: string, file: UploadedFile): Promise<Media> => {
	try {
		const data = new FormData()
		data.append('path', path)
		data.append('file', file.ref)
		return await new HttpClient().post<any, Media>('/storage/file', data)
	} catch (err: any) {
		throw new Error('Error uploading file')
	}
}

export const uploadFiles = async (path: string, files: UploadedFile[]): Promise<Media[]> => {
	try {
		const data = new FormData()
		data.append('path', path)
		files.forEach((file) => data.append('file', file.ref))
		return await new HttpClient().post<any, Media[]>('/storage/files', data)
	} catch {
		throw new Error('Error uploading files')
	}
}

export const UploaderService = {
	single: uploadFile,
	multiple: uploadFiles
}
