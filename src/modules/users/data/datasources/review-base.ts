import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReviewFromModel, ReviewToModel } from '../models/review'

export interface ReviewBaseDataSource {
	create: (data: ReviewToModel) => Promise<string>
	get: (user: string, query: QueryParams) => Promise<QueryResults<ReviewFromModel>>
	find: (user: string, id: string) => Promise<ReviewFromModel | null>
	listenToMany: (user: string, query: QueryParams, listener: Listeners<ReviewFromModel>) => Promise<() => void>
	listenToOne: (user: string, id: string, listener: Listeners<ReviewFromModel>) => Promise<() => void>
}
