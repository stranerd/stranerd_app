import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TagFromModel } from '../models/tag'

export interface TagBaseDataSource {
	find: (id: string) => Promise<TagFromModel | null>
	get: (query: QueryParams) => Promise<QueryResults<TagFromModel>>
	listenToOne: (id: string, listener: Listeners<TagFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<TagFromModel>) => Promise<() => void>
}
