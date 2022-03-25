import { Listeners, QueryParams } from '@modules/core'
import { ISetRepository } from '../../domain/irepositories/iset'
import { SetEntity } from '../../domain/entities/set'
import { SetBaseDataSource } from '../datasources/set-base'
import { SetTransformer } from '../transformers/set'
import { SetToModel } from '../models/set'

export class SetRepository implements ISetRepository {
	private dataSource: SetBaseDataSource
	private transformer: SetTransformer

	constructor (dataSource: SetBaseDataSource, transformer: SetTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (id: string, listener: Listeners<SetEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<SetEntity>, matches: (entity: SetEntity) => boolean) {
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

	async add (data: SetToModel) {
		return this.transformer.fromJSON(await this.dataSource.create(data))
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: SetToModel) {
		return this.transformer.fromJSON(await this.dataSource.update(id, data))
	}

	async delete (id: string) {
		return this.dataSource.delete(id)
	}

	async saveProp (setId: string, type: string, propIds: string[]) {
		return this.dataSource.saveProp(setId, type, propIds)
	}

	async deleteProp (setId: string, type: string, propIds: string[]) {
		return this.dataSource.deleteProp(setId, type, propIds)
	}
}
