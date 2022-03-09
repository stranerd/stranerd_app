import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReviewFromModel, ReviewToModel } from '../models/review'

export interface ReviewBaseDataSource {
	create: (data: ReviewToModel) => Promise<ReviewFromModel>
	get: (query: QueryParams) => Promise<QueryResults<ReviewFromModel>>
	find: (id: string) => Promise<ReviewFromModel | null>
	listenToMany: (query: QueryParams, listener: Listeners<ReviewFromModel>) => Promise<() => void>
	listenToOne: (id: string, listener: Listeners<ReviewFromModel>) => Promise<() => void>
}
