import { Media, UploadedFile } from '../data/models/base'
import { HttpClient } from './http'

export const uploadFile = async (path: string, file: UploadedFile): Promise<Media> => {
	try {
		return await new HttpClient().post<any, Media>('/storage/file', { path, file })
	} catch (err: any) {
		throw new Error('Error uploading file')
	}
}

export const uploadFiles = async (path: string, file: UploadedFile[]): Promise<Media[]> => {
	try {
		return await new HttpClient().post<any, Media[]>('/storage/files', { path, file })
	} catch {
		throw new Error('Error uploading files')
	}
}

export const UploaderService = {
	single: uploadFile,
	multiple: uploadFiles
}
