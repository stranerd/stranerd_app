import { Listeners, QueryParams } from '@modules/core'
import { IGroupRepository } from '../../domain/irepositories/igroup'
import { GroupEntity } from '../../domain/entities/group'
import { GroupBaseDataSource } from '../datasources/group-base'
import { GroupTransformer } from '../transformers/group'
import { GroupToModel } from '../models/group'

export class GroupRepository implements IGroupRepository {
	private dataSource: GroupBaseDataSource
	private transformer: GroupTransformer

	constructor (dataSource: GroupBaseDataSource, transformer: GroupTransformer) {
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

	async listenToOne (id: string, listener: Listeners<GroupEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<GroupEntity>, matches: (entity: GroupEntity) => boolean) {
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

	async add (data: GroupToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: GroupToModel) {
		return this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return this.dataSource.delete(id)
	}
}
