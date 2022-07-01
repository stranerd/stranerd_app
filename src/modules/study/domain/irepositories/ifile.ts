import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { FileEntity } from '../entities/file'
import { FileToModel } from '../../data/models/file'

export interface IFileRepository {
	add: (data: FileToModel) => Promise<FileEntity>
	get: (query: QueryParams) => Promise<QueryResults<FileEntity>>
	listenToOne: (id: string, listener: Listeners<FileEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<FileEntity>, matches: (entity: FileEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<FileEntity | null>
	update: (id: string, data: FileToModel) => Promise<FileEntity>
	delete: (id: string) => Promise<void>
}
