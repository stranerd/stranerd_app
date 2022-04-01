import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ReportFromModel, ReportToModel } from '../models/report'
import { ReportBaseDataSource } from './report-base'

export class ReportApiDataSource implements ReportBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/reports/reports')
	}

	async create (data: ReportToModel) {
		return await this.stranerdClient.post<ReportToModel, ReportFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, ReportFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ReportFromModel>>('/', query)
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async listenToOne (id: string, listeners: Listeners<ReportFromModel>) {
		const listener = listenOnSocket(`reports/reports/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<ReportFromModel>) {
		const listener = listenOnSocket('reports/reports', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
