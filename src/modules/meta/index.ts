import { MessageApiDataSource } from './data/datasources/message-api'
import { MessageRepository } from './data/repositories/message'
import { MessagesUseCase } from './domain/usecases/messages'
import { MessageFactory } from './domain/factories/message'

const messageDataSource = new MessageApiDataSource()

const messageRepository = new MessageRepository(messageDataSource)

export const MessagesUseCases = new MessagesUseCase(messageRepository)

export { MessageFactory }
