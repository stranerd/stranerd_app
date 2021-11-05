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

	async find (_: string, id: string) {
		return await this.stranerdClient.get<{}, ReviewFromModel | null>(`/${id}`, {})
	}

	async get (_: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ReviewFromModel>>('/', query)
	}

	async listenToOne (_: string, id: string, listeners: Listeners<ReviewFromModel>) {
		const listener = listenOnSocket(`reviews/${id}`, listeners)
		const model = await this.find(_, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (_: string, query: QueryParams, listeners: Listeners<ReviewFromModel>) {
		const listener = listenOnSocket('reviews', listeners)
		const models = await this.get(_, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
