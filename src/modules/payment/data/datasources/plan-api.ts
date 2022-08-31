import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { PlanFromModel } from '../models/plan'
import { PlanBaseDataSource } from './plan-base'

export class PlanApiDataSource implements PlanBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/payment/plans')
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, PlanFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<PlanFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<PlanFromModel>) {
		const listener = listenOnSocket(`payment/plans/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<PlanFromModel>) {
		const listener = listenOnSocket('payment/plans', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
