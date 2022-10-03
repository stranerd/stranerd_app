import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { FileFromModel, FileToModel } from '../models/file'

export interface FileBaseDataSource {
	create: (data: FileToModel) => Promise<FileFromModel>
	update: (id: string, data: FileToModel) => Promise<FileFromModel>
	get: (query: QueryParams) => Promise<QueryResults<FileFromModel>>
	listenToOne: (id: string, listener: Listeners<FileFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<FileFromModel>) => Promise<() => void>
	find: (id: string) => Promise<FileFromModel | null>
	delete: (id: string) => Promise<void>
}
