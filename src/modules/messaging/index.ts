import { ChatApiDataSource } from './data/datasources/chat-api'
import { ChatMetaApiDataSource } from './data/datasources/chatMeta-api'
import { SessionApiDataSource } from './data/datasources/session-api'
import { ChatTransformer } from './data/transformers/chat'
import { ChatMetaTransformer } from './data/transformers/chatMeta'
import { SessionTransformer } from './data/transformers/session'
import { ChatRepository } from './data/repositories/chat'
import { ChatMetaRepository } from './data/repositories/chatMeta'
import { SessionRepository } from './data/repositories/session'
import { ChatsUseCase } from './domain/usecases/chats'
import { ChatMetasUseCase } from './domain/usecases/chatMetas'
import { SessionsUseCase } from './domain/usecases/sessions'
import { ChatEntity } from './domain/entities/chat'
import { ChatMetaEntity } from './domain/entities/chatMeta'
import { ChatFactory } from './domain/factories/chat'
import { SessionEntity } from './domain/entities/session'
import { SessionFactory } from './domain/factories/session'
import { ChatData, ChatType } from './domain/types'

const chatDataSource = new ChatApiDataSource()
const chatMetaDataSource = new ChatMetaApiDataSource()
const sessionDataSource = new SessionApiDataSource()

const chatTransformer = new ChatTransformer()
const chatMetaTransformer = new ChatMetaTransformer()
const sessionTransformer = new SessionTransformer()

const chatRepository = new ChatRepository(chatDataSource, chatTransformer)
const chatMetaRepository = new ChatMetaRepository(chatMetaDataSource, chatMetaTransformer)
const sessionRepository = new SessionRepository(sessionDataSource, sessionTransformer)

export const ChatsUseCases = new ChatsUseCase(chatRepository)
export const ChatMetasUseCases = new ChatMetasUseCase(chatMetaRepository)
export const SessionsUseCases = new SessionsUseCase(sessionRepository)

export { ChatEntity, ChatFactory, ChatMetaEntity, ChatType, ChatData }
export { SessionEntity, SessionFactory }
