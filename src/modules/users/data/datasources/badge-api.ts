import { HttpClient, Listeners, listenOnSocket } from '@modules/core'
import { apiBases } from '@utils/environment'
import { BadgeFromModel } from '../models/badge'
import { BadgeBaseDataSource } from './badge-base'

export class BadgeApiDataSource implements BadgeBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/users/badges')
	}

	async get () {
		return await this.stranerdClient.get<{}, BadgeFromModel | null>('/', {})
	}

	async listenToOne (id: string, listeners: Listeners<BadgeFromModel>) {
		const listener = listenOnSocket(`users/badges/${id}`, listeners)
		const model = await this.get()
		if (model) await listeners.updated(model)
		return listener
	}
}
