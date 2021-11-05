import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ReferralFromModel } from '../models/referral'
import { ReferralBaseDataSource } from './referral-base'

export class ReferralApiDataSource implements ReferralBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/users/referrals')
	}

	async find (_: string, id: string) {
		return await this.stranerdClient.get<{}, ReferralFromModel | null>(`/${id}`, {})
	}

	async get (_: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ReferralFromModel>>('/', query)
	}

	async listenToOne (_: string, id: string, listeners: Listeners<ReferralFromModel>) {
		const listener = listenOnSocket(`referrals/${id}`, listeners)
		const model = await this.find(_, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (_: string, query: QueryParams, listeners: Listeners<ReferralFromModel>) {
		const listener = listenOnSocket('referrals', listeners)
		const models = await this.get(_, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
