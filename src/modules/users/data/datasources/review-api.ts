import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ReviewFromModel, ReviewToModel } from '../models/review'
import { ReviewBaseDataSource } from './review-base'

export class ReviewApiDataSource implements ReviewBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/users/reviews')
	}

	async create (data: ReviewToModel) {
		const review = await this.stranerdClient.post<ReviewToModel, ReviewFromModel>('/', data)
		return review.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, ReviewFromModel | null>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ReviewFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<ReviewFromModel>) {
		const listener = listenOnSocket(`users/reviews/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<ReviewFromModel>) {
		const listener = listenOnSocket('users/reviews', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
