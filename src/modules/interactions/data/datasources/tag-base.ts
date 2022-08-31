import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TagFromModel, TagToModel } from '../models/tag'

export interface TagBaseDataSource {
	create: (data: TagToModel) => Promise<TagFromModel>
	get: (query: QueryParams) => Promise<QueryResults<TagFromModel>>
	listenToOne: (id: string, listener: Listeners<TagFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<TagFromModel>) => Promise<() => void>
	find: (id: string) => Promise<TagFromModel | null>
	update: (id: string, data: TagToModel) => Promise<TagFromModel>
	delete: (id: string) => Promise<void>
}
