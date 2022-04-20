import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { ReferralFromModel } from '../models/referral'
import { ReferralBaseDataSource } from './referral-base'

export class ReferralApiDataSource implements ReferralBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/users/referrals')
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, ReferralFromModel | null>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ReferralFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<ReferralFromModel>) {
		const listener = listenOnSocket(`users/referrals/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<ReferralFromModel>) {
		const listener = listenOnSocket('users/referrals', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
