import { Listeners, QueryParams } from '@modules/core'
import { INotificationRepository } from '../../domain/irepositories/inotification'
import { NotificationBaseDataSource } from '../datasources/notificationBase'
import { NotificationTransformer } from '../transformers/notification'
import { NotificationEntity } from '../../domain/entities/notification'

export class NotificationRepository implements INotificationRepository {
	private dataSource: NotificationBaseDataSource
	private transformer: NotificationTransformer

	constructor (dataSource: NotificationBaseDataSource, transformer: NotificationTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		if (model) return this.transformer.fromJSON(model)
		else return null
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (id: string, listener: Listeners<NotificationEntity>) {
		return this.dataSource.listenToOne(id, {
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

	async listenToMany (query: QueryParams, listener: Listeners<NotificationEntity>, matches: (entity: NotificationEntity) => boolean) {
		return this.dataSource.listenToMany(query, {
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

	async markSeen (id: string, seen: boolean) {
		return await this.dataSource.markSeen(id, seen)
	}
}
