import { Listeners, QueryParams } from '@modules/core'
import { ChatBaseDataSource } from '../datasources/chat-base'
import { ChatTransformer } from '../transformers/chat'
import { IChatRepository } from '../../domain/irepositories/ichat'
import { ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'

export class ChatRepository implements IChatRepository {
	private dataSource: ChatBaseDataSource
	private transformer: ChatTransformer

	constructor (dataSource: ChatBaseDataSource, transformer: ChatTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (path: [string, string], data: ChatToModel) {
		return await this.dataSource.create(path, data)
	}

	async get (path: [string, string], query: QueryParams) {
		const models = await this.dataSource.get(path, query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async find (path: [string, string], id: string) {
		const model = await this.dataSource.find(path, id)
		return model ? this.transformer.fromJSON(model) : model
	}

	async listenToOne (path: [string, string], id: string, listener: Listeners<ChatEntity>) {
		return this.dataSource.listenToOne(path, id, {
			created: async (model) => {
				await listener.created(this.transformer.fromJSON(model))
			},
			updated: async (model) => {
				await listener.updated(this.transformer.fromJSON(model))
			},
			deleted: async (model) => {
				await listener.deleted(this.transformer.fromJSON(model))
			}
		})
	}

	async listenToMany (path: [string, string], query: QueryParams, listener: Listeners<ChatEntity>, matches: (entity: ChatEntity) => boolean) {
		return this.dataSource.listenToMany(path, query, {
			created: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.created(entity)
			},
			updated: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.updated(entity)
			},
			deleted: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.deleted(entity)
			}
		})
	}

	async markRead (path: [string, string], chatId: string, to: string) {
		await this.dataSource.markRead(path, chatId, to)
	}
}
