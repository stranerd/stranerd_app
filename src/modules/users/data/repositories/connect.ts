import { Listeners, QueryParams } from '@modules/core'
import { IConnectRepository } from '../../domain/irepositories/iconnect'
import { ConnectBaseDataSource } from '../datasources/connect-base'
import { ConnectTransformer } from '../transformers/connect'
import { ConnectEntity } from '../../domain/entities/connect'

export class ConnectRepository implements IConnectRepository {
	private dataSource: ConnectBaseDataSource
	private transformer: ConnectTransformer

	constructor (dataSource: ConnectBaseDataSource, transformer: ConnectTransformer) {
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

	async listenToOne (id: string, listener: Listeners<ConnectEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<ConnectEntity>, matches: (entity: ConnectEntity) => boolean) {
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

	async create (userId: string) {
		return this.transformer.fromJSON(await this.dataSource.create(userId))
	}

	async accept (id: string) {
		return await this.dataSource.accept(id)
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}
}
