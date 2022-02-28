import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReviewToModel } from '../../data/models/review'
import { ReviewEntity } from '../entities/review'

export interface IReviewRepository {
	create: (data: ReviewToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<ReviewEntity>>
	listenToOne: (id: string, listener: Listeners<ReviewEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<ReviewEntity>, matches: (entity: ReviewEntity) => boolean) => Promise<() => void>
}
