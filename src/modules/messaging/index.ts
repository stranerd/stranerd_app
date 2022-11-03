import { ChatApiDataSource } from './data/datasources/chatApi'
import { ChatMetaApiDataSource } from './data/datasources/chatMetaApi'
import { ChatTransformer } from './data/transformers/chat'
import { ChatMetaTransformer } from './data/transformers/chatMeta'
import { ChatRepository } from './data/repositories/chat'
import { ChatMetaRepository } from './data/repositories/chatMeta'
import { ChatsUseCase } from './domain/usecases/chats'
import { ChatMetasUseCase } from './domain/usecases/chatMetas'
import { ChatEntity } from './domain/entities/chat'
import { ChatMetaEntity } from './domain/entities/chatMeta'
import { ChatFactory } from './domain/factories/chat'
import { ChatData, ChatType } from './domain/types'

const chatDataSource = new ChatApiDataSource()
const chatMetaDataSource = new ChatMetaApiDataSource()

const chatTransformer = new ChatTransformer()
const chatMetaTransformer = new ChatMetaTransformer()

const chatRepository = new ChatRepository(chatDataSource, chatTransformer)
const chatMetaRepository = new ChatMetaRepository(chatMetaDataSource, chatMetaTransformer)

export const ChatsUseCases = new ChatsUseCase(chatRepository)
export const ChatMetasUseCases = new ChatMetasUseCase(chatMetaRepository)

export { ChatEntity, ChatFactory, ChatMetaEntity, ChatType }
export type { ChatData }
