import { ChatApiDataSource } from './data/datasources/chat-api'
import { ChatMetaApiDataSource } from './data/datasources/chatMeta-api'
import { SessionApiDataSource } from './data/datasources/session-api'
import { ChatTransformer } from './data/transformers/chat'
import { ChatMetaTransformer } from './data/transformers/chatMeta'
import { SessionTransformer } from './data/transformers/session'
import { ChatRepository } from './data/repositories/chat'
import { ChatMetaRepository } from './data/repositories/chatMeta'
import { SessionRepository } from './data/repositories/session'
import { GetChatsUseCase } from './domain/usecases/chats/getChats'
import { GetChatsMetaUseCase } from './domain/usecases/chatMetas/getChatsMeta'
import { AddChatUseCase } from './domain/usecases/chats/addChat'
import { MarkChatReadUseCase } from './domain/usecases/chats/markChatRead'
import { ListenToChatsUseCase } from './domain/usecases/chats/listenToChats'
import { ListenToChatsMetaUseCase } from './domain/usecases/chatMetas/listenToChatsMeta'
import { ListenToSessionUseCase } from './domain/usecases/sessions/listenToSession'
import { ListenToSessionsUseCase } from './domain/usecases/sessions/listenToSessions'
import { FindSessionUseCase } from './domain/usecases/sessions/findSession'
import { GetSessionsUseCase } from './domain/usecases/sessions/getSessions'
import { AddSessionUseCase } from './domain/usecases/sessions/addSession'
import { BeginSessionUseCase } from './domain/usecases/sessions/beginSession'
import { CancelSessionUseCase } from './domain/usecases/sessions/cancelSession'
import { EndSessionUseCase } from './domain/usecases/sessions/endSession'
import { ChatEntity } from './domain/entities/chat'
import { ChatMetaEntity } from './domain/entities/chatMeta'
import { ChatFactory } from './domain/factories/chat'
import { SessionEntity } from './domain/entities/session'
import { SessionFactory } from './domain/factories/session'

const chatDataSource = new ChatApiDataSource()
const chatMetaDataSource = new ChatMetaApiDataSource()
const sessionDataSource = new SessionApiDataSource()

const chatTransformer = new ChatTransformer()
const chatMetaTransformer = new ChatMetaTransformer()
const sessionTransformer = new SessionTransformer()

const chatRepository = new ChatRepository(chatDataSource, chatTransformer)
const chatMetaRepository = new ChatMetaRepository(chatMetaDataSource, chatMetaTransformer)
const sessionRepository = new SessionRepository(sessionDataSource, sessionTransformer)

export const GetChats = new GetChatsUseCase(chatRepository)
export const ListenToChats = new ListenToChatsUseCase(chatRepository)
export const AddChat = new AddChatUseCase(chatRepository)
export const MarkChatRead = new MarkChatReadUseCase(chatRepository)

export const GetPersonalChatsMeta = new GetChatsMetaUseCase(chatMetaRepository)
export const ListenToPersonalChatsMeta = new ListenToChatsMetaUseCase(chatMetaRepository)

export const FindSession = new FindSessionUseCase(sessionRepository)
export const GetSessions = new GetSessionsUseCase(sessionRepository)
export const ListenToSession = new ListenToSessionUseCase(sessionRepository)
export const ListenToSessions = new ListenToSessionsUseCase(sessionRepository)
export const AddSession = new AddSessionUseCase(sessionRepository)
export const BeginSession = new BeginSessionUseCase(sessionRepository)
export const CancelSession = new CancelSessionUseCase(sessionRepository)
export const EndSession = new EndSessionUseCase(sessionRepository)

export { ChatEntity, ChatFactory, ChatMetaEntity }
export { SessionEntity, SessionFactory }
