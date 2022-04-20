import { HttpClient } from '@modules/core'
import { apiBase } from '@utils/environment'
import { MessageToModel } from '../models/message'
import { FormBaseDataSource } from './form-base'

export class MessageApiDataSource implements FormBaseDataSource<MessageToModel> {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/meta/messages')
	}

	async create (data: MessageToModel) {
		await this.stranerdClient.post<MessageToModel, boolean>('/', data)
	}
}
