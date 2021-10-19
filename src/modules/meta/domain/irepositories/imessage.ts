import { MessageToModel } from '../../data/models/message'

export interface IMessageRepository {
	add: (data: MessageToModel) => Promise<void>
}
