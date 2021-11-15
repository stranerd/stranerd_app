import { IMessageRepository } from '../../domain/irepositories/imessage'
import { FormBaseDataSource } from '../datasources/form-base'
import { MessageToModel } from '../models/message'

export class MessageRepository implements IMessageRepository {
	private dataSource: FormBaseDataSource<MessageToModel>

	constructor (dataSource: FormBaseDataSource<MessageToModel>) {
		this.dataSource = dataSource
	}

	async add (data: MessageToModel) {
		return await this.dataSource.create(data)
	}
}
