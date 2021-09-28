import { QueryParams, QueryResults } from '@modules/core'
import { TagEntity } from '../entities/tag'

export interface ITagRepository {
	get: (query: QueryParams) => Promise<QueryResults<TagEntity>>
}
