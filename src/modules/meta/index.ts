import { MessageApiDataSource } from './data/datasources/message-api'
import { MessageRepository } from './data/repositories/message'
import { AddMessageUseCase } from './domain/usecases/messages/addMessage'
import { MessageFactory } from './domain/factories/message'

const messageDataSource = new MessageApiDataSource()

const messageRepository = new MessageRepository(messageDataSource)

export const AddMessage = new AddMessageUseCase(messageRepository)

export { MessageFactory }
